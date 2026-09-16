
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from './eventsData';
import './DetailedCard.css';

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightSmall = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

// ─── Mini Event Card ──────────────────────────────────────────────────────────
const MiniEventCard = ({ event, onNavigate }) => (
  <div
    className="dc-mini-card"
    onClick={() => onNavigate(event.id)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onNavigate(event.id)}
    aria-label={`View details of ${event.title}`}
  >
    <div className="dc-mini-thumb-wrap">
      <img src={event.thumbnail} alt={event.title} loading="lazy" />
      <span className="dc-mini-category">{event.category}</span>
      <div className="dc-mini-date">
        <CalendarIcon />
        {event.date}
      </div>
    </div>
    <div className="dc-mini-body">
      <h4>{event.title}</h4>
      <p>{event.description}</p>
    </div>
    <div className="dc-mini-footer">
      <button className="dc-mini-btn" tabIndex={-1} aria-hidden="true">
        View Details <ArrowRightSmall />
      </button>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const DetailedCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((e) => e.id === Number(id));

  const [imgIndex, setImgIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    setImgIndex(0);
    setIsSaved(false);
    setIsLiked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Keyboard navigation for image slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!event) return;
      const images = event.images || [event.thumbnail];
      if (e.key === 'ArrowLeft') {
        setImgIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setImgIndex((prev) => (prev + 1) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event]);

  if (!event) {
    return (
      <div className="dc-page">
        <div className="dc-not-found">
          <div className="dc-not-found-icon">🔍</div>
          <h2>Event Not Found</h2>
          <p>The event you're looking for doesn't exist or has been removed.</p>
          <button className="dc-back-btn" onClick={() => navigate('/events')}>
            <ArrowLeftIcon /> Back to Events
          </button>
        </div>
      </div>
    );
  }

  const images = event.images || [event.thumbnail];
  const similar = eventsData.filter((e) => e.id !== event.id);

  const slide = (dir) => {
    setImgIndex((prev) => (prev + dir + images.length) % images.length);
  };

  const goToEvent = (newId) => navigate(`/events/${newId}`);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2500);
      }
    } catch (err) {
      console.log('Share cancelled');
    }
  };

  return (
    <div className="dc-page">
      {/* Back button */}
      <button
        className="dc-back-btn"
        onClick={() => navigate('/events')}
        aria-label="Back to events list"
      >
        <ArrowLeftIcon /> Back to Events
      </button>

      {/* Toast notification */}
      {showShareToast && (
        <div className="dc-toast">✓ Link copied to clipboard</div>
      )}

      {/* Main Hero Section */}
      <section className="dc-hero" aria-label={event.title}>
        {/* Left: Image Gallery */}
        <div className="dc-gallery" role="region" aria-label="Event image gallery">
          <div
            className="dc-gallery-track"
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}
            aria-live="polite"
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="dc-gallery-slide"
                aria-hidden={i !== imgIndex}
              >
                <img src={src} alt={`${event.title} – photo ${i + 1}`} />
              </div>
            ))}
          </div>

          {/* Counter badge */}
          <div className="dc-gallery-counter">
            {imgIndex + 1} / {images.length}
          </div>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                className="dc-gallery-btn dc-gallery-btn--prev"
                onClick={() => slide(-1)}
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              <button
                className="dc-gallery-btn dc-gallery-btn--next"
                onClick={() => slide(1)}
                aria-label="Next image"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="dc-gallery-dots" role="tablist" aria-label="Select image">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`dc-gallery-dot ${i === imgIndex ? 'active' : ''}`}
                  onClick={() => setImgIndex(i)}
                  role="tab"
                  aria-selected={i === imgIndex}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Details Panel */}
        <div className="dc-details">
          {/* Top action bar */}
          <div className="dc-action-bar">
            <span className="dc-category-pill">{event.category}</span>
            <div className="dc-action-buttons">
              <button
                className={`dc-icon-btn ${isLiked ? 'active' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
                aria-label={isLiked ? 'Unlike' : 'Like'}
                title={isLiked ? 'Unlike' : 'Like'}
              >
                <HeartIcon />
              </button>
              <button
                className={`dc-icon-btn ${isSaved ? 'active' : ''}`}
                onClick={() => setIsSaved(!isSaved)}
                aria-label={isSaved ? 'Remove bookmark' : 'Bookmark'}
                title={isSaved ? 'Remove bookmark' : 'Bookmark'}
              >
                <BookmarkIcon />
              </button>
              <button
                className="dc-icon-btn"
                onClick={handleShare}
                aria-label="Share event"
                title="Share"
              >
                <ShareIcon />
              </button>
            </div>
          </div>

          {/* Title & Description */}
          <h1 className="dc-title">{event.title}</h1>
          <p className="dc-description">{event.description}</p>

          {/* Meta chips */}
          <div className="dc-meta-row" role="list">
            <div className="dc-meta-chip" role="listitem">
              <CalendarIcon />
              <span>{event.date}</span>
            </div>
            <div className="dc-meta-chip" role="listitem">
              <MapPinIcon />
              <span>{event.location}</span>
            </div>
            <div className="dc-meta-chip" role="listitem">
              <UsersIcon />
              <span>{event.volunteers} Volunteers</span>
            </div>
          </div>

          <hr className="dc-divider" />

          {/* Stats grid */}
          <div className="dc-stats-row">
            <div className="dc-stat">
              <span className="dc-stat-value">{event.beneficiaries}</span>
              <span className="dc-stat-label">Beneficiaries</span>
            </div>
            <div className="dc-stat">
              <span className="dc-stat-value">{event.volunteers}</span>
              <span className="dc-stat-label">Volunteers</span>
            </div>
            <div className="dc-stat">
              <span className="dc-stat-value">{event.category}</span>
              <span className="dc-stat-label">Focus Area</span>
            </div>
          </div>

          <hr className="dc-divider" />

          {/* About section */}
          <div className="dc-section">
            <h3 className="dc-section-title">About This Event</h3>
            <p className="dc-details-text">{event.details}</p>
          </div>

          {/* Donor strip */}
          <div className="dc-donor-strip">
            <div className="dc-donor-avatar" aria-hidden="true">
              {event.donorInitials}
            </div>
            <div className="dc-donor-info">
              <span className="dc-donor-label">Supported by</span>
              <span className="dc-donor-name">{event.donor}</span>
            </div>
            <HeartIcon />
          </div>

          {/* CTA Buttons */}
          <div className="dc-cta-row">
            <button className="dc-cta-btn dc-cta-primary">
              <HeartIcon />
              Support This Cause
            </button>
            <button className="dc-cta-btn dc-cta-secondary" onClick={handleShare}>
              <ShareIcon />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Similar Events Section */}
      {similar.length > 0 && (
        <section className="dc-similar" aria-label="Similar events">
          <div className="dc-similar-header">
            <h2 className="dc-similar-title">More Events</h2>
            <span className="dc-similar-count">
              {similar.length} more <ArrowRightSmall />
            </span>
          </div>

          <div className="dc-similar-strip" role="list">
            {similar.map((ev) => (
              <div key={ev.id} role="listitem">
                <MiniEventCard event={ev} onNavigate={goToEvent} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DetailedCard;