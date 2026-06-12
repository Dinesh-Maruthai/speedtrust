// components/ContactUs.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '', show: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  // Contact data stored in state for easy modification
  const [contactData, setContactData] = useState({
    sectionLabel: 'Get In Touch',
    title: 'Contact',
    titleHighlight: 'Us',
    description: 'Have questions? We\'d love to hear from you. Reach out to us anytime, and our team will get back to you within 24 hours.',
    
    // Contact Information
    contactInfo: {
      address: {
        line1: 'Ka.Mamananthal',
        line2: 'Kallakurichi District',
        line3: 'Kallakurichi & Taluk-606202',
        line4: 'Tamil Nadu, India'
      },
      phone: [
        { number: '9626056872', label: 'Mobile / WhatsApp' },
        { number: '9677979306', label: 'Mobile' }
      ],
      email: [
        { address: 'speedtrust15@gmail.com', label: 'General Inquiries' },
        { address: 'support@speedtrust.in', label: 'Support & Donations' }
      ],
      workingHours: {
        weekdays: '9:00 AM - 6:00 PM',
        saturday: '9:00 AM - 2:00 PM',
        sunday: 'Closed'
      }
    },
    
    // Social Media Links
    socialLinks: [
      { platform: 'Facebook', url: '#', icon: 'facebook', color: '#1877f2' },
      { platform: 'Twitter', url: '#', icon: 'twitter', color: '#1da1f2' },
      { platform: 'Instagram', url: '#', icon: 'instagram', color: '#e4405f' },
      { platform: 'YouTube', url: '#', icon: 'youtube', color: '#ff0000' },
      { platform: 'LinkedIn', url: '#', icon: 'linkedin', color: '#0a66c2' }
    ],
    
    // Map Configuration
    mapConfig: {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15633.891951992914!2d78.7662109!3d11.7534561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba89a3e5b0c8a2f%3A0x4b8b5c5d5e5f5a5d!2sKallakurichi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      location: 'Kallakurichi, Tamil Nadu'
    },
    
    // Form Configuration
    formConfig: {
      inquiryOptions: [
        { value: 'volunteering', label: 'Volunteering' },
        { value: 'donation', label: 'Donation / Sponsorship' },
        { value: 'admission', label: 'Child Admission' },
        { value: 'collab', label: 'Partnership / Collaboration' },
        { value: 'general', label: 'General Inquiry' }
      ],
      submitButtonText: 'Send Message',
      successMessage: 'Thank you for reaching out! Our team will respond within 24 hours.',
      errorMessage: 'Something went wrong. Please try again later.'
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullname.trim()) {
      showFormStatus('error', 'Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      showFormStatus('error', 'Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      showFormStatus('error', 'Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      showFormStatus('error', 'Please enter your message.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      showFormStatus('success', contactData.formConfig.successMessage);
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        message: ''
      });
      setIsSubmitting(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, show: false }));
      }, 5000);
    }, 1500);
  };
  
  const showFormStatus = (type, message) => {
    setFormStatus({ type, message, show: true });
    setTimeout(() => {
      setFormStatus(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // Function to update contact info
  const updateContactInfo = (updatedInfo) => {
    setContactData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...updatedInfo }
    }));
  };

  // Function to add social link
  const addSocialLink = (link) => {
    setContactData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, link]
    }));
  };

  // Function to remove social link
  const removeSocialLink = (index) => {
    const updatedLinks = [...contactData.socialLinks];
    updatedLinks.splice(index, 1);
    setContactData(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  // Function to update map URL
  const updateMapUrl = (newUrl) => {
    setContactData(prev => ({
      ...prev,
      mapConfig: { ...prev.mapConfig, embedUrl: newUrl }
    }));
  };

  // Get social icon SVG
  const getSocialIcon = (platform) => {
    switch(platform.toLowerCase()) {
      case 'facebook':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.435-11.506c0-.21-.005-.422-.014-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 5.197.153 3.769.51 2.523 1.756 1.277 3.002.92 4.43.84 6.285.782 7.565.768 7.974.768 11.23c0 3.257.014 3.666.072 4.946.08 1.855.437 3.283 1.683 4.529 1.246 1.246 2.674 1.603 4.529 1.683 1.28.058 1.689.072 4.946.072s3.666-.014 4.946-.072c1.855-.08 3.283-.437 4.529-1.683 1.246-1.246 1.603-2.674 1.683-4.529.058-1.28.072-1.689.072-4.946s-.014-3.666-.072-4.946c-.08-1.855-.437-3.283-1.683-4.529C20.231.51 18.803.153 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a5.392 5.392 0 100 10.784 5.392 5.392 0 000-10.784zm0 8.892a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm6.846-9.162a1.26 1.26 0 11-2.52 0 1.26 1.26 0 012.52 0z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const contactInfo = contactData.contactInfo;

  return (
    <section className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <div className={`sec-eyebrow ${isVisible ? 'visible' : ''}`}>
            {contactData.sectionLabel}
          </div>
          <h2 className={`contact-title ${isVisible ? 'visible d1' : ''}`}>
            {contactData.title} <em>{contactData.titleHighlight}</em>
          </h2>
          <p className={`contact-description ${isVisible ? 'visible d2' : ''}`}>
            {contactData.description}
          </p>
        </div>

        {/* Contact Grid */}
        <div className={`contact-grid ${isVisible ? 'visible' : ''}`}>
          {/* Left Side - Contact Info */}
          <div className="contact-info-panel">
            <div className="info-card">
              <h3>Get in Touch</h3>
              <p className="info-subtitle">We're here to help and answer any questions you might have.</p>

              {/* Address */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Visit Us</h4>
                  <p>
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.line2}<br />
                    {contactInfo.address.line3}<br />
                    {contactInfo.address.line4}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Call Us</h4>
                  {contactInfo.phone.map((phone, idx) => (
                    <p key={idx}>
                      <a href={`tel:${phone.number.replace(/\s/g, '')}`}>{phone.number}</a>
                      <span className="phone-label"> ({phone.label})</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 7L2 7"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Email Us</h4>
                  {contactInfo.email.map((email, idx) => (
                    <p key={idx}>
                      <a href={`mailto:${email.address}`}>{email.address}</a>
                      <span className="email-label"> ({email.label})</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Working Hours</h4>
                  <p>Monday - Friday: {contactInfo.workingHours.weekdays}</p>
                  <p>Saturday: {contactInfo.workingHours.saturday}</p>
                  <p>Sunday: {contactInfo.workingHours.sunday}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  {contactData.socialLinks.map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      style={{ '--social-color': social.color }}
                      aria-label={social.platform}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form & Map */}
          <div className="contact-form-panel">
            {/* Map */}
            <div className="map-container">
              <iframe
                title="Speed Trust Location"
                src={contactData.mapConfig.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="map-overlay">
                <span>📍 {contactData.mapConfig.location}</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="form-container">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Full Name"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className={formStatus.show && formStatus.type === 'error' && !formData.fullname ? 'error' : ''}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                    >
                      {contactData.formConfig.inquiryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group full-width">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                {formStatus.show && (
                  <div className={`form-message ${formStatus.type}`}>
                    {formStatus.type === 'success' ? '✓' : '⚠️'} {formStatus.message}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      {contactData.formConfig.submitButtonText}
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;