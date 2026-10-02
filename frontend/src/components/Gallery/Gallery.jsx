// src/components/Gallery/Gallery.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { galleryItems } from './galleryData';
import './Gallery.css';

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="gallery-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ZoomIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UpArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePin, setActivePin] = useState(null);
  const [likedPins, setLikedPins] = useState(() => {
    try {
      const saved = localStorage.getItem('speedtrust_liked_pins');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch gallery items from backend
  const fetchGallery = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/payment/public/gallery/');
      const data = res.data;
      if (Array.isArray(data)) {
        const formatted = data.map((item) => ({
          ...item,
          image: item.image_src || item.image_url || (galleryItems[0] && galleryItems[0].image),
          categoryName: item.category || 'Initiatives',
          donorSupport: item.donor_support || item.donorSupport || item.donor || '',
          tags: Array.isArray(item.tags)
            ? item.tags
            : (typeof item.tags === 'string' ? JSON.parse(item.tags || '[]') : []),
        }));
        setItems(formatted);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error('Failed to fetch gallery moments:', err);
      setError('Unable to load gallery moments. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Demo fallback handler for showcase if database is offline or empty
  const handleLoadDemo = () => {
    setItems(galleryItems);
    setError(null);
    setLoading(false);
  };

  // Scroll listener for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open to eliminate background/container scrolling
  useEffect(() => {
    if (activePin) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activePin]);

  // Keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activePin) return;
      if (e.key === 'Escape') {
        setActivePin(null);
      } else if (e.key === 'ArrowLeft') {
        navigatePin(-1);
      } else if (e.key === 'ArrowRight') {
        navigatePin(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Filter and Search logic (supporting date, donor name, title, story, tags, etc.)
  const filteredItems = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return items;

    // Split query by spaces to allow multi-term search e.g. "Ramesh 2024" or "Feb 2025"
    const tokens = rawQuery.split(/\s+/).filter(Boolean);

    return items.filter((item) => {
      const donor = (item.donorSupport || item.donor_support || item.donor || item.author || '').toLowerCase();
      const date = (item.date || '').toLowerCase();
      const title = (item.title || '').toLowerCase();
      const summary = (item.summary || '').toLowerCase();
      const story = (item.story || '').toLowerCase();
      const location = (item.location || '').toLowerCase();
      const categoryName = (item.categoryName || item.category || '').toLowerCase();
      const tags = Array.isArray(item.tags)
        ? item.tags.join(' ').toLowerCase()
        : (typeof item.tags === 'string' ? item.tags.toLowerCase() : '');

      return tokens.every((token) => {
        if (
          donor.includes(token) ||
          date.includes(token) ||
          title.includes(token) ||
          summary.includes(token) ||
          story.includes(token) ||
          location.includes(token) ||
          categoryName.includes(token) ||
          tags.includes(token)
        ) {
          return true;
        }

        // Support numeric month patterns (e.g. user types "02" or "2" for February)
        const monthNumberAliases = {
          '01': 'january', '1': 'january',
          '02': 'february', '2': 'february',
          '03': 'march', '3': 'march',
          '04': 'april', '4': 'april',
          '05': 'may', '5': 'may',
          '06': 'june', '6': 'june',
          '07': 'july', '7': 'july',
          '08': 'august', '8': 'august',
          '09': 'september', '9': 'september',
          '10': 'october',
          '11': 'november',
          '12': 'december',
        };
        if (monthNumberAliases[token] && date.includes(monthNumberAliases[token])) {
          return true;
        }

        return false;
      });
    });
  }, [items, searchQuery]);

  // Handle Like / Heart toggle
  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLikedPins((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('speedtrust_liked_pins', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }
      return updated;
    });
  };

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Handle Share / Copy Link
  const handleShare = (item, e) => {
    if (e) e.stopPropagation();
    const shareUrl = window.location.origin + '/gallery#' + item.id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Photo story link copied to clipboard!');
      });
    } else {
      showToast('Sharing ' + item.title);
    }
  };

  // Modal navigation (Next/Prev)
  const navigatePin = (direction) => {
    if (!activePin || filteredItems.length === 0) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activePin.id);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;

    setActivePin(filteredItems[nextIndex]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="gallery-page">
      {/* Background ambient accents */}
      <div className="gallery-bg-glow" />
      <div className="gallery-bg-glow-left" />

      <div className="gallery-container">
        {/* ── Hero Header ── */}
        <header className="gallery-hero">
          <div className="gallery-badge">
            <span className="gallery-badge-pulse" />
            Live Moments &amp; Impact
          </div>
          <h1 className="gallery-title">
            Moments of <em>Hope</em> &amp; Smiles
          </h1>
          <p className="gallery-subtitle">
            Explore everyday joys, learning milestones, and community transformations captured through the eyes of Speed Trust children and caregivers in Kallakurichi.
          </p>
        </header>

        {/* ── Search Bar ── */}
        <section className="gallery-controls-bar" aria-label="Gallery search">
          <div className="gallery-search-wrap">
            <div className="gallery-search-input-group">
              <SearchIcon />
              <input
                type="text"
                className="gallery-search-input"
                placeholder="Filter by date (e.g. Feb 2025, 2024), donor name, or story..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter moments by date or donor name"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="gallery-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="gallery-search-hint">
              <span>💡 Filter by date (e.g. 2025, February) or donor name in real-time</span>
            </div>
          </div>
        </section>

        {/* ── Meta & Results Count Bar ── */}
        <div className="gallery-meta-bar">
          <div className="gallery-count-tag">
            Showing <strong>{filteredItems.length}</strong> captured moments
          </div>
          {searchQuery && (
            <div className="gallery-filter-indicator">
              <span>
                Search filter: <strong>"{searchQuery}"</strong>
              </span>
              <button
                type="button"
                className="gallery-reset-link"
                onClick={() => setSearchQuery('')}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* ── 1. Loading State ── */}
        {loading && (
          <div className="gallery-state-wrapper">
            <div className="gallery-loading-header">
              <div className="gallery-spinner" />
              <p>Loading moments of hope &amp; smiles…</p>
            </div>
            <div className="gallery-skeleton-grid">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className={`gallery-skeleton-card sk-aspect-${idx % 3}`}>
                  <div className="gallery-skeleton-img" />
                  <div className="gallery-skeleton-body">
                    <div className="gallery-skeleton-line short" />
                    <div className="gallery-skeleton-line" />
                    <div className="gallery-skeleton-line medium" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 2. Error State ── */}
        {!loading && error && (
          <div className="gallery-state-card gallery-error-card">
            <div className="gallery-state-icon">⚠️</div>
            <h3 className="gallery-state-title">Unable to Load Gallery Moments</h3>
            <p className="gallery-state-desc">{error}</p>
            <div className="gallery-state-actions">
              <button
                type="button"
                className="gallery-state-btn primary"
                onClick={fetchGallery}
              >
                🔄 Try Again
              </button>
              <button
                type="button"
                className="gallery-state-btn secondary"
                onClick={handleLoadDemo}
              >
                View Sample Showcase
              </button>
            </div>
          </div>
        )}

        {/* ── 3. Empty State (No photos in database) ── */}
        {!loading && !error && items.length === 0 && (
          <div className="gallery-state-card gallery-empty-card">
            <div className="gallery-state-icon">📸</div>
            <h3 className="gallery-state-title">No Photos Available Yet</h3>
            <p className="gallery-state-desc">
              We haven't uploaded any photos to this gallery yet. Moments from our educational drives, nutrition programs, and community outreach will appear here soon.
            </p>
            <div className="gallery-state-actions">
              <Link to="/events" className="gallery-state-btn primary">
                View Upcoming Events
              </Link>
              <Link to="/donate" className="gallery-state-btn secondary">
                Support Our Mission
              </Link>
            </div>
          </div>
        )}

        {/* ── 4. Empty Search State ── */}
        {!loading && !error && items.length > 0 && filteredItems.length === 0 && (
          <div className="gallery-empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No moments match your search</h3>
            <p className="empty-desc">
              We couldn't find any photos matching "{searchQuery}". Try searching for a donor name (e.g. Ramesh, Food Mission) or date (e.g. Feb 2025, 2024).
            </p>
            <button
              type="button"
              className="empty-reset-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear Filter &amp; View All
            </button>
          </div>
        )}

        {/* ── 5. Pinterest Masonry Pin Grid ── */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="pinterest-masonry">
            {filteredItems.map((item) => {
              const isLiked = !!likedPins[item.id];
              const totalLikes = (item.likes || 0) + (isLiked ? 1 : 0);
              const donorName = item.donorSupport || item.donor_support || item.donor || item.author || 'Speed Trust';

              return (
                <article
                  key={item.id}
                  id={`pin-${item.id}`}
                  className={`pin-card aspect-${item.aspect || 'square'}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActivePin(item)}
                >
                  {/* Pin Image & Pinterest Floating Hover Overlay */}
                  <div
                    className="pin-image-wrapper"
                    onClick={() => setActivePin(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="pin-image"
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackImage && e.target.src !== item.fallbackImage) {
                          e.target.src = item.fallbackImage;
                        }
                      }}
                    />

                    {/* Pinterest Hover Actions Layer */}
                    <div className="pin-hover-overlay">
                      {/* Top Bar: Category & Save/Heart */}
                      <div className="pin-hover-top">
                        <span className="pin-category-badge">
                          {(item.categoryName || 'General').split('&')[0]}
                        </span>
                        <button
                          type="button"
                          className={`pin-save-btn ${isLiked ? 'is-saved' : ''}`}
                          onClick={(e) => toggleLike(item.id, e)}
                          title={isLiked ? 'Liked' : 'Save / Heart'}
                          aria-label={`Like ${item.title}`}
                        >
                          <HeartIcon filled={isLiked} />
                          <span>{totalLikes}</span>
                        </button>
                      </div>

                      {/* Bottom Bar: Action buttons */}
                      <div className="pin-hover-bottom">
                        <div className="pin-quick-actions">
                          <button
                            type="button"
                            className="pin-action-circle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePin(item);
                            }}
                            title="Expand Story"
                            aria-label="Expand story details"
                          >
                            <ZoomIcon />
                          </button>
                          <button
                            type="button"
                            className="pin-action-circle-btn"
                            onClick={(e) => handleShare(item, e)}
                            title="Share Link"
                            aria-label="Share photo story"
                          >
                            <ShareIcon />
                          </button>
                        </div>
                        <Link
                          to="/donate"
                          className="pin-donate-pill-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Support
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Pin Content Card Body */}
                  <div className="pin-info" onClick={() => setActivePin(item)}>
                    <h3 className="pin-info-title">{item.title}</h3>
                    <p className="pin-info-desc">{item.summary}</p>
                    <div className="pin-info-footer">
                      <div
                        className="pin-donor-tag"
                        title={`Supported by ${donorName}`}
                      >
                        <div className="pin-donor-avatar">
                          {donorName.charAt(0)}
                        </div>
                        <div className="pin-donor-details">
                          <span className="pin-donor-label">Donor</span>
                          <span className="pin-donor-name">{donorName}</span>
                        </div>
                      </div>
                      <div className="pin-date-badge">
                        <CalendarIcon />
                        <span>{item.date || 'Recent'}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Pinterest Detail Lightbox / Modal ── */}
      {activePin && (
        <div
          className="pin-modal-overlay"
          onClick={() => setActivePin(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activePin.title}
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            className="modal-nav-arrow modal-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigatePin(-1);
            }}
            title="Previous (Left Arrow)"
            aria-label="Previous image"
          >
            <ArrowLeftIcon />
          </button>

          <button
            type="button"
            className="modal-nav-arrow modal-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              navigatePin(1);
            }}
            title="Next (Right Arrow)"
            aria-label="Next image"
          >
            <ArrowRightIcon />
          </button>

          <div
            className="pin-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="modal-close-button"
              onClick={() => setActivePin(null)}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>

            {/* Left: High-Res Image View */}
            <div className="modal-media-pane">
              <img
                src={activePin.image}
                alt={activePin.title}
                className="modal-media-img"
                onError={(e) => {
                  if (activePin.fallbackImage && e.target.src !== activePin.fallbackImage) {
                    e.target.src = activePin.fallbackImage;
                  }
                }}
              />
              <div className="modal-media-badge">{activePin.categoryName}</div>
            </div>

            {/* Right: Story & Details Drawer */}
            <div className="modal-content-pane">
              <div>
                {/* Header Actions */}
                <div className="modal-content-header">
                  <div className="modal-meta-chips">
                    <div className="modal-meta-location">
                      <LocationIcon />
                      <span>{activePin.location}</span>
                    </div>
                    {activePin.date && (
                      <div className="modal-meta-date">
                        <CalendarIcon />
                        <span>{activePin.date}</span>
                      </div>
                    )}
                  </div>
                  <div className="modal-header-actions">
                    <button
                      type="button"
                      className={`modal-icon-btn ${
                        likedPins[activePin.id] ? 'liked' : ''
                      }`}
                      onClick={() => toggleLike(activePin.id)}
                    >
                      <HeartIcon filled={likedPins[activePin.id]} />
                      <span>
                        {activePin.likes + (likedPins[activePin.id] ? 1 : 0)} Likes
                      </span>
                    </button>
                    <button
                      type="button"
                      className="modal-icon-btn"
                      onClick={() => handleShare(activePin)}
                    >
                      <ShareIcon />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Story Body */}
                <div className="modal-story-section">
                  <h2 className="modal-story-title">{activePin.title}</h2>

                  {/* Donor Recognition Highlight */}
                  {(activePin.donorSupport || activePin.donor_support || activePin.donor || activePin.author) && (
                    <div className="modal-donor-box">
                      <div className="modal-donor-icon">🤝</div>
                      <div>
                        <span className="modal-donor-label">Supported by Generous Donor</span>
                        <strong className="modal-donor-name">
                          {activePin.donorSupport || activePin.donor_support || activePin.donor || activePin.author}
                        </strong>
                      </div>
                    </div>
                  )}

                  <p className="modal-story-text">{activePin.story}</p>

                  {/* Impact Highlight */}
                  <div className="modal-impact-box">
                    <span>{activePin.impact}</span>
                  </div>

                  {/* Tags */}
                  <div className="modal-tags-row">
                    {(activePin.tags || []).map((t, idx) => (
                      <span key={idx} className="modal-tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Donation / Support Callout */}
              <div className="modal-cta-box">
                <div className="modal-cta-text">
                  <h4>Help Us Create More Smiles</h4>
                  <p>Your contribution directly funds food, schooling &amp; healthcare.</p>
                </div>
                <Link to="/donate" className="modal-donate-btn">
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="gallery-toast" role="status">
          <span>✨</span> {toastMessage}
        </div>
      )}

      {/* ── Scroll To Top Button ── */}
      {showScrollTop && (
        <button
          type="button"
          className="gallery-scroll-top"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <UpArrowIcon />
        </button>
      )}
    </div>
  );
};

export default Gallery;
