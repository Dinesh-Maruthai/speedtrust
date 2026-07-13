// components/DonateNow.jsx
import React, { useState } from 'react';
import './DonateNow.css';


const DonateNow = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const presetAmounts = [500, 1000, 2000, 5000, 10000];
  const API_URL = import.meta.env.VITE_API_URL;
  // Debug: Check if component is rendering
  console.log('DonateNow component is rendering');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async (donationData) => {
    try {
      const response = await fetch(`/api/payment/create-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }
      
      return data;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      const response = await fetch(`/api/payment/verify-payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment verification failed');
      }
      
      return data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  };

  const openRazorpayCheckout = (orderData, donationData) => {
    const options = {
      key: orderData.key,
      amount: donationData.amount * 100,
      currency: 'INR',
      name: 'Speed Trust',
      description: `Donation for ${donationData.donation_type === 'one-time' ? 'One-time' : 'Monthly'} Support`,
      order_id: orderData.order_id,
      handler: async function(response) {
        setIsLoading(true);
        
        try {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donation_id: orderData.donation_id,
          };
          
          const verifyResult = await verifyPayment(verificationData);
          
          if (verifyResult.success) {
            sessionStorage.setItem('last_donation_id', orderData.donation_id);
            window.location.href = `/donation-success?donation_id=${orderData.donation_id}`;
          }
        } catch (error) {
          alert('Payment verification failed. Please contact support.');
        } finally {
          setIsLoading(false);
        }
      },
      prefill: {
        name: donationData.donor_name,
        email: donationData.donor_email,
        contact: donationData.donor_phone || '',
      },
      notes: {
        donation_type: donationData.donation_type,
        anonymous: donationData.is_anonymous ? 'Yes' : 'No',
        message: donationData.message || 'No message'
      },
      theme: {
        color: '#92B775',
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
        }
      }
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 50) {
      alert('Please select or enter a valid donation amount (minimum ₹50)');
      return;
    }
    
    if (!donorName.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    if (!donorEmail.trim()) {
      alert('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(donorEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    const donationData = {
      amount: amount,
      donation_type: donationType,
      donor_name: donorName,
      donor_email: donorEmail,
      donor_phone: donorPhone,
      is_anonymous: isAnonymous,
      message: message,
    };
    
    try {
      const isScriptLoaded = await loadRazorpayScript();
      
      if (!isScriptLoaded) {
        alert('Failed to load payment gateway. Please check your internet connection.');
        setIsLoading(false);
        return;
      }
      
      const orderData = await createOrder(donationData);
      
      if (orderData.success) {
        openRazorpayCheckout(orderData, donationData);
      } else {
        alert('Failed to create payment order. Please try again.');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donate-section">
      <div className="donate-container">
        <div className="donate-header">
          <div className="sec-eyebrow">Make a Difference</div>
          <h1 className="donate-title">Support Our <em>Mission</em></h1>
          <p className="donate-description">
            Your generous donation helps us provide shelter, food, education, and medical care to children in need.
          </p>
        </div>

        <div className="donate-grid">
          <div className="donation-form-container">
            <div className="form-card">
              <h3>Choose Your Donation Amount</h3>
              
              <div className="amount-options">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                  >
                    ₹{amount.toLocaleString('en-IN')}
                  </button>
                ))}
                <div className="custom-amount">
                  <span className="currency">₹</span>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    min="50"
                    step="50"
                  />
                </div>
              </div>

              <div className="donation-type">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="donationType"
                    value="one-time"
                    checked={donationType === 'one-time'}
                    onChange={(e) => setDonationType(e.target.value)}
                  />
                  <span>One-time Donation</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="donationType"
                    value="monthly"
                    checked={donationType === 'monthly'}
                    onChange={(e) => setDonationType(e.target.value)}
                  />
                  <span>Monthly Donation</span>
                </label>
              </div>

              <div className="donor-form">
                <h3>Your Information</h3>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    placeholder="Leave a message (Optional)"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <span>Donate anonymously</span>
                </label>
              </div>

              <button 
                className="donate-submit-btn"
                onClick={handleDonate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Donate Now
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4"/>
                    </svg>
                  </>
                )}
              </button>

              <div className="security-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L4 7v5c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V7L12 2z"/>
                </svg>
                <span>100% Secure Payment. Powered by Razorpay</span>
              </div>
            </div>
          </div>

          <div className="donation-info-container">
            <div className="impact-card">
              <h3>Your Impact</h3>
              <div className="impact-stats">
                <div className="impact-item">
                  <div className="impact-number">₹500</div>
                  <div className="impact-label">Feeds 1 child for a month</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">₹2,000</div>
                  <div className="impact-label">Education materials for 5 children</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">₹5,000</div>
                  <div className="impact-label">Medical care for 10 children</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">₹10,000</div>
                  <div className="impact-label">Sponsors a child's full education</div>
                </div>
              </div>
            </div>

            <div className="tax-card">
              <div className="tax-icon">✓</div>
              <h3>Tax Benefits</h3>
              <p>All donations are eligible for 50% tax exemption under Section 80G of the Income Tax Act, 1961.</p>
              <small>80G Registration No: AAITS1234F/2024</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateNow;