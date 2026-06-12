// components/Services.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Services data stored as object for easy modification
  const [servicesData, setServicesData] = useState({
    sectionLabel: 'What We Do',
    title: 'Our',
    titleHighlight: 'Services',
    description: 'We are committed to transforming lives through dedicated care, quality education, and compassionate support for the most vulnerable members of our community.',
    
    // Card data array - easily modifiable
    cards: [
      {
        id: 1,
        title: 'Support for Mentally Disabled Children',
        image: {
          type: 'placeholder', // Can be 'placeholder', 'emoji', or 'url'
          value: '🧠',
          alt: 'Support for Mentally Disabled Children',
          url: null // Add image URL here when available
        },
        description: 'We provide special care, education, and emotional support for mentally disabled children. Through personalized learning programs, therapy sessions, and compassionate caretakers, we aim to empower these children to live with dignity and confidence.',
        readMoreLink: '#',
        readMoreText: 'Read More',
        icon: '🧠'
      },
      {
        id: 2,
        title: 'Tribal School Upliftment',
        image: {
          type: 'placeholder',
          value: '🏫',
          alt: 'Tribal School Upliftment',
          url: null
        },
        description: 'We work closely with tribal communities to improve access to quality education. Our tribal school initiatives include providing learning materials, improving infrastructure, supporting teachers, and ensuring that every child in remote regions gets the right to education.',
        readMoreLink: '#',
        readMoreText: 'Read More',
        icon: '🏫'
      },
      {
        id: 3,
        title: 'Adult Care and Shelter',
        image: {
          type: 'placeholder',
          value: '🏠',
          alt: 'Adult Care and Shelter',
          url: null
        },
        description: 'Our trust offers safe and nurturing homes for destitute adults and the elderly. We provide shelter, food, medical care, and companionship, ensuring that those who are neglected or homeless find a place of care, love, and respect.',
        readMoreLink: '#',
        readMoreText: 'Read More',
        icon: '🏠'
      }
    ]
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

  // Function to update entire services data
  const updateServicesData = (newData) => {
    setServicesData(prev => ({ ...prev, ...newData }));
  };

  // Function to update a specific card
  const updateCard = (cardId, updatedCardData) => {
    const updatedCards = servicesData.cards.map(card =>
      card.id === cardId ? { ...card, ...updatedCardData } : card
    );
    setServicesData(prev => ({ ...prev, cards: updatedCards }));
  };

  // Function to add a new card
  const addCard = (newCard) => {
    const newId = Math.max(...servicesData.cards.map(c => c.id), 0) + 1;
    setServicesData(prev => ({
      ...prev,
      cards: [...prev.cards, { ...newCard, id: newId }]
    }));
  };

  // Function to remove a card
  const removeCard = (cardId) => {
    setServicesData(prev => ({
      ...prev,
      cards: prev.cards.filter(card => card.id !== cardId)
    }));
  };

  // Redirect function for individual cards
  const handleReadMore = (cardId, cardTitle, e) => {
    e.preventDefault();
    console.log(`Redirecting to details page for: ${cardTitle} (ID: ${cardId})`);
    
    // You can implement different redirect logic here
    // Examples:
    // 1. Navigate to specific route: navigate(`/services/${cardId}`)
    // 2. Open modal with details: openModal(cardId)
    // 3. Scroll to details section: scrollToDetails(cardId)
    // 4. External link: window.open(`/services/${cardId}`, '_blank')
    
    // For now, we'll just show an alert (remove in production)
    alert(`Redirecting to ${cardTitle} details page. Implement your navigation logic here.`);
  };

  // Render image based on type
  const renderImage = (image) => {
    if (image.type === 'url' && image.url) {
      return (
        <img 
          src={image.url} 
          alt={image.alt}
          className="service-card-image"
        />
      );
    } else if (image.type === 'emoji') {
      return (
        <div className="service-card-emoji">
          <span>{image.value}</span>
        </div>
      );
    } else {
      // Default placeholder with icon/emoji
      return (
        <div className="service-card-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
        </div>
      );
    }
  };

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <div className={`sec-eyebrow ${isVisible ? 'visible' : ''}`}>
            {servicesData.sectionLabel}
          </div>
          <h2 className={`services-title ${isVisible ? 'visible d1' : ''}`}>
            {servicesData.title} <em>{servicesData.titleHighlight}</em>
          </h2>
          <p className={`services-description ${isVisible ? 'visible d2' : ''}`}>
            {servicesData.description}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="services-grid">
          {servicesData.cards.map((card, index) => (
            <div 
              key={card.id}
              className={`service-card ${isVisible ? `visible delay-${index + 1}` : ''}`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {/* Card Image Section */}
              <div className="service-card-image-wrapper">
                {renderImage(card.image)}
                <div className="service-card-overlay">
                  <span className="service-card-icon">{card.icon}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="service-card-content">
                <h3 className="service-card-title">{card.title}</h3>
                <p className="service-card-description">{card.description}</p>
                <a 
                  href={card.readMoreLink}
                  className="service-card-readmore"
                  onClick={(e) => handleReadMore(card.id, card.title, e)}
                >
                  {card.readMoreText}
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: View All Services Button */}
      <div className={`services-footer ${isVisible ? 'visible' : ''}`}>
        <button className="view-all-btn">
          View All Services
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Services;