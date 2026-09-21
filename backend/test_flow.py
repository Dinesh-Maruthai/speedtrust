import requests
import hmac
import hashlib
import json
import time

base_url = 'http://localhost:8000/api/payment'
secret = 'Hsz9yyJuxksZSkMW8dV030p1'

# 1. Create order
payload = {
    "donor_name": "Test User",
    "donor_email": "test@example.com",
    "amount": "100.00",
    "donation_type": "one-time"
}

print("Creating order...")
res = requests.post(f"{base_url}/create-order/", json=payload)
print(res.status_code, res.text)
if res.status_code != 201:
    print("Failed to create order")
    exit(1)

data = res.json()
donation_id = data['donation_id']
order_id = data['order_id']

# 2. Verify payment
print(f"Verifying payment for donation {donation_id}...")
# Simulate razorpay payment id
payment_id = "pay_" + str(int(time.time()))

# generate signature
signature = hmac.new(
    key=secret.encode(),
    msg=f"{order_id}|{payment_id}".encode(),
    digestmod=hashlib.sha256
).hexdigest()

verify_payload = {
    "donation_id": donation_id,
    "razorpay_order_id": order_id,
    "razorpay_payment_id": payment_id,
    "razorpay_signature": signature
}

res2 = requests.post(f"{base_url}/verify-payment/", json=verify_payload)
print(res2.status_code, res2.text)
print("Flow complete.")
