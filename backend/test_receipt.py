import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from donations.models import Donation
from donations.utils import send_donation_confirmation_email, generate_payment_receipt_pdf

print("Getting donation...")
donation = Donation.objects.first()
if not donation:
    print("No donations in DB.")
    exit(1)

print(f"Testing for donation: {donation.donation_id}")

try:
    print("Generating PDF...")
    pdf_buffer = generate_payment_receipt_pdf(donation)
    print(f"PDF generated successfully, size: {len(pdf_buffer) if pdf_buffer else 0} bytes")
    
    print("Sending email (silently)...")
    send_donation_confirmation_email(donation)
    print("Email flow executed successfully.")
except Exception as e:
    print(f"Failed: {e}")
