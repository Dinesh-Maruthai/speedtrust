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
    { number: '187', label: 'Disabled Children Identified', delay: 0 },
    { number: '349', label: 'Street Children Found', delay: 0.1 },
    { number: '15+', label: 'Years of Service (2009)', delay: 0.2 },
    { number: '100%', label: 'Free for All Families', delay: 0.3 },
    { number: '₹0', label: 'Charged to Beneficiaries', delay: 0.4 },
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