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


def generate_payment_receipt_pdf(donation):
    """
    Generate a professionally designed payment receipt PDF for a donation.
    Returns PDF bytes in memory.
    """

    import io
    import os

    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.pdfgen import canvas
    from django.conf import settings

    buffer = io.BytesIO()

    page_width, page_height = letter

    p = canvas.Canvas(buffer, pagesize=letter)

    # ---------------------------------------------------------
    # COLORS
    # ---------------------------------------------------------
    primary_color = colors.HexColor("#1769E0")
    dark_color = colors.HexColor("#1F2937")
    text_color = colors.HexColor("#4B5563")
    light_text = colors.HexColor("#6B7280")
    light_bg = colors.HexColor("#F3F4F6")
    border_color = colors.HexColor("#E5E7EB")
    white = colors.white

    left_margin = 55
    right_margin = 55
    content_width = page_width - left_margin - right_margin

    # ---------------------------------------------------------
    # HEADER BACKGROUND
    # ---------------------------------------------------------
    header_height = 145

    p.setFillColor(primary_color)
    p.rect(
        0,
        page_height - header_height,
        page_width,
        header_height,
        fill=1,
        stroke=0
    )

    # ---------------------------------------------------------
    # LOGO
    # ---------------------------------------------------------
    logo_added = False

    try:
        logo_path = os.path.join(
            settings.BASE_DIR.parent,
            "frontend",
            "public",
            "speedtrustlogo.png"
        )

        if os.path.exists(logo_path):
            p.drawImage(
                logo_path,
                left_margin,
                page_height - 105,
                width=75,
                height=75,
                preserveAspectRatio=True,
                mask="auto"
            )
            logo_added = True

    except Exception:
        pass

    # ---------------------------------------------------------
    # HEADER TITLE
    # ---------------------------------------------------------
    title_x = left_margin + 95 if logo_added else left_margin

    p.setFillColor(white)
    p.setFont("Helvetica-Bold", 23)

    p.drawString(
        title_x,
        page_height - 65,
        "PAYMENT RECEIPT"
    )

    p.setFont("Helvetica", 11)

    p.drawString(
        title_x,
        page_height - 88,
        "SPEED TRUST"
    )

    # ---------------------------------------------------------
    # RECEIPT NUMBER
    # ---------------------------------------------------------
    receipt_no = donation.tax_receipt_number or donation.donation_id

    p.setFont("Helvetica-Bold", 10)
    p.drawRightString(
        page_width - right_margin,
        page_height - 60,
        "RECEIPT NO."
    )

    p.setFont("Helvetica", 11)
    p.drawRightString(
        page_width - right_margin,
        page_height - 80,
        str(receipt_no)
    )

    # ---------------------------------------------------------
    # MAIN CONTENT
    # ---------------------------------------------------------
    content_top = page_height - 185

    # Date
    date_str = (
        donation.created_at.strftime("%Y-%m-%d %H:%M:%S")
        if donation.created_at
        else "N/A"
    )

    txn_id = donation.razorpay_payment_id or "N/A"

    email = donation.donor_email if donation.donor_email else "N/A"

    # ---------------------------------------------------------
    # DONOR DETAILS TITLE
    # ---------------------------------------------------------
    p.setFillColor(dark_color)
    p.setFont("Helvetica-Bold", 10)

    p.drawString(
        left_margin,
        content_top,
        "DONOR DETAILS"
    )

    # Right side heading
    right_column_x = 350

    p.drawString(
        right_column_x,
        content_top,
        "PAYMENT DETAILS"
    )

    # ---------------------------------------------------------
    # SMALL BLUE LINE BELOW HEADINGS
    # ---------------------------------------------------------
    p.setStrokeColor(primary_color)
    p.setLineWidth(2)

    p.line(
        left_margin,
        content_top - 8,
        left_margin + 115,
        content_top - 8
    )

    p.line(
        right_column_x,
        content_top - 8,
        right_column_x + 125,
        content_top - 8
    )

    # ---------------------------------------------------------
    # DONOR DETAILS
    # ---------------------------------------------------------
    y = content_top - 38

    p.setFillColor(light_text)
    p.setFont("Helvetica", 9)
    p.drawString(left_margin, y, "Donor Name")

    p.setFillColor(dark_color)
    p.setFont("Helvetica-Bold", 11)
    p.drawString(
        left_margin,
        y - 18,
        str(donation.display_name)
    )

    y -= 60

    p.setFillColor(light_text)
    p.setFont("Helvetica", 9)
    p.drawString(left_margin, y, "Email")

    p.setFillColor(dark_color)
    p.setFont("Helvetica", 10)
    p.drawString(
        left_margin,
        y - 18,
        str(email)
    )

    # ---------------------------------------------------------
    # PAYMENT DETAILS
    # ---------------------------------------------------------
    detail_y = content_top - 38

    # Date
    p.setFillColor(light_text)
    p.setFont("Helvetica", 9)
    p.drawString(right_column_x, detail_y, "Payment Date")

    p.setFillColor(dark_color)
    p.setFont("Helvetica", 10)
    p.drawString(
        right_column_x,
        detail_y - 18,
        date_str
    )

    detail_y -= 60

    # Transaction ID
    p.setFillColor(light_text)
    p.setFont("Helvetica", 9)
    p.drawString(
        right_column_x,
        detail_y,
        "Transaction ID"
    )

    p.setFillColor(dark_color)
    p.setFont("Helvetica", 10)
    p.drawString(
        right_column_x,
        detail_y - 18,
        str(txn_id)
    )

    # ---------------------------------------------------------
    # PAYMENT INFORMATION TABLE
    # ---------------------------------------------------------
    table_top = content_top - 165

    # Header
    p.setFillColor(light_bg)
    p.roundRect(
        left_margin,
        table_top - 38,
        content_width,
        38,
        4,
        fill=1,
        stroke=0
    )

    p.setFillColor(dark_color)
    p.setFont("Helvetica-Bold", 10)

    p.drawString(
        left_margin + 15,
        table_top - 24,
        "DESCRIPTION"
    )

    p.drawRightString(
        page_width - right_margin - 15,
        table_top - 24,
        "DETAILS"
    )

    # ---------------------------------------------------------
    # FUNCTION TO DRAW TABLE ROWS
    # ---------------------------------------------------------
    def draw_detail_row(y_position, label, value):

        p.setFillColor(text_color)
        p.setFont("Helvetica", 10)

        p.drawString(
            left_margin + 15,
            y_position,
            str(label)
        )

        p.setFillColor(dark_color)
        p.setFont("Helvetica-Bold", 10)

        p.drawRightString(
            page_width - right_margin - 15,
            y_position,
            str(value)
        )

        p.setStrokeColor(border_color)
        p.setLineWidth(0.5)

        p.line(
            left_margin,
            y_position - 14,
            page_width - right_margin,
            y_position - 14
        )

    row_y = table_top - 65

    # Payment Method
    draw_detail_row(
        row_y,
        "Payment Method",
        donation.get_payment_gateway_display()
    )

    row_y -= 42

    # Purpose
    if hasattr(donation, "get_donation_type_display"):
        draw_detail_row(
            row_y,
            "Purpose",
            donation.get_donation_type_display()
        )

        row_y -= 42

    # Transaction ID
    draw_detail_row(
        row_y,
        "Transaction ID",
        txn_id
    )

    row_y -= 42

    # Receipt Number
    draw_detail_row(
        row_y,
        "Receipt No",
        receipt_no
    )

    # ---------------------------------------------------------
    # TOTAL AMOUNT BOX
    # ---------------------------------------------------------
    total_box_y = row_y - 105
    total_box_height = 65

    p.setFillColor(primary_color)

    p.roundRect(
        left_margin,
        total_box_y,
        content_width,
        total_box_height,
        5,
        fill=1,
        stroke=0
    )

    # Total label
    p.setFillColor(white)
    p.setFont("Helvetica-Bold", 12)

    p.drawString(
        left_margin + 20,
        total_box_y + 38,
        "TOTAL AMOUNT PAID"
    )

    # Amount
    p.setFont("Helvetica-Bold", 19)

    p.drawRightString(
        page_width - right_margin - 20,
        total_box_y + 34,
        str(donation.formatted_amount)
    )

    # ---------------------------------------------------------
    # FOOTER
    # ---------------------------------------------------------
    footer_y = 70

    p.setStrokeColor(border_color)
    p.setLineWidth(0.5)

    p.line(
        left_margin,
        footer_y + 30,
        page_width - right_margin,
        footer_y + 30
    )

    p.setFillColor(light_text)
    p.setFont("Helvetica", 8)

    p.drawCentredString(
        page_width / 2,
        footer_y,
        "SPEED TRUST - PAYMENT RECEIPT"
    )

    # ---------------------------------------------------------
    # SAVE PDF
    # ---------------------------------------------------------
    p.showPage()
    p.save()

    pdf_buffer = buffer.getvalue()
    buffer.close()

    return pdf_buffer


def send_donation_confirmation_email(donation):
    """
    Send donation confirmation email to donor with attached receipt.
    All steps are logged to the terminal for easy debugging.
    """
    print(f"\n[EMAIL] ---- send_donation_confirmation_email called ----")
    print(f"[EMAIL] Donation ID : {donation.donation_id}")
    print(f"[EMAIL] Donor email : {donation.donor_email}")
    print(f"[EMAIL] Amount      : {donation.formatted_amount}")
    print(f"[EMAIL] Status      : {donation.status}")

    # If no email, bail early
    if not donation.donor_email:
        print("[EMAIL] No donor email found — skipping email send.")
        return

    from django.core.mail import EmailMultiAlternatives
    from django.template.loader import render_to_string

    subject = "Thank you for your donation to Speed Trust"
    context = {
        'donor_name': donation.display_name,
        'amount': donation.formatted_amount,
        'donation_id': donation.donation_id,
        'status': donation.status,
    }

    # --- HTML template (optional) ---
    html_message = None
    try:
        html_message = render_to_string('emails/donation_confirmation.html', context)
        print("[EMAIL] HTML template rendered successfully.")
    except Exception as tmpl_err:
        print(f"[EMAIL] HTML template not found, sending plain text only. ({tmpl_err})")

    plain_message = (
        f"Thank you for your donation of {donation.formatted_amount} to Speed Trust. "
        f"Donation ID: {donation.donation_id}"
    )

    # --- Build email ---
    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[donation.donor_email]
        )
        msg.encoding = 'utf-8'   # Fix: ensure ₹ and other Unicode chars are encoded correctly

        if html_message:
            msg.attach_alternative(html_message, "text/html")

        # --- Attach PDF receipt ---
        try:
            print("[EMAIL] Generating PDF receipt...")
            pdf_data = generate_payment_receipt_pdf(donation)
            if pdf_data:
                filename = f'Receipt_{donation.donation_id}.pdf'
                msg.attach(filename, pdf_data, 'application/pdf')
                print(f"[EMAIL] PDF receipt attached ({len(pdf_data)} bytes) as '{filename}'.")
        except Exception as pdf_err:
            print(f"[EMAIL] PDF generation failed (non-fatal, continuing without attachment): {pdf_err}")

        # --- Send ---
        print(f"[EMAIL] Sending email to {donation.donor_email} ...")
        msg.send(fail_silently=False)   # fail_silently=False so SMTP errors are printed below
        print(f"[EMAIL] ✅ Email sent successfully to {donation.donor_email}!")

    except Exception as smtp_err:
        print(f"[EMAIL] ❌ Email sending failed: {smtp_err}")

    print("[EMAIL] ---- send_donation_confirmation_email done ----\n")


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