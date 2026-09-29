// components/Projects.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const featured = {
    title: 'Borewell Water Facility at PCDS Global School',
    location: 'Kalvarayan Hills, Kallakurichi, Tamil Nadu',
    image: "/borewellProgram.jpg",
    description: 'SPEED TRUST has established a vital borewell water facility at PCDS Global School, Kalvarayan Hills — bringing clean, reliable water access directly to 250 tribal children. The project covers borewell drilling, motor pump installation, electrical wiring, and safety systems, addressing long-standing challenges of water scarcity and contamination at the school.',
    impactPoints: [
      'Adequate clean water for drinking, cooking, sanitation, and daily school needs',
      'Reduced absenteeism caused by waterborne illnesses among tribal children',
      'Improved hygiene practices and a safer learning environment',
      'Supports UN Sustainable Development Goal 6 — Clean Water & Sanitation'
    ]
  };

  const otherProjects = [
    {
      id: 2,
      title: 'Digital Classroom Initiative',
      location: 'Various Tribal Schools',
      description: 'Bringing modern education technology to remote tribal schools through smart boards and digital learning resources.',
      impact: '500+ students benefited',
      icon: '💻',
      color: '#fb7185'
    },
    {
      id: 3,
      title: 'Nutrition Meal Program',
      location: 'Kallakurichi District',
      description: 'Daily nutritious meals for underprivileged children to combat malnutrition and support healthy growth.',
      impact: '300+ children daily',
      icon: '🍲',
      color: '#34d399'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} style={{ background: 'var(--soft)' }}>
      <div className="container">
        <div className={`section-head rv ${isVisible ? 'in' : ''}`}>
          <span className="eyebrow">Our Impact</span>
          <h2>Featured <span className="script">Project</span></h2>
          <p className="lead">Real-world initiatives that bring lasting change to the communities we serve.</p>
        </div>

        <div className={`project-featured rv ${isVisible ? 'in' : ''}`}>
          <div className="pf-img">
            {featured.image ? (
              <img src={featured.image} alt={featured.title} />
            ) : (
              <div className="pf-placeholder">Project Image</div>
            )}
          </div>
          <div className="pf-content">
            <span className="tag" style={{ '--c': 'var(--primary)' }}>Featured Initiative</span>
            <h3>{featured.title}</h3>
            <p className="pf-loc">&#128205; {featured.location}</p>
            <p className="pf-desc">{featured.description}</p>
            <ul className="checks" style={{ fontSize: '.9rem' }}>
              {featured.impactPoints.map((pt, i) => (
                <li key={i}><i>&#10003;</i> {pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {otherProjects.length > 0 && (
          <>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '60px' }} className={`rv ${isVisible ? 'in' : ''}`}>More Initiatives</h3>
            <div className={`pgrid rv ${isVisible ? 'in' : ''}`}>
              {otherProjects.map((p) => (
                <div className="card" key={p.id} style={{ '--c': p.color }}>
                  <div className="icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '.8rem', marginBottom: '10px' }}>&#128205; {p.location}</p>
                  <p>{p.description}</p>
                  <div style={{ marginTop: '14px' }}>
                    <span className="tag" style={{ '--c': p.color }}>{p.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;