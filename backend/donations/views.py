# views.py
from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.conf import settings
from decimal import Decimal
import json

from .models import Donation, DonationCampaign, DonationAllocation, WebhookLog
from .serializers import (
    DonationSerializer, CreateOrderSerializer, PaymentVerificationSerializer,
    DonationCampaignSerializer, DonationAllocationSerializer, 
    TaxReceiptSerializer, DonationStatusSerializer
)
from .utils import RazorpayClient, generate_tax_receipt_number, send_donation_confirmation_email, update_campaign_raised_amount

# Initialize Razorpay client
razorpay_client = RazorpayClient()


class DonationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Donation CRUD operations
    """
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Filter by email if provided
        email = self.request.query_params.get('email')
        if email:
            queryset = queryset.filter(donor_email=email)
        return queryset


class DonationCampaignViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Donation Campaigns
    """
    queryset = DonationCampaign.objects.filter(is_active=True)
    serializer_class = DonationCampaignSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


@api_view(['POST'])
def create_donation_order(request):
    """
    Create Razorpay order for donation
    """
    serializer = CreateOrderSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'error': 'Validation failed',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    
    # Create donation record with pending status
    donation = Donation.objects.create(
        donor_name=data['donor_name'],
        donor_email=data['donor_email'],
        donor_phone=data.get('donor_phone', ''),
        is_anonymous=data.get('is_anonymous', False),
        amount=data['amount'],
        donation_type=data['donation_type'],
        message=data.get('message', ''),
        status='pending',
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT')
    )
    
    # Create Razorpay order
    try:
        razorpay_order = razorpay_client.create_order(
            amount=float(data['amount']),
            receipt=str(donation.donation_id),
            notes={
                'donation_id': str(donation.donation_id),
                'donor_email': data['donor_email']
            }
        )
        
        # Save razorpay order ID
        donation.razorpay_order_id = razorpay_order['id']
        donation.save()
        
        # If campaign is specified, create allocation record
        campaign_id = data.get('campaign_id')
        if campaign_id:
            try:
                campaign = DonationCampaign.objects.get(id=campaign_id)
                DonationAllocation.objects.create(
                    donation=donation,
                    campaign=campaign,
                    amount=data['amount']
                )
            except DonationCampaign.DoesNotExist:
                pass
        
        return Response({
            'success': True,
            'donation_id': donation.donation_id,
            'order_id': razorpay_order['id'],
            'amount': data['amount'],
            'key': settings.RAZORPAY_KEY_ID
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        donation.status = 'failed'
        donation.failure_reason = str(e)
        donation.save()
        
        return Response({
            'error': 'Failed to create payment order',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def verify_donation_payment(request):
    """
    Verify Razorpay payment signature
    """
    serializer = PaymentVerificationSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'error': 'Validation failed',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    
    # Get donation record
    try:
        donation = Donation.objects.get(donation_id=data['donation_id'])
    except Donation.DoesNotExist:
        return Response({
            'error': 'Donation record not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    # Verify payment signature
    is_valid = razorpay_client.verify_payment_signature(
        order_id=data['razorpay_order_id'],
        payment_id=data['razorpay_payment_id'],
        signature=data['razorpay_signature']
    )
    
    if not is_valid:
        donation.status = 'failed'
        donation.failure_reason = 'Invalid payment signature'
        donation.save()
        
        return Response({
            'error': 'Invalid payment signature'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Fetch payment details from Razorpay
    try:
        payment_details = razorpay_client.fetch_payment(data['razorpay_payment_id'])
        
        # Update donation record
        donation.mark_as_success(
            payment_id=data['razorpay_payment_id'],
            signature=data['razorpay_signature']
        )
        
        # Generate tax receipt number
        donation.generate_tax_receipt()
        
        # Update campaign raised amount if allocated
        allocations = donation.allocations.all()
        for allocation in allocations:
            update_campaign_raised_amount(allocation.campaign.id, donation.amount)
        
        # Send confirmation email
        send_donation_confirmation_email(donation)
        
        return Response({
            'success': True,
            'message': 'Payment verified successfully',
            'donation_id': donation.donation_id,
            'amount': donation.formatted_amount,
            'status': donation.status,
            'tax_receipt_number': donation.tax_receipt_number
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        donation.status = 'failed'
        donation.failure_reason = str(e)
        donation.save()
        
        return Response({
            'error': 'Failed to verify payment',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def check_donation_status(request, donation_id):
    """
    Check donation status by donation ID
    """
    try:
        donation = Donation.objects.get(donation_id=donation_id)
        serializer = DonationStatusSerializer(donation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Donation.DoesNotExist:
        return Response({
            'error': 'Donation not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_active_campaigns(request):
    """
    Get all active donation campaigns
    """
    campaigns = DonationCampaign.objects.filter(
        is_active=True,
        end_date__isnull=True
    ) | DonationCampaign.objects.filter(
        is_active=True,
        end_date__gte=timezone.now()
    )
    
    serializer = DonationCampaignSerializer(campaigns, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_campaign_details(request, slug):
    """
    Get campaign details by slug
    """
    campaign = get_object_or_404(DonationCampaign, slug=slug, is_active=True)
    serializer = DonationCampaignSerializer(campaign)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_donation_history(request, email):
    """
    Get donation history for a donor by email
    """
    donations = Donation.objects.filter(
        donor_email=email,
        status='success'
    ).order_by('-created_at')
    
    serializer = DonationSerializer(donations, many=True)
    return Response({
        'total_donations': donations.count(),
        'total_amount': sum(d.amount for d in donations),
        'donations': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def razorpay_webhook(request):
    """
    Webhook endpoint for Razorpay events
    """
    # Verify webhook signature (implement based on Razorpay docs)
    webhook_secret = settings.RAZORPAY_WEBHOOK_SECRET
    
    # Get the webhook payload
    payload = request.body
    webhook_signature = request.headers.get('X-Razorpay-Signature')
    
    # Log webhook event
    webhook_log = WebhookLog.objects.create(
        event_type=request.headers.get('X-Razorpay-Event', 'unknown'),
        payload=json.loads(request.body),
        processed=False
    )
    
    try:
        # Verify signature (implement proper verification)
        # For now, process the webhook
        
        event_data = json.loads(request.body)
        event_type = event_data.get('event')
        
        if event_type == 'payment.captured':
            payment_entity = event_data.get('payload', {}).get('payment', {}).get('entity', {})
            order_id = payment_entity.get('order_id')
            
            # Find donation by order_id
            try:
                donation = Donation.objects.get(razorpay_order_id=order_id)
                if donation.status == 'pending':
                    donation.status = 'success'
                    donation.razorpay_payment_id = payment_entity.get('id')
                    donation.payment_completed_at = timezone.now()
                    donation.save()
                    
                    # Generate tax receipt
                    donation.generate_tax_receipt()
                    send_donation_confirmation_email(donation)
                    
            except Donation.DoesNotExist:
                pass
        
        webhook_log.processed = True
        webhook_log.save()
        
        return Response({'status': 'success'}, status=status.HTTP_200_OK)
        
    except Exception as e:
        webhook_log.error_message = str(e)
        webhook_log.save()
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def download_tax_receipt(request, donation_id):
    """
    Generate and download tax receipt PDF
    """
    try:
        donation = Donation.objects.get(donation_id=donation_id, status='success')
        
        # Generate PDF (implement using reportlab or similar)
        # This is a placeholder - implement actual PDF generation
        from django.http import HttpResponse
        from reportlab.lib.pagesizes import letter
        from reportlab.pdfgen import canvas
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="tax_receipt_{donation.donation_id}.pdf"'
        
        # Create PDF
        p = canvas.Canvas(response, pagesize=letter)
        p.drawString(100, 750, f"SPEED TRUST - TAX RECEIPT")
        p.drawString(100, 730, f"Receipt No: {donation.tax_receipt_number}")
        p.drawString(100, 710, f"Donor Name: {donation.display_name}")
        p.drawString(100, 690, f"Amount: {donation.formatted_amount}")
        p.drawString(100, 670, f"Date: {donation.created_at.strftime('%Y-%m-%d')}")
        p.drawString(100, 650, "80G Certificate Number: AAITS1234F/2024")
        p.showPage()
        p.save()
        
        return response
        
    except Donation.DoesNotExist:
        return Response({'error': 'Donation not found'}, status=status.HTTP_404_NOT_FOUND)