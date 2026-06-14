# serializers.py
from rest_framework import serializers
from .models import Donation, DonationCampaign, DonationAllocation, TaxReceipt

class DonationSerializer(serializers.ModelSerializer):
    """
    Serializer for Donation model - Handles data validation
    """
    display_name = serializers.ReadOnlyField()
    formatted_amount = serializers.ReadOnlyField()
    
    class Meta:
        model = Donation
        fields = [
            'id', 'donation_id', 'donor_name', 'donor_email', 'donor_phone',
            'is_anonymous', 'amount', 'donation_type', 'message', 
            'status', 'created_at', 'display_name', 'formatted_amount'
        ]
        read_only_fields = ['id', 'donation_id', 'status', 'created_at', 'display_name', 'formatted_amount']
    
    def validate_amount(self, value):
        """Validate donation amount"""
        if value < 50:
            raise serializers.ValidationError("Minimum donation amount is ₹50")
        if value > 5000000:
            raise serializers.ValidationError("Maximum donation amount is ₹50,00,000")
        return value
    
    def validate_donor_email(self, value):
        """Validate email format"""
        import re
        if not re.match(r'^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$', value):
            raise serializers.ValidationError("Enter a valid email address")
        return value


class CreateOrderSerializer(serializers.Serializer):
    """
    Serializer for creating Razorpay order
    """
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    donation_type = serializers.ChoiceField(choices=Donation.TYPE_CHOICES)
    donor_name = serializers.CharField(max_length=255)
    donor_email = serializers.EmailField()
    donor_phone = serializers.CharField(max_length=15, required=False, allow_blank=True)
    is_anonymous = serializers.BooleanField(default=False)
    message = serializers.CharField(required=False, allow_blank=True)
    campaign_id = serializers.IntegerField(required=False, allow_null=True)
    
    def validate_amount(self, value):
        if value < 50:
            raise serializers.ValidationError("Minimum donation amount is ₹50")
        return value


class PaymentVerificationSerializer(serializers.Serializer):
    """
    Serializer for verifying Razorpay payment
    """
    razorpay_order_id = serializers.CharField()
    razorpay_payment_id = serializers.CharField()
    razorpay_signature = serializers.CharField()
    donation_id = serializers.UUIDField()


class DonationCampaignSerializer(serializers.ModelSerializer):
    """
    Serializer for Donation Campaign
    """
    progress_percentage = serializers.ReadOnlyField()
    remaining_amount = serializers.ReadOnlyField()
    formatted_goal = serializers.SerializerMethodField()
    formatted_raised = serializers.SerializerMethodField()
    
    class Meta:
        model = DonationCampaign
        fields = [
            'id', 'name', 'slug', 'description', 'category', 
            'goal_amount', 'raised_amount', 'progress_percentage', 
            'remaining_amount', 'start_date', 'end_date', 
            'is_active', 'image_url', 'formatted_goal', 'formatted_raised'
        ]
    
    def get_formatted_goal(self, obj):
        return f"₹{obj.goal_amount:,.2f}"
    
    def get_formatted_raised(self, obj):
        return f"₹{obj.raised_amount:,.2f}"


class DonationAllocationSerializer(serializers.ModelSerializer):
    """
    Serializer for Donation Allocation
    """
    campaign_name = serializers.ReadOnlyField(source='campaign.name')
    donation_donor = serializers.ReadOnlyField(source='donation.display_name')
    
    class Meta:
        model = DonationAllocation
        fields = ['id', 'donation', 'campaign', 'campaign_name', 'donation_donor', 'amount', 'created_at']


class TaxReceiptSerializer(serializers.ModelSerializer):
    """
    Serializer for Tax Receipt
    """
    donor_name = serializers.ReadOnlyField(source='donation.display_name')
    donor_email = serializers.ReadOnlyField(source='donation.donor_email')
    amount = serializers.ReadOnlyField(source='donation.amount')
    donation_date = serializers.ReadOnlyField(source='donation.created_at')
    
    class Meta:
        model = TaxReceipt
        fields = [
            'id', 'receipt_number', 'donation', 'donor_name', 'donor_email',
            'amount', 'donation_date', 'receipt_pdf', 'issued_date', 'email_sent'
        ]


class DonationStatusSerializer(serializers.ModelSerializer):
    """
    Serializer for checking donation status
    """
    class Meta:
        model = Donation
        fields = ['donation_id', 'status', 'amount', 'created_at', 'payment_completed_at']