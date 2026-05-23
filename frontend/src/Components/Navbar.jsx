import React, { useState } from 'react'
import './Navbar.css'
import SpeedTrustLogo from '../assets/logo.jpeg'
import DonationModal from './DonationModel';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const handleDonateClick = () => {
    setIsDonateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDonateModalOpen(false);
  };

  const handleDonateSubmit = (amount) => {
    // Integrate your payment gateway here (Razorpay, Stripe, etc.)
    console.log(`Donating $${amount}`);
    // Example: Initialize Razorpay payment
    // const options = {
    //   key: 'YOUR_RAZORPAY_KEY',
    //   amount: amount * 100,
    //   currency: 'INR',
    //   name: 'Organization Name',
    //   description: 'Donation',
    //   handler: (response) => {
    //     console.log('Payment successful:', response);
    //     setIsDonateModalOpen(false);
    //   }
    // };
    // const razorpay = new window.Razorpay(options);
    // razorpay.open();
    setIsDonateModalOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="logo" onClick={() => scrollToSection('home')}>
            <img src={SpeedTrustLogo} alt="" className='SpeedTrustLogo' />
            <span className="logo-text">Speed Trust</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-right-sec">
            <ul className="nav-links">
              <li onClick={() => scrollToSection('about-hero')}>Home</li>
              <li onClick={() => scrollToSection('about')}>About</li>
              <li onClick={() => scrollToSection('events')}>Events</li>
              <li onClick={() => scrollToSection('contact')}>Contact</li>
            </ul>
            <button className="razorpay-donate-btn" onClick={handleDonateClick}>
              Donate Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <ul className="mobile-nav-links">
              <li onClick={() => {
                scrollToSection('home');
                setIsMenuOpen(false);
              }}>Home</li>
              <li onClick={() => {
                scrollToSection('about');
                setIsMenuOpen(false);
              }}>About</li>
              <li onClick={() => {
                scrollToSection('events');
                setIsMenuOpen(false);
              }}>Events</li>
              <li onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}>Contact</li>
            </ul>
            <button className="mobile-donate-btn" onClick={() => {
              handleDonateClick();
              setIsMenuOpen(false);
            }}>
              Donate Now
            </button>
          </div>
        )}
      </nav>

     <DonationModal 
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />
      
    </>
  )
}