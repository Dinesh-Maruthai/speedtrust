import React from 'react';
import './AboutUs.css'

export default function AboutUs() {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>Who We Are</h1>
          <p className="hero-subtitle">SPEED TRUST (Social Public Education and Economic Development Trust)</p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="about-main">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Journey</h2>
              <p className="journey-text">
                What started with just a handful of children has now grown into a full-fledged residential school 
                and rehabilitation center. Over the years, SPEED TRUST has reached out to thousands of children 
                through its free education programs, skill-building initiatives, and special care for mentally 
                challenged children.
              </p>
              
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Children Reached</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">250+</span>
                  <span className="stat-label">Annual Support</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Care & Support</span>
                </div>
              </div>
            </div>

            <div className="about-image">
              <img 
                src="/api/placeholder/500/400" 
                alt="Speed Trust children"
                className="about-img"
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mission-vision">
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>
                To provide shelter, food, and education to orphaned, abandoned, and underprivileged children, 
                ensuring they grow in a safe and nurturing environment without financial burdens.
              </p>
            </div>
            <div className="vision-card">
              <h3>Our Vision</h3>
              <p>
                To create a society where every child has access to quality education, healthcare, and opportunities 
                to become confident, responsible young adults regardless of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="what-we-provide">
        <div className="container">
          <h2>What We Provide – 100% Free</h2>
          <div className="provide-grid">
            <div className="provide-item">
              <div className="icon">🏠</div>
              <h4>Safe Shelter</h4>
              <p>Residential program with nurturing environment</p>
            </div>
            <div className="provide-item">
              <div className="icon">🍲</div>
              <h4>Balanced Meals</h4>
              <p>Nutritious food for healthy growth</p>
            </div>
            <div className="provide-item">
              <div className="icon">📚</div>
              <h4>Quality Education</h4>
              <p>English, Tamil, Maths, Science & Computer education</p>
            </div>
            <div className="provide-item">
              <div className="icon">🏥</div>
              <h4>Medical Care</h4>
              <p>Regular checkups & health support</p>
            </div>
            <div className="provide-item">
              <div className="icon">🧠</div>
              <h4>Mental Health Support</h4>
              <p>Counseling & emotional care</p>
            </div>
            <div className="provide-item">
              <div className="icon">🎨</div>
              <h4>Life Skills Training</h4>
              <p>Sports, yoga, arts & leadership skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs Section */}
      <section className="special-programs">
        <div className="container">
          <h2>Our Special Initiatives</h2>
          <div className="programs-grid">
            
            {/* Program 1 */}
            <div className="program-card">
              <h3>Support for Mentally Disabled Children</h3>
              <p>
                We provide special care, education, and emotional support for mentally disabled children. 
                Through personalized learning programs, therapy sessions, and compassionate caretakers, 
                we aim to empower these children to live with dignity and confidence.
              </p>
              <ul>
                <li>Individualized education programs</li>
                <li>Speech therapy & physiotherapy</li>
                <li>Life skills training</li>
                <li>Support for autism, cerebral palsy, Down syndrome</li>
              </ul>
            </div>

            {/* Program 2 */}
            <div className="program-card">
              <h3>Tribal School Upliftment</h3>
              <p>
                We work closely with tribal communities to improve access to quality education. 
                Our tribal school initiatives include providing learning materials, improving infrastructure, 
                supporting teachers, and ensuring that every child in remote regions gets the right to education.
              </p>
              <ul>
                <li>First-generation tribal learners</li>
                <li>Bridge courses for dropouts</li>
                <li>Infrastructure development</li>
                <li>Teacher support & training</li>
              </ul>
            </div>

            {/* Program 3 */}
            <div className="program-card">
              <h3>Adult Care and Shelter</h3>
              <p>
                Our trust offers safe and nurturing homes for destitute adults and the elderly. 
                We provide shelter, food, medical care, and companionship, ensuring that those who are 
                neglected or homeless find a place of care, love, and respect.
              </p>
              <ul>
                <li>Safe housing for destitute adults</li>
                <li>Regular medical care</li>
                <li>Emotional support & companionship</li>
                <li>Dignity & respect for elderly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PCDS Global School Section */}
      <section className="school-section">
        <div className="container">
          <div className="school-content">
            <div className="school-text">
              <h2>About PCDS Global School</h2>
              <h3>A SPEED TRUST Initiative</h3>
              <p>
                PCDS Global School, Kinathu Valavu village in Kalvarayan Hills, is a residential school run by 
                SPEED TRUST for first‑generation tribal and rural poor school drop‑out children.
              </p>
              <p className="impact-stats">
                <strong>Every year, we support 250+ children</strong> who would otherwise be out of school, 
                giving them a safe home and a real chance to complete quality education.
              </p>
              <p>
                Our academic programme is designed to match the standards of central and good private schools, 
                with strong focus on English, Tamil, mathematics, science and computer education, while respecting 
                tribal culture and mother tongue. Children also learn sports, yoga, arts, life‑skills and leadership 
                so they can grow into confident, responsible young adults.
              </p>
            </div>
            <div className="school-image">
              <img 
                src="/api/placeholder/500/400" 
                alt="PCDS Global School"
                className="school-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Commitments */}
      <section className="commitments">
        <div className="container">
          <h2>Our Commitments</h2>
          <div className="commitments-grid">
            <div className="commitment-item">
              <div className="check-icon">✓</div>
              <p>All children under our care receive balanced meals</p>
            </div>
            <div className="commitment-item">
              <div className="check-icon">✓</div>
              <p>Dedicated school for differently-abled children</p>
            </div>
            <div className="commitment-item">
              <div className="check-icon">✓</div>
              <p>Shelter, food, and education for orphaned & abandoned children</p>
            </div>
            <div className="commitment-item">
              <div className="check-icon">✓</div>
              <p>Regular medical checkups & hygiene education</p>
            </div>
            <div className="commitment-item">
              <div className="check-icon">✓</div>
              <p>Support for school dropouts & migrant children</p>
            </div>
            <div className="commitment-item">
              <div className="check-icon">✓</div>
              <p>Bridge courses & academic support tailored to needs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}