// components/FoodExpenseDetails.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodExpenseDetails.css';

const FoodExpenseDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

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

  const handleTierClick = useCallback((amount) => {
    navigate('/donate');
  }, [navigate]);

  return (
    <section className="donate" id="food-programme" ref={sectionRef}>
      <div className="container donate-grid">
        <div className={`rv ${isVisible ? 'in' : ''}`}>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', color: '#fde68a' }}>Food Programme</span>
          <h2>Nourishing Every <span>Child, Every Day</span></h2>
          <p className="lead" style={{ color: '#c3d0f2' }}>
            Nutritious food is more than a meal — it is care, health, growth, and hope. Every contribution helps provide balanced meals for children who depend on the trust.
          </p>
          <ul className="checks" style={{ color: '#fff' }}>
            <li><i>&#10003;</i> Cost per child: ₹120 per day</li>
            <li><i>&#10003;</i> Covers all meals &amp; nutrition</li>
            <li><i>&#10003;</i> 50 children supported daily</li>
          </ul>
        </div>
        
        <div className={`donate-box rv ${isVisible ? 'in' : ''}`}>
          <h3>Sponsor a Meal Programme</h3>
          <p>Choose how you'd like to support our children's daily nutrition:</p>
          
          <div className="amounts" style={{ marginTop: '20px', gridTemplateColumns: '1fr', gap: '12px', display: 'grid' }}>
            <button onClick={() => handleTierClick('₹120')} style={{ textAlign: 'left', padding: '15px 20px', display: 'flex', justifyContent: 'space-between' }}>
              <span>One Day Food Expense</span>
              <strong style={{ color: 'var(--primary)' }}>₹120</strong>
            </button>
            <button onClick={() => handleTierClick('₹6,000')} style={{ textAlign: 'left', padding: '15px 20px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Feed one child · 50 days</span>
              <strong style={{ color: 'var(--primary)' }}>₹6,000</strong>
            </button>
            <button onClick={() => handleTierClick('₹1,80,000')} style={{ textAlign: 'left', padding: '15px 20px', display: 'flex', justifyContent: 'space-between' }}>
              <span>All children · 1 month</span>
              <strong style={{ color: 'var(--primary)' }}>₹1,80,000</strong>
            </button>
            <button onClick={() => handleTierClick('₹21,90,000')} style={{ textAlign: 'left', padding: '15px 20px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Full year · all children</span>
              <strong style={{ color: 'var(--primary)' }}>₹21,90,000</strong>
            </button>
          </div>
          <button className="btn btn-sun" style={{ width: '100%', marginTop: '20px' }} onClick={() => navigate('/donate')}>Donate for Food &#10084;</button>
        </div>
      </div>
    </section>
  );
};

export default FoodExpenseDetails;