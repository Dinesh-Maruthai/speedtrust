# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Donation(models.Model):
    """
    Main Donation Model - Stores all donation transactions
    """
    
    # Donation Status Choices
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
        ('cancelled', 'Cancelled'),
    ]
    
    # Donation Type Choices
    TYPE_CHOICES = [
        ('one-time', 'One Time Donation'),
        ('monthly', 'Monthly Donation'),
        ('yearly', 'Yearly Donation'),
    ]
    
    # Payment Gateway Choices
    GATEWAY_CHOICES = [
        ('razorpay', 'Razorpay'),
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
    ]
    
    # Basic Information
    donation_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    donor_name = models.CharField(max_length=255)
    donor_email = models.EmailField()
    donor_phone = models.CharField(max_length=15, blank=True, null=True)
    is_anonymous = models.BooleanField(default=False)
    
    # Donation Details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='one-time')
    message = models.TextField(blank=True, null=True)
    
    # Payment Gateway Details
    payment_gateway = models.CharField(max_length=20, choices=GATEWAY_CHOICES, default='razorpay')
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=255, blank=True, null=True)
    
    # Status Tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    failure_reason = models.TextField(blank=True, null=True)
    
    # Tax Benefits
    tax_receipt_generated = models.BooleanField(default=False)
    tax_receipt_number = models.CharField(max_length=50, blank=True, null=True)
    tax_receipt_url = models.URLField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    payment_completed_at = models.DateTimeField(blank=True, null=True)
    
    # IP and User Tracking
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Donation'
        verbose_name_plural = 'Donations'
        indexes = [
            models.Index(fields=['donor_email']),
            models.Index(fields=['razorpay_order_id']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.donor_name} - ₹{self.amount} - {self.status}"
    
    @property
    def display_name(self):
        """Return anonymous name if donor chooses anonymity"""
        return "Anonymous Donor" if self.is_anonymous else self.donor_name
    
    @property
    def formatted_amount(self):
        """Return formatted amount with Indian currency format"""
        return f"₹{self.amount:,.2f}"
    
    def mark_as_success(self, payment_id, signature):
        """Mark donation as successful"""
        self.status = 'success'
        self.razorpay_payment_id = payment_id
        self.razorpay_signature = signature
        self.payment_completed_at = timezone.now()
        self.save()
    
    def generate_tax_receipt(self):
        """Generate tax receipt number"""
        import hashlib
        receipt_string = f"{self.donation_id}{self.created_at}{self.amount}"
        self.tax_receipt_number = hashlib.md5(receipt_string.encode()).hexdigest()[:12].upper()
        self.tax_receipt_generated = True
        self.save()
        return self.tax_receipt_number


class DonationCampaign(models.Model):
    """
    Campaign Model - For tracking specific fundraising campaigns
    """
    CATEGORY_CHOICES = [
        ('general', 'General Fund'),
        ('education', 'Education Fund'),
        ('food', 'Food Program'),
        ('medical', 'Medical Care'),
        ('infrastructure', 'Infrastructure'),
        ('emergency', 'Emergency Relief'),
    ]
    
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    goal_amount = models.DecimalField(max_digits=12, decimal_places=2)
    raised_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    @property
    def progress_percentage(self):
        """Calculate donation progress percentage"""
        if self.goal_amount > 0:
            return (self.raised_amount / self.goal_amount) * 100
        return 0
    
    @property
    def remaining_amount(self):
        """Calculate remaining amount needed"""
        return max(self.goal_amount - self.raised_amount, 0)


class DonationAllocation(models.Model):
    """
    Model to track how donations are allocated to campaigns
    """
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE, related_name='allocations')
    campaign = models.ForeignKey(DonationCampaign, on_delete=models.CASCADE, related_name='allocations')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['donation', 'campaign']
    
    def __str__(self):
        return f"{self.donation.donor_name} -> {self.campaign.name}: ₹{self.amount}"


class TaxReceipt(models.Model):
    """
    Model for storing tax receipts for donors
    """
    donation = models.OneToOneField(Donation, on_delete=models.CASCADE, related_name='tax_receipt')
    receipt_number = models.CharField(max_length=50, unique=True)
    receipt_pdf = models.FileField(upload_to='tax_receipts/', blank=True, null=True)
    issued_date = models.DateTimeField(auto_now_add=True)
    email_sent = models.BooleanField(default=False)
    email_sent_at = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"Receipt {self.receipt_number} - {self.donation.donor_name}"


class WebhookLog(models.Model):
    """
    Model to log all webhook events from payment gateway
    """
    event_type = models.CharField(max_length=100)
    event_id = models.CharField(max_length=100, blank=True, null=True)
    payload = models.JSONField()
    processed = models.BooleanField(default=False)
    error_message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.event_type} - {self.created_at}"


class Event(models.Model):
    """
    CMS Model for Events shown on the public events page
    """
    CATEGORY_CHOICES = [
        ('Nutrition', 'Nutrition'),
        ('Education', 'Education'),
        ('Healthcare', 'Healthcare'),
        ('Community', 'Community'),
        ('Sports', 'Sports'),
        ('Celebrations', 'Celebrations'),
        ('Arts', 'Arts'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Community')
    description = models.TextField()
    details = models.TextField(blank=True)
    date = models.CharField(max_length=50)          # e.g. "Oct 12, 2024"
    location = models.CharField(max_length=255)
    beneficiaries = models.CharField(max_length=100, blank=True)
    volunteers = models.CharField(max_length=100, blank=True)
    donor = models.CharField(max_length=100, blank=True)
    donor_initials = models.CharField(max_length=5, blank=True)
    thumbnail = models.ImageField(upload_to='events/', blank=True, null=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return self.title

    @property
    def thumbnail_url(self):
        if self.thumbnail:
            return self.thumbnail.url
        return None


class GalleryItem(models.Model):
    """
    CMS Model for Gallery items shown on the public gallery page
    """
    CATEGORY_CHOICES = [
        ('education', 'Education & Learning'),
        ('nutrition', 'Nutrition & Daily Meals'),
        ('arts', 'Arts & Creativity'),
        ('sports', 'Sports & Play'),
        ('celebrations', 'Celebrations & Festivals'),
        ('healthcare', 'Healthcare & Wellness'),
        ('community', 'Community & Outreach'),
    ]

    ASPECT_CHOICES = [
        ('tall', 'Tall'),
        ('wide', 'Wide'),
        ('square', 'Square'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='community')
    aspect = models.CharField(max_length=10, choices=ASPECT_CHOICES, default='square')
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)   # fallback external URL
    date = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=255, blank=True)
    summary = models.TextField(blank=True)
    story = models.TextField(blank=True)
    impact = models.CharField(max_length=255, blank=True)
    likes = models.PositiveIntegerField(default=0)
    author = models.CharField(max_length=100, blank=True)
    author_role = models.CharField(max_length=100, blank=True)
    donor_support = models.CharField(max_length=100, blank=True)
    tags = models.JSONField(default=list, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Gallery Item'
        verbose_name_plural = 'Gallery Items'

    def __str__(self):
        return self.title

    @property
    def image_src(self):
        if self.image:
            return self.image.url
        return self.image_url or ''