// components/Events.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Events.css';

const Events = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const sectionRef = useRef(null);

  const [eventsData, setEventsData] = useState({
    sectionLabel: 'Stay Connected',
    title: 'Upcoming',
    titleHighlight: 'Events',
    description: 'Join us in our mission to create a better future. Here are some of our upcoming events and initiatives.',

    tabs: [
      { id: 'upcoming', label: 'Upcoming Events' },
      { id: 'ongoing', label: 'Ongoing' },
      { id: 'past', label: 'Past Events' }
    ],

    events: {
      upcoming: [
        {
          id: 1,
          title: 'Annual Day Celebration 2026',
          description: 'Join us for our annual day celebration featuring cultural performances, student achievements, and community recognition.',
          tags: ['#celebration', '#annualday', '#community'],
          date: 'December 25, 2026',
          time: '10:00 AM - 6:00 PM',
          location: 'Speed Trust Campus, Kallakurichi',
          imageType: 'celebration',
          imageEmoji: '🎉',
          isFeatured: true,
          registrationLink: '#'
        },
        {
          id: 2,
          title: 'Food Distribution Drive',
          description: 'Distributing nutritious meals to underprivileged families in the surrounding villages.',
          tags: ['#fooddrive', '#nutrition', '#communityservice'],
          date: 'December 20, 2026',
          time: '8:00 AM - 2:00 PM',
          location: 'Multiple Locations, Kallakurichi',
          imageType: 'food',
          imageEmoji: '🍲',
          isFeatured: false,
          registrationLink: '#'
        },
        {
          id: 3,
          title: 'Health Camp for Children',
          description: 'Free health checkup camp for children including dental, vision, and general health screening.',
          tags: ['#healthcamp', '#childcare', '#wellness'],
          date: 'December 15, 2026',
          time: '9:00 AM - 5:00 PM',
          location: 'Speed Trust Campus, Kallakurichi',
          imageType: 'health',
          imageEmoji: '🏥',
          isFeatured: false,
          registrationLink: '#'
        },
        {
          id: 4,
          title: 'Winter Clothing Donation Drive',
          description: 'Collecting warm clothes and blankets for children and families in need this winter.',
          tags: ['#winterdrive', '#donation', '#warmth'],
          date: 'December 10, 2026',
          time: '10:00 AM - 4:00 PM',
          location: 'Speed Trust Campus, Kallakurichi',
          imageType: 'donation',
          imageEmoji: '🧥',
          isFeatured: false,
          registrationLink: '#'
        }
      ],
      ongoing: [
        {
          id: 5,
          title: 'Weekly Mentorship Program',
          description: 'Ongoing mentorship program connecting professionals with children for career guidance and skill development.',
          tags: ['#mentorship', '#education', '#growth'],
          date: 'Every Saturday',
          time: '2:00 PM - 5:00 PM',
          location: 'Speed Trust Campus, Kallakurichi',
          imageType: 'mentorship',
          imageEmoji: '📚',
          isFeatured: true,
          registrationLink: '#'
        },
        {
          id: 6,
          title: 'Daily Nutrition Program',
          description: 'Providing balanced, nutritious meals to 250+ children every single day.',
          tags: ['#nutrition', '#health', '#dailycare'],
          date: 'Ongoing - Daily',
          time: 'All Day',
          location: 'Speed Trust Campus, Kallakurichi',
          imageType: 'nutrition',
          imageEmoji: '🥗',
          isFeatured: false,
          registrationLink: '#'
        }
      ],
      past: [
        {
          id: 7,
          title: 'Independence Day Celebration 2025',
          description: 'Celebrated Independence Day with flag hoisting, cultural programs, and student speeches.',
          tags: ['#independenceday', '#celebration', '#patriotism'],
          date: 'August 15, 2025',
          time: '8:00 AM - 12:00 PM',
          location: 'Speed Trust Campus, Kallakurichi',
          imageType: 'celebration',
          imageEmoji: '🇮🇳',
          isFeatured: true,
          registrationLink: '#'
        },
        {
          id: 8,
          title: 'Medical Camp 2025',
          description: 'Successful medical camp that served 200+ children and community members.',
          tags: ['#medicalcamp', '#health', '#community'],
          date: 'June 10, 2025',
          time: '9:00 AM - 5:00 PM',
          location: 'Speed Trust Campus, Kallakurichi',
          imageType: 'medical',
          imageEmoji: '💉',
          isFeatured: false,
          registrationLink: '#'
        }
      ]
    }
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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleEventClick = (eventId) => {
    console.log(`Event clicked: ${eventId}`);
    // Navigate to event details or open modal
    alert(`Event details for ID: ${eventId}`);
  };

  const handleRegisterClick = (e, eventId) => {
    e.stopPropagation();
    console.log(`Register for event: ${eventId}`);
    // Navigate to registration page or open modal
    alert(`Registration for event ID: ${eventId}`);
  };

  // Helper function to get random gradient for image cards
  const getGradient = (imageType) => {
    const gradients = {
      celebration: 'linear-gradient(135deg, #FF6B6B, #FFA94D)',
      food: 'linear-gradient(135deg, #51CF66, #69DB7C)',
      health: 'linear-gradient(135deg, #4DABF7, #74C0FC)',
      donation: 'linear-gradient(135deg, #FFD43B, #FFA94D)',
      mentorship: 'linear-gradient(135deg, #9775FA, #B197FC)',
      nutrition: 'linear-gradient(135deg, #20C997, #38D9A9)',
      medical: 'linear-gradient(135deg, #FF6B6B, #FF8787)',
      default: 'linear-gradient(135deg, #92B775, #6e9a54)'
    };
    return gradients[imageType] || gradients.default;
  };

  const currentEvents = eventsData.events[activeTab] || [];

  return (
    <section className="events-section" ref={sectionRef}>
      <div className="events-container">
        {/* Section Header */}
        <div className="events-header">
          <div className={`sec-eyebrow ${isVisible ? 'visible' : ''}`}>
            {eventsData.sectionLabel}
          </div>
          <h2 className={`events-title ${isVisible ? 'visible d1' : ''}`}>
            {eventsData.title} <em>{eventsData.titleHighlight}</em>
          </h2>
          <p className={`events-description ${isVisible ? 'visible d2' : ''}`}>
            {eventsData.description}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`events-tabs ${isVisible ? 'visible' : ''}`}>
          {eventsData.tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className={`events-grid ${isVisible ? 'visible' : ''}`}>
          {currentEvents.length > 0 ? (
            currentEvents.map((event, index) => (
              <div
                key={event.id}
                className={`event-card ${event.isFeatured ? 'featured' : ''}`}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                onClick={() => handleEventClick(event.id)}
              >
                {/* Event Image / Icon */}
                <div 
                  className="event-image"
                  style={{ background: getGradient(event.imageType) }}
                >
                  <div className="event-emoji">{event.imageEmoji}</div>
                  {event.isFeatured && (
                    <span className="featured-badge">Featured</span>
                  )}
                </div>

                {/* Event Content */}
                <div className="event-content">
                  {/* Date & Time */}
                  <div className="event-datetime">
                    <div className="event-date">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="event-time">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="event-title">{event.title}</h3>

                  {/* Description */}
                  <p className="event-description">{event.description}</p>

                  {/* Tags */}
                  <div className="event-tags">
                    {event.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Location & Action */}
                  <div className="event-footer">
                    <div className="event-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <button 
                      className="register-btn"
                      onClick={(e) => handleRegisterClick(e, event.id)}
                    >
                      Register
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <p>No events in this category at the moment.</p>
              <p>Check back soon for updates!</p>
            </div>
          )}
        </div>

        {/* View All Events Button */}
        <div className={`events-footer ${isVisible ? 'visible' : ''}`}>
          <button className="view-all-btn">
            View All Events
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;