import React, { useState } from 'react';
import axios from 'axios';

const DonationModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || amount < 1) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      // Create order on backend
      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/create-order/`,
        {
          amount: parseInt(amount),
          donor_name: donorName,
          donor_email: donorEmail,
          donor_phone: donorPhone,
        }
      );

      const { razorpay_order_id, amount: orderAmount, razorpay_key } = orderResponse.data;

      // Configure Razorpay options
      const options = {
        key: razorpay_key,
        amount: orderAmount * 100,
        currency: 'INR',
        name: 'Speed Trust',
        description: `Donation for Speed Trust - Helping Children`,
        image: '/logo.png', // Add your logo path
        order_id: razorpay_order_id,
        handler: async (response) => {
          // Verify payment on backend
          try {
            const verifyResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/verify-payment/`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderResponse.data.order_id,
              }
            );

            if (verifyResponse.data.status === 'success') {
              alert('Thank you for your donation! 🙏');
              onClose();
              // Reset form
              setAmount('');
              setDonorName('');
              setDonorEmail('');
              setDonorPhone('');
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal closed');
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Make a Donation</h2>
        <p>Your contribution gives children a brighter future</p>
        
        <div className="donation-form">
          <div className="form-group">
            <label>Donation Amount (₹)</label>
            <div className="amount-buttons">
              {[500, 1000, 2500, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  className={`amount-btn ${amount == amt ? 'active' : ''}`}
                  onClick={() => setAmount(amt)}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Or enter custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
            <p>please make sure your email is correct</p>
          </div>

          <div className="form-group">
            <label>Phone (Optional)</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
            />
          </div>

          <button 
            className="pay-btn" 
            onClick={handlePayment}
            disabled={loading || !amount}
          >
            {loading ? 'Processing...' : `Donate ₹${amount || '0'}`}
          </button>

          <p className="secure-text">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .donation-modal {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .donation-modal h2 {
          margin: 0 0 0.5rem 0;
          color: #1e293b;
        }

        .donation-form {
          margin-top: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #334155;
        }

        .amount-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .amount-btn {
          padding: 0.5rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .amount-btn:hover, .amount-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
        }

        input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .pay-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .pay-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .pay-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .secure-text {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #64748b;
        }
      `}</style>
    </div>
  );
};

export default DonationModal;