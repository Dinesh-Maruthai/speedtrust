// components/AboutUs.jsx
import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({
    reveal: false,
    revealLeft: false,
    revealRight: false
  });
  
  const sectionRef = useRef(null);

  // State data - easily customizable
  const [aboutData, setAboutData] = useState({
    // Section label
    sectionLabel: 'About Us',
    
    // Title section
    title: 'Who We',
    titleHighlight: 'Are',
    
    // Full name badge
    fullName: 'Social Public Education & Economic Development Trust',
    
    // Main description
    description: `What started with just a handful of children has now grown into a full-fledged residential school and rehabilitation centre. Over the years, SPEED TRUST has reached out to thousands of children through its free education programs, skill-building initiatives, and special care for mentally challenged children.`,
    
    // Pillars/Highlights
    pillars: [
      {
        icon: '🍽️',
        text: 'We ensure all children under our care receive ',
        highlight: 'balanced, nutritious meals',
        suffix: ' every single day.'
      },
      {
        icon: '🤝',
        text: 'Our dedicated school for ',
        highlight: 'differently-abled children',
        suffix: ' supports those with autism and cerebral palsy.'
      },
      {
        icon: '🏠',
        text: 'We provide ',
        highlight: 'shelter, food, and education',
        suffix: ' to orphaned, abandoned, and underprivileged children.'
      }
    ],
    
    // Button
    buttonText: 'Read More About Us',
    buttonLink: '#',
    
    // Image section
    imagePlaceholder: true,
    imageUrl: null, // Set to image URL when available
    imageAlt: 'Speed Trust Campus and Children',
    
    // Stat badges
    badges: [
      {
        number: '500+',
        label: 'Children Supported',
        position: 'bottom-left',
        delay: 'd2'
      },
      {
        number: '16+ Yrs',
        label: 'Of Dedicated Service',
        position: 'top-right',
        delay: 'd3'
      }
    ]
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible({
              reveal: true,
              revealLeft: true,
              revealRight: true
            });
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

  // Function to update about data (can be called from parent or form)
  const updateAboutData = (newData) => {
    setAboutData(prev => ({ ...prev, ...newData }));
  };

  // Function to update pillars
  const updatePillar = (index, newPillar) => {
    const updatedPillars = [...aboutData.pillars];
    updatedPillars[index] = { ...updatedPillars[index], ...newPillar };
    setAboutData(prev => ({ ...prev, pillars: updatedPillars }));
  };

  // Function to update badges
  const updateBadge = (index, newBadge) => {
    const updatedBadges = [...aboutData.badges];
    updatedBadges[index] = { ...updatedBadges[index], ...newBadge };
    setAboutData(prev => ({ ...prev, badges: updatedBadges }));
  };

  const handleReadMore = (e) => {
    e.preventDefault();
    console.log('Read More clicked - can navigate to about page or open modal');
    // Add your navigation or modal logic here
  };

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-grid">
        {/* ── LEFT: TEXT ── */}
        <div className="about-left">
          <div className={`sec-eyebrow ${isVisible.reveal ? 'visible' : ''}`}>
            {aboutData.sectionLabel}
          </div>

          <h2 className={`about-title ${isVisible.reveal ? 'visible d1' : ''}`}>
            {aboutData.title} <em>{aboutData.titleHighlight}</em>
          </h2>

          <span className={`about-full-name ${isVisible.reveal ? 'visible d2' : ''}`}>
            {aboutData.fullName}
          </span>

          <p className={`about-body ${isVisible.reveal ? 'visible d2' : ''}`}>
            {aboutData.description.split('SPEED TRUST').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i === 0 && <strong>SPEED TRUST</strong>}
              </React.Fragment>
            ))}
          </p>

          {/* Pillars */}
          <div className="pillars">
            {aboutData.pillars.map((pillar, index) => (
              <div 
                key={index}
                className={`pillar-item ${isVisible.reveal ? `visible d${index + 2}` : ''}`}
              >
                <div className="pillar-icon">{pillar.icon}</div>
                <span className="pillar-text">
                  {pillar.text}
                  <em>{pillar.highlight}</em>
                  {pillar.suffix}
                </span>
              </div>
            ))}
          </div>

          {/* Read More Button */}
          <a 
            href={aboutData.buttonLink} 
            className={`read-more-btn ${isVisible.reveal ? 'visible d4' : ''}`}
            onClick={handleReadMore}
          >
            {aboutData.buttonText}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </div>

        {/* ── RIGHT: IMAGE ── */}
        <div className={`about-right ${isVisible.revealRight ? 'visible' : ''}`}>
          <div className="img-accent-dot"></div>

          <div className="img-frame">
            {aboutData.imagePlaceholder && !aboutData.imageUrl ? (
              <div className="img-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="#92B775" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                <span>Your Photo Here</span>
              </div>
            ) : (
              <img 
                src={aboutData.imageUrl} 
                alt={aboutData.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>

          {/* Stat badges */}
          {aboutData.badges.map((badge, index) => (
            <div 
              key={index}
              className={`${badge.position === 'bottom-left' ? 'img-stat-badge' : 'img-stat-badge2'} ${isVisible.reveal ? `visible ${badge.delay}` : ''}`}
            >
              <div className={badge.position === 'bottom-left' ? 'isb-num' : 'isb2-num'}>
                {badge.number}
              </div>
              <div className={badge.position === 'bottom-left' ? 'isb-label' : 'isb2-label'}>
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;