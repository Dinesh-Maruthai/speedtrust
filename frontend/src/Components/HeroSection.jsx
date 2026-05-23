import React, { useEffect, useState } from 'react';
import heroImage1 from '../assets/img1.jpg';
import heroImage2 from '../assets/about-1.jpg';
import heroImage3 from '../assets/about-2.jpg';
import './HeroSection.css'

import DonationModal from './DonationModel';

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [heroImage1, heroImage2, heroImage3];

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  // Auto-slide images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* LEFT SIDE - Short Info about Speed Trust */}
        <div className="hero-left">
          <h1 className="hero-title">
            Speed trust in <span className="highlight">kallakurichi</span>
          </h1>
          <p className="hero-description">
            We provide shelter, food and education to orphaned, abandoned and underprivileged children.
          </p>
          <p className="hero-subtext">
            Our residential program ensures a safe and nurturing environment where children can grow and learn without financial burdens.
          </p>
          <button className="donate-btn-primary">Support Our Cause</button>
        </div>

        {/* RIGHT SIDE - Sliding Images */}
        <div className="hero-right">
          <div className="slider-container">
            <div 
              className="slider-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="slide">
                  <img src={image} alt={`Speed Trust ${index + 1}`} />
                </div>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="slider-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}