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
    { number: '500+', label: 'Children Supported', delay: 0 },
    { number: '16+', label: 'Years of Service', delay: 0.1 },
    { number: '3', label: 'Core Programs', delay: 0.2 },
    { number: '100%', label: 'Free of Cost', delay: 0.3 },
    { number: '₹0', label: 'Charged to Families', delay: 0.4 },
  ];

  return (
    <div className="preview-strip" ref={stripRef}>
      <div className={`preview-card ${isVisible ? 'animate-in' : ''}`}>
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div
              className="stat-item"
              style={{ animationDelay: `${stat.delay}s` }}
            >
              <div className="stat-num">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
            {index < stats.length - 1 && <div className="stat-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatsStrip;