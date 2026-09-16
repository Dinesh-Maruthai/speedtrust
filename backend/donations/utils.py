# utils.py
import razorpay
import hashlib
import hmac
from django.conf import settings
from decimal import Decimal

class RazorpayClient:
    """
    Razorpay API Client Wrapper
    """
    def __init__(self):
        self.client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )
    
    def create_order(self, amount, currency='INR', receipt=None, notes=None):
        """
        Create a Razorpay order
        """
        data = {
            'amount': int(amount * 100),  # Convert to paise
            'currency': currency,
            'receipt': receipt,
            'notes': notes or {},
            'payment_capture': 1  # Auto capture payment
        }
        try:
            order = self.client.order.create(data=data)
            return order
        except Exception as e:
            raise Exception(f"Failed to create order: {str(e)}")
    
    def verify_payment_signature(self, order_id, payment_id, signature):
        """
        Verify Razorpay payment signature
        """
        try:
            generated_signature = hmac.new(
                key=settings.RAZORPAY_KEY_SECRET.encode(),
                msg=f"{order_id}|{payment_id}".encode(),
                digestmod=hashlib.sha256
            ).hexdigest()
            
            return hmac.compare_digest(generated_signature, signature)
        except Exception as e:
            return False
    
    def fetch_payment(self, payment_id):
        """
        Fetch payment details from Razorpay
        """
        try:
            payment = self.client.payment.fetch(payment_id)
            return payment
        except Exception as e:
            raise Exception(f"Failed to fetch payment: {str(e)}")


def generate_tax_receipt_number(donation):
    """
    Generate unique tax receipt number
    """
    import hashlib
    import time
    
    receipt_string = f"{donation.donation_id}{donation.created_at}{donation.amount}{time.time()}"
    receipt_hash = hashlib.md5(receipt_string.encode()).hexdigest()
    # Format: SPEED/2024/XXXXXX
    year = donation.created_at.year
    short_hash = receipt_hash[:8].upper()
    return f"SPEED/{year}/{short_hash}"


def send_donation_confirmation_email(donation):
    """
    Send donation confirmation email to donor
    """
    # Implementation depends on your email service (SendGrid, AWS SES, etc.)
    # Example using Django's send_mail
    from django.core.mail import send_mail
    from django.template.loader import render_to_string
    
    subject = f"Thank you for your donation to Speed Trust"
    context = {
        'donor_name': donation.display_name,
        'amount': donation.formatted_amount,
        'donation_id': donation.donation_id,
        'status': donation.status,
    }
    
    try:
        html_message = render_to_string('emails/donation_confirmation.html', context)
    except Exception:
        html_message = None
    
    plain_message = f"Thank you for your donation of {donation.formatted_amount} to Speed Trust. Donation ID: {donation.donation_id}"
    
    try:
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[donation.donor_email],
            html_message=html_message,
            fail_silently=True
        )
    except Exception:
        pass


def update_campaign_raised_amount(campaign_id, amount):
    """
    Update campaign raised amount when donation is successful
    """
    from .models import DonationCampaign
    
    try:
        campaign = DonationCampaign.objects.get(id=campaign_id)
        campaign.raised_amount += Decimal(str(amount))
        campaign.save()
        return True
    except DonationCampaign.DoesNotExist:
        return False