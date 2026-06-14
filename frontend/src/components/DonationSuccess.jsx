// components/DonationSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './DonationSuccess.css';

const DonationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [donationDetails, setDonationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get donation details from URL params or localStorage
    const params = new URLSearchParams(location.search);
    let donationId = params.get('donation_id');
    
    // If not in URL, try to get from sessionStorage
    if (!donationId) {
      donationId = sessionStorage.getItem('last_donation_id');
    }
    
    if (donationId) {
      fetchDonationDetails(donationId);
    } else {
      setError('No donation information found');
      setLoading(false);
    }
  }, [location]);

  const fetchDonationDetails = async (donationId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/payment/donation/status/${donationId}/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch donation details');
      }
      
      const data = await response.json();
      setDonationDetails(data);
      
      // Clear from sessionStorage after fetching
      sessionStorage.removeItem('last_donation_id');
    } catch (error) {
      console.error('Error fetching donation details:', error);
      setError('Unable to load donation details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!donationDetails) return;
    
    try {
      window.open(`http://localhost:8000/api/v1/payment/receipt/${donationDetails.donation_id}/download/`, '_blank');
    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Failed to download receipt. Please contact support.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading donation details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">!</div>
          <h1>Something Went Wrong</h1>
          <p>{error}</p>
          <Link to="/donate" className="home-btn">Try Again</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="success-section">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Thank You for Your Donation!</h1>
        <p>Your generous contribution will help transform lives.</p>
        
        {donationDetails && (
          <div className="donation-details">
            <h3>Donation Details</h3>
            <p><strong>Donation ID:</strong> {donationDetails.donation_id}</p>
            <p><strong>Amount:</strong> ₹{donationDetails.amount}</p>
            <p><strong>Status:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>{donationDetails.status}</span></p>
            <p><strong>Date:</strong> {new Date(donationDetails.created_at).toLocaleString()}</p>
          </div>
        )}
        
        <div className="tax-info">
          <h3>Tax Exemption Certificate</h3>
          <p>Your donation is eligible for 50% tax exemption under Section 80G of the Income Tax Act, 1961.</p>
          <p>You will receive your 80G certificate via email within 24 hours.</p>
          <small>Registration No: AAITS1234F/2024</small>
        </div>
        
        <div className="success-buttons">
          <Link to="/" className="home-btn">
            Return to Home
          </Link>
          <button onClick={handleDownloadReceipt} className="download-btn">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;