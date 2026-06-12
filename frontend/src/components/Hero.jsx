// components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import './Hero.css';
import childrensImage from '../assets/childrens.jpg';

const Hero = () => {
  const ringsRef = useRef(null);

  useEffect(() => {
    const rings = ringsRef.current;
    if (rings) {
      const ringElements = rings.children;
      Array.from(ringElements).forEach((ring, index) => {
        ring.style.animation = `ringPulse ${3 + index * 0.5}s ease-in-out infinite`;
        ring.style.animationDelay = `${index * 0.2}s`;
      });
    }
  }, []);

  return (
    <section className="hero">
      {/* concentric rings */}
      <div className="hero-rings" aria-hidden="true" ref={ringsRef}>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
      </div>

      <div className="hero-content">
        {/* badges */}
       
        <div className="hero-badges">
          <div className="badge badge-1">
            <div className="badge-dot">
              <svg viewBox="0 0 12 12">
                <polyline points="2,6 5,9 10,3" stroke="#133215" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Kallakurichi, Tamil Nadu
          </div>
          <div className="badge badge-2">
            <div className="badge-dot">
              <svg viewBox="0 0 12 12">
                <polyline points="2,6 5,9 10,3" stroke="#133215" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Since 2008 — 16+ Years of Hope
          </div>
        </div>

        {/* title */}
        <h1 className="hero-title">
          Speed Trust<br />in <em>Kallakurichi</em>
        </h1>

        {/* description */}
        <p className="hero-desc">
          We provide shelter, food and education to orphaned, abandoned and underprivileged children.
          Our residential program ensures a safe and nurturing environment where children can grow and learn without financial burdens.
        </p>

        {/* CTA buttons */}
        <div className="hero-btns">
          <a href="#" className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            Donate Now
          </a>
          <a href="#" className="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            View Events
          </a>
        </div>
      </div>

      {/* scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-arrow">
          <svg viewBox="0 0 14 14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,5 7,10 12,5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;