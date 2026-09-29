// components/AboutUs.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section className="why" id="why" ref={sectionRef}>
      <div className="container why-grid">
        <div className={`why-text rv ${isVisible ? 'in' : ''}`}>
          <span className="eyebrow">About Us</span>
          <h2>Who We <span className="script">Are</span></h2>
          <p className="lead">
            <strong>SPEED TRUST</strong>, Kallakurichi, is a charitable non-profit organization working for the education, welfare, rehabilitation, and economic development of tribal children, rural poor families, school dropouts, and persons with intellectual and developmental disabilities in Tamil Nadu.
          </p>
          <ul className="checks">
            <li><i>&#10003;</i> Enabling Lives through Education, Care and Inclusion.</li>
          </ul>
          <div style={{ marginTop: '24px' }}>
            <a href="/about" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>Read More About Us</a>
          </div>
        </div>
        <div className="why-list">
          <div className={`why-item rv ${isVisible ? 'in' : ''}`} style={{ transitionDelay: '0ms' }}>
            <div className="n">&#127858;</div>
            <h3>Nutrition</h3>
            <p>We ensure all children under our care receive balanced, nutritious meals every single day.</p>
          </div>
          <div className={`why-item rv ${isVisible ? 'in' : ''}`} style={{ transitionDelay: '70ms' }}>
            <div className="n">&#129309;</div>
            <h3>Inclusion</h3>
            <p>Our dedicated school for differently-abled children supports those with autism and cerebral palsy.</p>
          </div>
          <div className={`why-item rv ${isVisible ? 'in' : ''}`} style={{ transitionDelay: '140ms' }}>
            <div className="n">&#127968;</div>
            <h3>Safe Homes</h3>
            <p>We provide shelter, food, and education to orphaned, abandoned, and underprivileged children.</p>
          </div>
          <div className={`why-item rv ${isVisible ? 'in' : ''}`} style={{ transitionDelay: '210ms' }}>
            <div className="n">&#128150;</div>
            <h3>Child-First</h3>
            <p>Every decision starts with what is best for the child.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;