// components/Footer.jsx - Optimized with reduced height
import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const footerRef = useRef(null);

  // Footer data stored in state for easy modification
  const [footerData, setFooterData] = useState({
    // Organization Info
    organization: {
      name: 'Speed Trust',
      tagline: 'Empowering Lives, Building Futures',
      description: 'Dedicated to providing shelter, food, education, and care for orphaned, abandoned, and underprivileged children since 2008.',
      logoIcon: ''
    },
    
    // Address Information
    address: {
      line1: 'Ka.Mamananthal Village',
      line2: 'Kallakurichi & Taluk - 606202',
      line3: 'Kallakurichi District',
      line4: 'Tamilnadu, India'
    },
    
    // Contact Information
    contact: {
      phone: ['9626056872', '9677979306'],
      email: 'speedtrustofficial@gmail.com',
      workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM'
    },
    
    // Quick Links
    quickLinks: [
      { name: 'Home', url: '#', id: 'home' },
      { name: 'About Us', url: '#', id: 'about' },
      { name: 'Services', url: '#', id: 'services' },
      { name: 'Projects', url: '#', id: 'projects' },
      { name: 'Contact', url: '#', id: 'contact' }
    ],
    
    // Legal Links
    legalLinks: [
      { name: 'Terms of Service', url: '#', id: 'terms' },
      { name: 'Privacy Policy', url: '#', id: 'privacy' }
    ],
    
    // Social Media Links
    socialLinks: [
      { platform: 'Facebook', url: '#', icon: 'facebook', color: '#1877f2' },
      { platform: 'Instagram', url: '#', icon: 'instagram', color: '#e4405f' },
      { platform: 'Twitter', url: '#', icon: 'twitter', color: '#1da1f2' },
      { platform: 'YouTube', url: '#', icon: 'youtube', color: '#ff0000' }
    ],
    
    // Newsletter Section (disabled to save space)
    newsletter: {
      enabled: false, // Set to false to save space
      title: 'Subscribe to Our Newsletter',
      description: 'Stay updated with our latest news',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      successMessage: 'Thank you for subscribing!'
    },
    
    // Copyright Text
    copyright: {
      text: 'All Rights Reserved',
      showYear: true
    },
    
    // Association Logos (compact)
    associations: [
      { name: 'Registered Trust', icon: '✓', color: '#92B775' },
      { name: '80G Certified', icon: '✓', color: '#92B775' }
    ]
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ show: false, message: '', type: '' });
  const [isSubscribing, setIsSubscribing] = useState(false);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const backToTopButton = document.querySelector('.back-to-top');
      if (backToTopButton) {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('show');
        } else {
          backToTopButton.classList.remove('show');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll for navigation links
  const handleNavClick = (e, targetId, url) => {
    e.preventDefault();
    
    if (targetId && targetId !== '#') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, null, `#${targetId}`);
      }
    } else if (url && url !== '#') {
      window.location.href = url;
    }
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      showNewsletterStatus('error', 'Please enter your email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(newsletterEmail)) {
      showNewsletterStatus('error', 'Please enter a valid email address.');
      return;
    }
    
    setIsSubscribing(true);
    
    setTimeout(() => {
      console.log('Newsletter subscription:', newsletterEmail);
      showNewsletterStatus('success', footerData.newsletter.successMessage);
      setNewsletterEmail('');
      setIsSubscribing(false);
      
      setTimeout(() => {
        setNewsletterStatus(prev => ({ ...prev, show: false }));
      }, 5000);
    }, 1000);
  };
  
  const showNewsletterStatus = (type, message) => {
    setNewsletterStatus({ show: true, message, type });
    setTimeout(() => {
      setNewsletterStatus(prev => ({ ...prev, show: false }));
    }, 5000);
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
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 5.197.153 3.769.51 2.523 1.756 1.277 3.002.92 4.43.84 6.285.782 7.565.768 7.974.768 11.23c0 3.257.014 3.666.072 4.946.08 1.855.437 3.283 1.683 4.529 1.246 1.246 2.674 1.603 4.529 1.683 1.28.058 1.689.072 4.946.072s3.666-.014 4.946-.072c1.855-.08 3.283-.437 4.529-1.683 1.246-1.246 1.603-2.674 1.683-4.529.058-1.28.072-1.689.072-4.946s-.014-3.666-.072-4.946c-.08-1.855-.437-3.283-1.683-4.529C20.231.51 18.803.153 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a5.392 5.392 0 100 10.784 5.392 5.392 0 000-10.784zm0 8.892a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm6.846-9.162a1.26 1.26 0 11-2.52 0 1.26 1.26 0 012.52 0z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.435-11.506c0-.21-.005-.422-.014-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        {/* Main Footer Grid - Compact 4 columns */}
        <div className={`footer-grid ${isVisible ? 'visible' : ''}`}>
          {/* Column 1 - Organization Info (Compact) */}
          <div className="footer-col">
            <div className="footer-logo">
              <span className="logo-icon">{footerData.organization.logoIcon}</span>
              <h3>{footerData.organization.name}</h3>
            </div>
            <p className="footer-tagline">{footerData.organization.tagline}</p>
            <p className="footer-description">{footerData.organization.description.substring(0, 100)}...</p>
            
            {/* Compact Association Badges */}
            <div className="association-badges">
              {footerData.associations.map((assoc, idx) => (
                <span key={idx} className="assoc-badge">
                  <span className="assoc-icon" style={{ color: assoc.color }}>{assoc.icon}</span>
                  {assoc.name}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links (Compact) */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {footerData.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.url} 
                    onClick={(e) => handleNavClick(e, link.id, link.url)}
                  >
                    <span className="link-arrow">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info (Compact) */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="contact-info-footer">
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div className="contact-text">
                  <p>{footerData.address.line1}</p>
                  <p>{footerData.address.line2}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div className="contact-text">
                  {footerData.contact.phone.map((phone, idx) => (
                    <p key={idx}>
                      <a href={`tel:${phone}`}>{phone}</a>
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 7L2 7"/>
                </svg>
                <div className="contact-text">
                  <a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 - Legal & Social (Compact) */}
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              {footerData.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.url}
                    onClick={(e) => handleNavClick(e, link.id, link.url)}
                  >
                    <span className="link-arrow">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Links - Compact */}
            <div className="social-section-footer">
              <h4>Follow Us</h4>
              <div className="social-links-footer">
                {footerData.socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-icon"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section - Minimal */}
        <div className={`footer-bottom ${isVisible ? 'visible' : ''}`}>
          <div className="copyright">
            <p>
              © {footerData.copyright.showYear && currentYear} {footerData.organization.name}. {footerData.copyright.text}
            </p>
          </div>
          <div className="credit">
            <p>Designed with <span className="heart"></span> for the community</p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;