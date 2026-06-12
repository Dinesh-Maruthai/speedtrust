// FoodExpenseDetails.jsx
import React, { useEffect, useState, useCallback } from 'react';
import './FoodExpenseDetails.css';

const FoodExpenseDetails = () => {
  const [activeTier, setActiveTier] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const donationTiers = [
    { amount: '₹120', description: 'Feed one child · 1 day', type: 'tc-1', delay: 'delay-1' },
    { amount: '₹6,000', description: 'Feed one child · 50 days', type: 'tc-2', delay: 'delay-2' },
    { amount: '₹1,80,000', description: 'All children · 1 month', type: 'tc-3', delay: 'delay-3' },
    { amount: '₹21,90,000', description: 'Full year · all children', type: 'tc-4', delay: 'delay-4' },
  ];

  const handleTierClick = useCallback((amount, index) => {
    setActiveTier(index);
    console.log(`Donation selected: ${amount}`);
    alert(`Thank you for considering a donation of ${amount}! This will help nourish our children.`);
    
    setTimeout(() => {
      setActiveTier(null);
    }, 600);
  }, []);

  const handleKeyPress = useCallback((e, amount, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTierClick(amount, index);
    }
  }, [handleTierClick]);

  return (
    <div className="food-section">
      {/* TOP ROW */}
      <div className="fs-top">
        <div className="reveal">
          <div className="fs-eyebrow">Food Programme</div>
          <div className="fs-heading">
            Nourishing Every<br /><em>Child, Every Day</em>
          </div>
        </div>
        <p className="fs-desc reveal delay-1">
          At our children's trust, nutritious food is more than a meal — it is care, health, growth, and hope.
          Every contribution helps provide balanced meals for children who depend on the trust for daily nourishment and wellbeing.
        </p>
      </div>

      <div className="fs-divider reveal"></div>

      {/* MAIN GRID */}
      <div className="fs-main">
        {/* COST CARD */}
        <div className="cost-card reveal">
          <div className="cc-label">Cost per child · per day</div>
          <div className="cc-amount">₹120</div>
          <div className="cc-sub">Covers all meals &amp; nutrition</div>
          <ul className="meal-list">
            <li>
              <div className="meal-dot">🌅</div>
              Breakfast
            </li>
            <li>
              <div className="meal-dot">🍱</div>
              Lunch
            </li>
            <li>
              <div className="meal-dot">🌿</div>
              Evening Snacks
            </li>
            <li>
              <div className="meal-dot">🌙</div>
              Dinner
            </li>
            <li>
              <div className="meal-dot">🥛</div>
              Milk / Fruits / Nutrition Supplements
            </li>
          </ul>
          <div className="cc-badge">
            <div className="badge-dot-sm"></div>
            50 children · every single day
          </div>
        </div>

        {/* SPONSOR SIDE */}
        <div className="sponsor-side">
          <div className="sp-header reveal delay-1">
            <h3>Sponsor a Meal Programme</h3>
            <p>Choose how you'd like to support our children's daily nutrition:</p>
          </div>

          <div className="sp-item reveal delay-1">
            <div className="sp-num">01</div>
            <div className="sp-text">
              <strong>One Day Food Expense</strong>
              <span>Feed all 50 children for a full day</span>
            </div>
          </div>
          <div className="sp-item reveal delay-2">
            <div className="sp-num">02</div>
            <div className="sp-text">
              <strong>Monthly Nutrition Support</strong>
              <span>Sustain the programme for 30 days</span>
            </div>
          </div>
          <div className="sp-item reveal delay-3">
            <div className="sp-num">03</div>
            <div className="sp-text">
              <strong>Festival Special Meals</strong>
              <span>Celebrate occasions with special food</span>
            </div>
          </div>
          <div className="sp-item reveal delay-4">
            <div className="sp-num">04</div>
            <div className="sp-text">
              <strong>Milk &amp; Fruits Programme</strong>
              <span>Daily nutrition supplements</span>
            </div>
          </div>
          <div className="sp-item reveal delay-5">
            <div className="sp-num">05</div>
            <div className="sp-text">
              <strong>Annual Food Sponsorship</strong>
              <span>Year-long commitment to full nutrition</span>
            </div>
          </div>

          {/* Donation tier chips with highlight animations - FIXED vanishing issue */}
          <div className="sp-tiers">
            {donationTiers.map((tier, index) => (
              <div
                key={index}
                className={`tier-chip ${tier.type} reveal ${tier.delay} ${activeTier === index ? 'highlight-pulse' : ''}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.cursor = 'pointer';
                }}
                onClick={() => handleTierClick(tier.amount, index)}
                onKeyPress={(e) => handleKeyPress(e, tier.amount, index)}
                role="button"
                tabIndex={0}
                aria-label={`Donate ${tier.amount} - ${tier.description}`}
              >
                <div className="ta">{tier.amount}</div>
                <div className="td">{tier.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodExpenseDetails;