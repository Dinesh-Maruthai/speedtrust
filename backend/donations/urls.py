# payment_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create router for ViewSets
router = DefaultRouter()
router.register(r'donations', views.DonationViewSet, basename='donation')
router.register(r'campaigns', views.DonationCampaignViewSet, basename='campaign')

# App-specific URL patterns
app_name = 'donations'

urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),
    
    # Payment endpoints
    path('create-order/', views.create_donation_order, name='create-order'),
    path('verify-payment/', views.verify_donation_payment, name='verify-payment'),
    path('check-status/<uuid:donation_id>/', views.check_donation_status, name='check-status'),
    
    # Campaign endpoints
    path('campaigns-list/', views.get_active_campaigns, name='active-campaigns'),
    path('campaign-details/<slug:slug>/', views.get_campaign_details, name='campaign-details'),
    
    # Donor endpoints
    path('donor-history/<str:email>/', views.get_donation_history, name='donor-history'),
    
    # Webhook and receipt
    path('webhook/razorpay/', views.razorpay_webhook, name='razorpay-webhook'),
    path('download-receipt/<uuid:donation_id>/', views.download_tax_receipt, name='download-receipt'),
]