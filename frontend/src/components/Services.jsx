// components/Services.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      id: 1,
      title: 'Support for Mentally Disabled Children',
      description: 'We provide special care, education, and emotional support for mentally disabled children. Through personalized learning programs, therapy sessions, and compassionate caretakers, we aim to empower these children to live with dignity and confidence.',
      icon: '🧠',
      color: '#2563eb'
    },
    {
      id: 2,
      title: 'Tribal School Upliftment',
      description: 'We work closely with tribal communities to improve access to quality education. Our tribal school initiatives include providing learning materials, improving infrastructure, supporting teachers, and ensuring that every child in remote regions gets the right to education.',
      icon: '🏫',
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Adult Care and Shelter',
      description: 'Our trust offers safe and nurturing homes for destitute adults and the elderly. We provide shelter, food, medical care, and companionship, ensuring that those who are neglected or homeless find a place of care, love, and respect.',
      icon: '🏠',
      color: '#fb7185'
    }
  ];

  return (
    <section id="programs" ref={sectionRef}>
      <div className="container">
        <div className={`section-head rv ${isVisible ? 'in' : ''}`}>
          <span className="eyebrow">What We Do</span>
          <h2>Programs Built for Every Child's Future</h2>
          <p className="lead">
            We are committed to transforming lives through dedicated care, quality education, and compassionate support for the most vulnerable members of our community.
          </p>
        </div>
        <div className="cards">
          {cards.map((card, index) => (
            <article 
              className={`card rv ${isVisible ? 'in' : ''}`} 
              key={card.id} 
              style={{ '--c': card.color, transitionDelay: `${index * 70}ms` }}
            >
              <div className="icon">{card.icon}</div>
              <span className="tag">Program</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link className="link" to="/donate">Read More &rarr;</Link>
            </article>
          ))}
        </div>
        <p className={`pills-title rv ${isVisible ? 'in' : ''}`}>Also Supporting</p>
        <div className={`pills rv ${isVisible ? 'in' : ''}`}>
          <span>Skill Training</span><span>Girl Child Support</span><span>Clean Water</span><span>Scholarships</span><span>Counselling</span><span>Sports &amp; Arts</span><span>Emergency Relief</span>
        </div>
      </div>
    </section>
  );
};

export default Services;