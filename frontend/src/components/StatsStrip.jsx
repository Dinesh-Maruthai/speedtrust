// components/StatsStrip.jsx
import React, { useEffect, useRef, useState } from 'react';
import './StatsStrip.css';

const StatsStrip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const stripRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '500+', label: 'Children Supported' },
    { number: '16+', label: 'Years of Service' },
    { number: '3', label: 'Core Programs' },
    { number: '100%', label: 'Free of Cost' },
    { number: '₹0', label: 'Charged to Families' },
  ];

  return (
    <section className="stats">
      <div className="container">
        <div className={`stats-box rv ${isVisible ? 'in' : ''}`} ref={stripRef}>
          {stats.map((stat, index) => (
            <div className="stat" key={index}>
              <b>{stat.number}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;