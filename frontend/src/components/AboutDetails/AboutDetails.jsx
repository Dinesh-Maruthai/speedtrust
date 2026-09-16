// components/AboutDetails.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AboutDetails.css';

const AboutDetails = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  const [aboutDetailsData] = useState({
    // Hero Section
    hero: {
      eyebrow: 'About Us',
      title: 'Enabling Lives through Education, Care and Inclusion.',
      subtitle: 'Social Public Education and Economic Development Trust (SPEED TRUST), Kallakurichi, is a charitable non-profit working for the education, welfare, rehabilitation, and economic development of tribal children, rural poor families, school dropouts, and persons with intellectual and developmental disabilities in Tamil Nadu.',
      meta: 'Established 15 August 2006 · Registered under the Indian Trust Act 1882, Sub-Registrar Office Kallakurichi District · Registration No. 459/2009'
    },

    missionVision: {
      mission: 'To create meaningful opportunities for individuals to develop their skills, discover their purpose, and achieve the highest possible level of independence with dignity, through comprehensive quality services, advocacy, rehabilitation, education, tribal children\'s education, and inclusive partnerships.',
      vision: 'An equal and inclusive society in which emotional, mental, physical, and learning differences are respected and valued — where every person, regardless of disability or social background, has the right to dignity, education, care, opportunity, and participation in community life.'
    },

    // Focus Areas
    focusAreas: [
      {
        icon: '🧒',
        title: 'Care for Children with Disabilities',
        description: 'Providing free and comprehensive care, education, rehabilitation, and support to children and adults with intellectual and developmental disabilities.'
      },
      {
        icon: '🏫',
        title: 'Tribal Children Education',
        description: 'Providing free, quality residential education and essential support to vulnerable tribal children in the Kalvarayan Hills and other rural areas of Kallakurichi District.'
      }
    ],

    // Projects
    projects: [
      {
        id: 1,
        title: 'PCDS Global School',
        location: 'Kinathuvalavu Village, Innadu Post, Kalvarayan Hills, Kallakurichi District, Tamil Nadu',
        description: 'Since 2015, operating under the Department of Tribal Welfare, Kallakurichi District, Govt. of Tamil Nadu — free residential education from LKG to Class VIII for tribal children.',
        services: [
          'Free residential education',
          'Free food and accommodation',
          'Free clothing and school uniforms',
          'Free shoes, belts, and ties',
          'Basic amenities and personal-care support',
          'Medical facilities and health support',
          'Books, notebooks and educational materials',
          'Sports and co-curricular activities',
          'Overall development and child protection support'
        ],
        impact: '~380 tribal children supported annually',
        emoji: '📚'
      },
      {
        id: 2,
        title: 'Aadhi Special School for Persons with Intellectual Disabilities',
        location: 'Ka. Mamanandhal, Kallakurichi – 606202, Tamil Nadu',
        description: 'Individual-centred special education, residential care, rehabilitation, and developmental support (communication, self-care, social, educational, physical, functional skills). Supported by the District Differently Abled Welfare Office, Kallakurichi District, Govt. of Tamil Nadu.',
        services: [
          'Free special education',
          'Free food and accommodation',
          'Free clothing and uniforms',
          'Free shoes, belts, and ties',
          'Basic amenities and personal-care support',
          'Medical facilities and health monitoring',
          'Quality educational/learning materials',
          'Physiotherapy support and training',
          'Physical/social/emotional development activities',
          'Guidance toward daily living and independence'
        ],
        impact: '~40 inmates served annually',
        emoji: '🧩'
      },
      {
        id: 3,
        title: 'Aadhi Adult Home for Persons with Intellectual Disabilities',
        location: 'Ka. Mamanandhal, Kallakurichi, Tamil Nadu',
        description: 'Residential care, life-skills education, and vocational training for adults with intellectual disabilities, building confidence, practical abilities, self-reliance, and a path to a more stable, dignified life.',
        services: [
          'Tailoring',
          'Embroidery',
          'Floor-mat making',
          'Horticulture',
          'Agriculture',
          'Other livelihood-oriented activities'
        ],
        impact: 'Vocational training for adults with disabilities',
        emoji: '🛠️'
      },
      {
        id: 4,
        title: 'Residential Education for School Dropouts (SSA-Villupuram District, 2010–2020)',
        location: 'Villupuram District, Tamil Nadu',
        description: 'Residential education for school dropouts, street-connected children, children from migrant families, and other vulnerable children aged 6–14. Supported by Samagra Shiksha Abhiyan, Villupuram District, since 16 July 2010.',
        services: [
          'Free food and accommodation',
          'Clothing and basic amenities',
          'Special and bridge education',
          'Yoga and karate training',
          'Vocational and life-skills training',
          'Health and personal-care support',
          'Assistance enrolling in regular schools'
        ],
        impact: '~1,400 school-dropout children benefited (2010–2020) · ~100 children supported per year',
        emoji: '🎓'
      }
    ],

    // Government Partnerships
    partnerships: [
      'Department of Tribal Welfare, Kallakurichi District',
      'District Differently Abled Welfare Office, Kallakurichi District',
      'Social Welfare Department',
      'Samagra Shiksha Abhiyan',
      'Other government agencies and community partners'
    ],

    // Impact Areas
    impactAreas: [
      'Increased access to education for tribal children',
      'Prevention and reduction of school dropouts',
      'Residential care for vulnerable children',
      'Special education for children with intellectual disabilities',
      'Physiotherapy and rehabilitation support',
      'Development of daily living skills',
      'Vocational training for adults with disabilities',
      'Greater family and community inclusion',
      'Improved confidence, dignity, and livelihood opportunities'
    ],
    impactReach: 'Kallakurichi District, Kalvarayan Hills, and surrounding areas — including Cuddalore, Salem, and Villupuram regions.',

    // Proposed Building Project
    buildingProject: {
      title: 'Proposed Permanent Building Project',
      description: 'SPEED TRUST is replacing its current leased premises with a permanent building on publicly donated land at Ka. Mamanandhal Road, Kallakurichi, to serve approximately 380 tribal children from the Kalvarayan Hills.',
      features: [
        'Free residential accommodation',
        'Nutritious food',
        'Basic amenities and personal-care facilities',
        'Health services and regular medical support',
        'Mental-health and emotional-wellness support',
        'School uniforms, clothing, footwear, books, and materials',
        'A secure, supportive learning environment',
        'Sports, cultural activities, and personality development'
      ],
      cost: '₹53 lakh'
    },

    // In-Kind Donations
    inKindDonations: [
      'Cement bags',
      'Bricks',
      'Iron rods',
      'Sand and other construction materials',
      'Educational materials',
      'Furniture and equipment',
      'Health and residential-care items',
      'General construction support'
    ],

    // Financial Transparency
    financials: {
      pan: 'AAKTS0079F',
      twelveA: 'AAKTS0079FE20184',
      eightyG: 'AAKTS0079FF20216',
      csr: '00068761',
      fcra: '076100070',
      darpan: 'TN/2011/0041234'
    },

    // Bank Details
    bankDetails: {
      indian: {
        bankName: 'Indian Bank',
        branch: 'Kallakurichi',
        accountName: 'SPEED TRUST',
        accountNumber: '905822854',
        ifscCode: 'IDIB000K132'
      },
      international: {
        bankName: 'State Bank of India',
        branch: 'New Delhi – Main Branch',
        accountName: 'SPEED TRUST (Social Public Education and Economic Development Trust)',
        accountNumber: '41085242312',
        ifscCode: 'SBIN0000691',
        swiftCode: 'SBININBB104',
        bankAddress: 'FCRA Cell, 1st Floor, 11, Sansad Marg, New Delhi – 110 001, India'
      }
    },

    // Contact
    contact: {
      name: 'SPEED TRUST',
      address: '105/2, Kinatru Metu Street, Ka. Mamanandhal, Kallakurichi – 606202, Tamil Nadu, India',
      phone: '9626056872',
      email: 'speedtrust2006@gmail.com',
      website: 'https://speedtrust.co.in/',
      facebook: 'https://www.facebook.com/karunaiillam.kallakurichi.9'
    },

    // Closing
    closing: {
      message: 'We welcome individuals, institutions, companies, CSR partners, charitable foundations, volunteers, and well-wishers to partner with SPEED TRUST. Together, we can create equal opportunities for tribal children, school dropouts, and persons with disabilities.',
      tagline: 'SPEED TRUST — Enabling lives through education, care, dignity, and opportunity.'
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    Object.keys(sectionRefs.current).forEach(key => {
      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]);
      }
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (key, element) => {
    if (element) {
      sectionRefs.current[key] = element;
    }
  };

  const handleDonateClick = () => {
    navigate('/donate');
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:speedtrust2006@gmail.com';
  };

  return (
    <div className="about-details-page">
      {/* Back to Home Link */}
      <div className="about-details-nav">
        <Link to="/" className="back-home-btn">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* ===== SECTION 1: HERO ===== */}
      <section 
        className="about-details-hero"
        ref={(el) => setSectionRef('hero', el)}
        data-section="hero"
      >
        <div className={`hero-content ${visibleSections.hero ? 'visible' : ''}`}>
          <div className="sec-eyebrow">About Us</div>
          <h1 className="hero-title">{aboutDetailsData.hero.title}</h1>
          <p className="hero-subtitle">{aboutDetailsData.hero.subtitle}</p>
          <p className="hero-meta">{aboutDetailsData.hero.meta}</p>
        </div>
      </section>

      {/* ===== SECTION 2: MISSION & VISION ===== */}
      <section 
        className="about-details-mission-vision"
        ref={(el) => setSectionRef('mission-vision', el)}
        data-section="mission-vision"
      >
        <div className={`mission-vision-grid ${visibleSections['mission-vision'] ? 'visible' : ''}`}>
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>{aboutDetailsData.missionVision.mission}</p>
          </div>
          <div className="vision-card">
            <div className="card-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>{aboutDetailsData.missionVision.vision}</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: FOCUS AREAS ===== */}
      <section 
        className="about-details-focus"
        ref={(el) => setSectionRef('focus', el)}
        data-section="focus"
      >
        <div className={`focus-container ${visibleSections.focus ? 'visible' : ''}`}>
          <h2 className="section-title">Our <em>Focus</em></h2>
          <div className="focus-grid">
            {aboutDetailsData.focusAreas.map((area, index) => (
              <div key={index} className={`focus-card d${index + 1}`}>
                <div className="focus-icon">{area.icon}</div>
                <h4>{area.title}</h4>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: PROJECTS ===== */}
      <section 
        className="about-details-projects"
        ref={(el) => setSectionRef('projects', el)}
        data-section="projects"
      >
        <div className={`projects-container ${visibleSections.projects ? 'visible' : ''}`}>
          <h2 className="section-title">Our <em>Projects</em></h2>
          <div className="projects-grid">
            {aboutDetailsData.projects.map((project, index) => (
              <div key={project.id} className={`project-card d${index + 1}`}>
                <div className="project-header">
                  <div className="project-emoji">{project.emoji}</div>
                  <h3>{project.title}</h3>
                </div>
                <div className="project-location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{project.location}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-services">
                  <h4>Services / Activities Provided:</h4>
                  <ul>
                    {project.services.map((service, idx) => (
                      <li key={idx}>• {service}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-impact">
                  <span className="impact-badge">📊 {project.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: GOVERNMENT PARTNERSHIPS ===== */}
      <section 
        className="about-details-partnerships"
        ref={(el) => setSectionRef('partnerships', el)}
        data-section="partnerships"
      >
        <div className={`partnerships-container ${visibleSections.partnerships ? 'visible' : ''}`}>
          <h2 className="section-title">Government <em>Partnerships</em></h2>
          <div className="partnerships-grid">
            {aboutDetailsData.partnerships.map((partner, index) => (
              <span key={index} className={`partnership-tag d${index + 1}`}>{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: IMPACT ===== */}
      <section 
        className="about-details-impact"
        ref={(el) => setSectionRef('impact', el)}
        data-section="impact"
      >
        <div className={`impact-container ${visibleSections.impact ? 'visible' : ''}`}>
          <h2 className="section-title">Our <em>Impact</em></h2>
          <div className="impact-grid">
            {aboutDetailsData.impactAreas.map((area, index) => (
              <div key={index} className={`impact-item d${index + 1}`}>
                <span className="impact-check">✓</span>
                <span>{area}</span>
              </div>
            ))}
          </div>
          <p className="impact-reach">{aboutDetailsData.impactReach}</p>
        </div>
      </section>

      {/* ===== SECTION 7: BUILDING PROJECT ===== */}
      <section 
        className="about-details-building"
        ref={(el) => setSectionRef('building', el)}
        data-section="building"
      >
        <div className={`building-container ${visibleSections.building ? 'visible' : ''}`}>
          <div className="building-card">
            <h2>{aboutDetailsData.buildingProject.title}</h2>
            <p className="building-description">{aboutDetailsData.buildingProject.description}</p>
            <div className="building-features">
              <h4>It will provide:</h4>
              <ul>
                {aboutDetailsData.buildingProject.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>
            <div className="building-cost">
              <span className="cost-label">Estimated Project Cost:</span>
              <span className="cost-amount">{aboutDetailsData.buildingProject.cost}</span>
            </div>
            <button className="donate-cta-btn" onClick={handleDonateClick}>
              Donate Now
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: IN-KIND DONATIONS ===== */}
      <section 
        className="about-details-inkind"
        ref={(el) => setSectionRef('inkind', el)}
        data-section="inkind"
      >
        <div className={`inkind-container ${visibleSections.inkind ? 'visible' : ''}`}>
          <h2 className="section-title">Request for <em>In-Kind Donations</em></h2>
          <p className="inkind-description">SPEED TRUST welcomes cash or in-kind donations from individuals, organisations, companies, CSR partners, and well-wishers, including:</p>
          <div className="inkind-grid">
            {aboutDetailsData.inKindDonations.map((item, index) => (
              <span key={index} className={`inkind-item d${index + 1}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: FINANCIAL TRANSPARENCY ===== */}
      <section 
        className="about-details-financials"
        ref={(el) => setSectionRef('financials', el)}
        data-section="financials"
      >
        <div className={`financials-container ${visibleSections.financials ? 'visible' : ''}`}>
          <h2 className="section-title">Financial <em>Transparency</em></h2>
          <div className="financials-grid">
            <div className="financial-item">
              <span className="financial-label">PAN</span>
              <span className="financial-value">{aboutDetailsData.financials.pan}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">12A</span>
              <span className="financial-value">{aboutDetailsData.financials.twelveA}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">80G</span>
              <span className="financial-value">{aboutDetailsData.financials.eightyG}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">CSR</span>
              <span className="financial-value">{aboutDetailsData.financials.csr}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">FCRA</span>
              <span className="financial-value">{aboutDetailsData.financials.fcra}</span>
            </div>
            <div className="financial-item">
              <span className="financial-label">DARPAN</span>
              <span className="financial-value">{aboutDetailsData.financials.darpan}</span>
            </div>
          </div>
          <p className="financials-note">Donors are requested to verify the applicability of tax benefits, documentation requirements, and permitted modes of donation with SPEED TRUST before making a contribution.</p>
        </div>
      </section>

      {/* ===== SECTION 10: BANK DETAILS ===== */}
      <section 
        className="about-details-bank"
        ref={(el) => setSectionRef('bank', el)}
        data-section="bank"
      >
        <div className={`bank-container ${visibleSections.bank ? 'visible' : ''}`}>
          <h2 className="section-title">Bank <em>Details</em></h2>
          <div className="bank-grid">
            <div className="bank-card indian">
              <h3>🇮🇳 Indian Donors</h3>
              <div className="bank-info">
                <p><strong>Bank Name:</strong> {aboutDetailsData.bankDetails.indian.bankName}</p>
                <p><strong>Branch:</strong> {aboutDetailsData.bankDetails.indian.branch}</p>
                <p><strong>Account Name:</strong> {aboutDetailsData.bankDetails.indian.accountName}</p>
                <p><strong>Account Number:</strong> {aboutDetailsData.bankDetails.indian.accountNumber}</p>
                <p><strong>IFSC Code:</strong> {aboutDetailsData.bankDetails.indian.ifscCode}</p>
              </div>
            </div>
            <div className="bank-card international">
              <h3>🌍 International Donors (FCRA)</h3>
              <div className="bank-info">
                <p><strong>Bank Name:</strong> {aboutDetailsData.bankDetails.international.bankName}</p>
                <p><strong>Branch:</strong> {aboutDetailsData.bankDetails.international.branch}</p>
                <p><strong>Account Name:</strong> {aboutDetailsData.bankDetails.international.accountName}</p>
                <p><strong>Account Number:</strong> {aboutDetailsData.bankDetails.international.accountNumber}</p>
                <p><strong>IFSC Code:</strong> {aboutDetailsData.bankDetails.international.ifscCode}</p>
                <p><strong>Swift Code:</strong> {aboutDetailsData.bankDetails.international.swiftCode}</p>
                <p><strong>Bank Address:</strong> {aboutDetailsData.bankDetails.international.bankAddress}</p>
              </div>
            </div>
          </div>
          <p className="bank-note">Please contact SPEED TRUST after making a donation so that an official acknowledgement and receipt can be issued.</p>
        </div>
      </section>

      {/* ===== SECTION 11: CONTACT ===== */}
      <section 
        className="about-details-contact"
        ref={(el) => setSectionRef('contact', el)}
        data-section="contact"
      >
        <div className={`contact-container ${visibleSections.contact ? 'visible' : ''}`}>
          <h2 className="section-title">Contact <em>Us</em></h2>
          <div className="contact-card">
            <h3>{aboutDetailsData.contact.name}</h3>
            <p className="contact-address">{aboutDetailsData.contact.address}</p>
            <div className="contact-details">
              <p><strong>Phone / WhatsApp:</strong> {aboutDetailsData.contact.phone}</p>
              <p><strong>Email:</strong> <a href={`mailto:${aboutDetailsData.contact.email}`}>{aboutDetailsData.contact.email}</a></p>
              <p><strong>Website:</strong> <a href={aboutDetailsData.contact.website} target="_blank" rel="noopener noreferrer">{aboutDetailsData.contact.website}</a></p>
              <p><strong>Facebook:</strong> <a href={aboutDetailsData.contact.facebook} target="_blank" rel="noopener noreferrer">{aboutDetailsData.contact.facebook}</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 12: CLOSING ===== */}
      <section 
        className="about-details-closing"
        ref={(el) => setSectionRef('closing', el)}
        data-section="closing"
      >
        <div className={`closing-container ${visibleSections.closing ? 'visible' : ''}`}>
          <p className="closing-message">{aboutDetailsData.closing.message}</p>
          <h2 className="closing-tagline">{aboutDetailsData.closing.tagline}</h2>
          <div className="closing-buttons">
            <button className="donate-cta-btn" onClick={handleDonateClick}>
              Donate Now
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
            <button className="contact-cta-btn" onClick={handleContactClick}>
              Contact Us
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDetails;