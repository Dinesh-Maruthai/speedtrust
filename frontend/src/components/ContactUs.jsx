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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullname.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Please fill in all required fields.', show: true });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setFormStatus({ type: 'success', message: 'Thank you! We will get back to you soon.', show: true });
      setFormData({ fullname: '', email: '', phone: '', inquiryType: 'general', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ show: false }), 5000);
    }, 1500);
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container contact-grid">
        <div className={`contact-info rv ${isVisible ? 'in' : ''}`}>
          <span className="eyebrow" style={{ background: 'var(--soft)', color: 'var(--primary)' }}>Get In Touch</span>
          <h2>Contact <span className="script">Us</span></h2>
          <p className="lead">Have questions? We'd love to hear from you. Reach out to us anytime, and our team will get back to you within 24 hours.</p>
          
          <div className="info-list">
            <div className="info-item">
              <div className="icon">&#128205;</div>
              <div>
                <h4>Visit Us</h4>
                <p>Ka.Mamananthal, Kallakurichi District<br/>Tamil Nadu, India 606202</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon">&#128222;</div>
              <div>
                <h4>Call Us</h4>
                <p>9626056872 / 9677979306</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon">&#9993;&#65039;</div>
              <div>
                <h4>Email Us</h4>
                <p>speedtrust15@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`contact-form-box rv ${isVisible ? 'in' : ''}`}>
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Inquiry Type</label>
              <select name="inquiryType" value={formData.inquiryType} onChange={handleInputChange}>
                <option value="volunteering">Volunteering</option>
                <option value="donation">Donation / Sponsorship</option>
                <option value="admission">Child Admission</option>
                <option value="collab">Partnership / Collaboration</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Your Message *</label>
              <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange} required></textarea>
            </div>
            
            {formStatus.show && (
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <div style={{ padding: '10px', background: formStatus.type === 'error' ? '#fef2f2' : '#f0fdf4', color: formStatus.type === 'error' ? '#991b1b' : '#166534', borderRadius: '8px', fontSize: '.9rem' }}>
                  {formStatus.message}
                </div>
              </div>
            )}
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;