// components/Projects.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Projects data stored in state for easy modification
  const [projectsData, setProjectsData] = useState({
    sectionLabel: 'Our Impact',
    title: 'Featured',
    titleHighlight: 'Project',
    description: 'Real-world initiatives that bring lasting change to the communities we serve.',
    
    // Featured project
    featuredProject: {
      id: 1,
      title: 'Borewell Water Facility at PCDS Global School',
      location: 'Kalvarayan Hills, Kallakurichi, Tamil Nadu',
      image: {
        type: 'placeholder', // Can be 'placeholder', 'url'
        value: '',
        alt: 'Borewell Water Facility at PCDS Global School',
        url: null // Add image URL when available
      },
      description: 'SPEED TRUST has established a vital borewell water facility at PCDS Global School, Kalvarayan Hills — bringing clean, reliable water access directly to 250 tribal children. The project covers borewell drilling, motor pump installation, electrical wiring, and safety systems, addressing long-standing challenges of water scarcity and contamination at the school.',
      impactPoints: [
        'Adequate clean water for drinking, cooking, sanitation, and daily school needs',
        'Reduced absenteeism caused by waterborne illnesses among tribal children',
        'Improved hygiene practices and a safer learning environment',
        'Supports UN Sustainable Development Goal 6 — Clean Water & Sanitation'
      ],
      stats: {
        beneficiaries: '250+',
        children: '250 Tribal Children',
        sdgGoal: 'SDG 6'
      },
      readMoreLink: '#',
      readMoreText: 'Learn More About This Project'
    },
    
    // Other projects (can be expanded)
    otherProjects: [
      {
        id: 2,
        title: 'Digital Classroom Initiative',
        location: 'Various Tribal Schools',
        description: 'Bringing modern education technology to remote tribal schools through smart boards and digital learning resources.',
        impact: '500+ students benefited',
        imageIcon: ''
      },
      {
        id: 3,
        title: 'Nutrition Meal Program',
        location: 'Kallakurichi District',
        description: 'Daily nutritious meals for underprivileged children to combat malnutrition and support healthy growth.',
        impact: '300+ children daily',
        imageIcon: ''
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

  // Function to update featured project
  const updateFeaturedProject = (updatedData) => {
    setProjectsData(prev => ({
      ...prev,
      featuredProject: { ...prev.featuredProject, ...updatedData }
    }));
  };

  // Function to update impact points
  const updateImpactPoints = (newPoints) => {
    setProjectsData(prev => ({
      ...prev,
      featuredProject: { ...prev.featuredProject, impactPoints: newPoints }
    }));
  };

  // Function to add new impact point
  const addImpactPoint = (point) => {
    setProjectsData(prev => ({
      ...prev,
      featuredProject: {
        ...prev.featuredProject,
        impactPoints: [...prev.featuredProject.impactPoints, point]
      }
    }));
  };

  // Function to remove impact point
  const removeImpactPoint = (index) => {
    const updatedPoints = [...projectsData.featuredProject.impactPoints];
    updatedPoints.splice(index, 1);
    setProjectsData(prev => ({
      ...prev,
      featuredProject: { ...prev.featuredProject, impactPoints: updatedPoints }
    }));
  };

  // Function to add other project
  const addOtherProject = (project) => {
    const newId = Math.max(...projectsData.otherProjects.map(p => p.id), 0) + 1;
    setProjectsData(prev => ({
      ...prev,
      otherProjects: [...prev.otherProjects, { ...project, id: newId }]
    }));
  };

  // Function to remove other project
  const removeOtherProject = (projectId) => {
    setProjectsData(prev => ({
      ...prev,
      otherProjects: prev.otherProjects.filter(p => p.id !== projectId)
    }));
  };

  const handleReadMore = (projectId, projectTitle, e) => {
    e.preventDefault();
    console.log(`Redirecting to project details: ${projectTitle} (ID: ${projectId})`);
    // Implement your navigation logic here
    alert(`Navigate to ${projectTitle} details page. Implement your routing logic.`);
  };

  const featured = projectsData.featuredProject;

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className={`sec-eyebrow ${isVisible ? 'visible' : ''}`}>
            {projectsData.sectionLabel}
          </div>
          <h2 className={`projects-title ${isVisible ? 'visible d1' : ''}`}>
            {projectsData.title} <em>{projectsData.titleHighlight}</em>
          </h2>
          <p className={`projects-description ${isVisible ? 'visible d2' : ''}`}>
            {projectsData.description}
          </p>
        </div>

        {/* Featured Project Card */}
        <div className={`featured-project ${isVisible ? 'visible' : ''}`}>
          <div className="featured-project-grid">
            {/* Left Side - Image */}
            <div className="featured-project-image-wrapper">
              <div className="featured-project-image">
                {featured.image.type === 'url' && featured.image.url ? (
                  <img 
                    src={featured.image.url} 
                    alt={featured.image.alt}
                  />
                ) : (
                  <div className="featured-image-placeholder">
                    <div className="water-animation">
                      <span className="water-icon"></span>
                      <span className="water-icon"></span>
                      <span className="water-icon"></span>
                    </div>
                    <p className="placeholder-text">Project Image</p>
                  </div>
                )}
              </div>
              
              {/* Floating Stats Badges */}
              <div className="floating-stats">
                <div className="stat-badge stat-badge-1">
                  <div className="stat-number">{featured.stats.beneficiaries}</div>
                  <div className="stat-label">Beneficiaries</div>
                </div>
                <div className="stat-badge stat-badge-2">
                  <div className="stat-number">{featured.stats.sdgGoal}</div>
                  <div className="stat-label">UN Goal Supported</div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="featured-project-content">
              <div className="project-badge">FEATURED INITIATIVE</div>
              <h3 className="featured-project-title">{featured.title}</h3>
              
              <div className="project-location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{featured.location}</span>
              </div>

              <p className="featured-project-description">{featured.description}</p>

              {/* Impact Points */}
              <div className="impact-section">
                <h4 className="impact-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Key Impact Areas
                </h4>
                <ul className="impact-list">
                  {featured.impactPoints.map((point, index) => (
                    <li key={index} className={`impact-item reveal-delay-${index + 1}`}>
                      <span className="impact-check">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Read More Button */}
              <a 
                href={featured.readMoreLink}
                className="project-readmore-btn"
                onClick={(e) => handleReadMore(featured.id, featured.title, e)}
              >
                {featured.readMoreText}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Other Projects Section */}
        {projectsData.otherProjects.length > 0 && (
          <div className={`other-projects ${isVisible ? 'visible' : ''}`}>
            <div className="other-projects-header">
              <h3>More Initiatives</h3>
              <div className="other-projects-line"></div>
            </div>
            <div className="other-projects-grid">
              {projectsData.otherProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`other-project-card reveal-delay-${index + 1}`}
                >
                  <div className="other-project-icon">{project.imageIcon}</div>
                  <div className="other-project-content">
                    <h4>{project.title}</h4>
                    <div className="other-project-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{project.location}</span>
                    </div>
                    <p>{project.description}</p>
                    <div className="other-project-impact">
                      <span className="impact-tag">{project.impact}</span>
                    </div>
                    <a 
                      href="#"
                      className="other-project-link"
                      onClick={(e) => handleReadMore(project.id, project.title, e)}
                    >
                      Learn More
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;