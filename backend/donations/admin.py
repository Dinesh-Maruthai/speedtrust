from django.contrib import admin
from .models import (
    Donation, DonationCampaign, DonationAllocation,
    TaxReceipt, WebhookLog, Event, GalleryItem
)

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donor_name', 'donor_email', 'amount', 'status', 'donation_type', 'created_at')
    list_filter = ('status', 'donation_type', 'is_anonymous', 'created_at')
    search_fields = ('donor_name', 'donor_email', 'razorpay_order_id', 'razorpay_payment_id')
    readonly_fields = ('donation_id', 'created_at', 'updated_at')

@admin.register(DonationCampaign)
class DonationCampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'goal_amount', 'raised_amount', 'is_active', 'start_date', 'end_date')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(DonationAllocation)
class DonationAllocationAdmin(admin.ModelAdmin):
    list_display = ('donation', 'campaign', 'amount', 'created_at')
    search_fields = ('donation__donor_name', 'campaign__name')

@admin.register(TaxReceipt)
class TaxReceiptAdmin(admin.ModelAdmin):
    list_display = ('receipt_number', 'donation', 'issued_date', 'email_sent')
    list_filter = ('email_sent', 'issued_date')
    search_fields = ('receipt_number', 'donation__donor_name', 'donation__donor_email')

@admin.register(WebhookLog)
class WebhookLogAdmin(admin.ModelAdmin):
    list_display = ('event_type', 'event_id', 'processed', 'created_at')
    list_filter = ('event_type', 'processed', 'created_at')
    search_fields = ('event_type', 'event_id')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'location', 'is_published', 'created_at')
    list_filter = ('category', 'is_published', 'created_at')
    search_fields = ('title', 'location', 'donor')

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'aspect', 'date', 'location', 'likes', 'is_published', 'created_at')
    list_filter = ('category', 'aspect', 'is_published', 'created_at')
    search_fields = ('title', 'location', 'author')
