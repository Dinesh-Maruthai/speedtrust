// src/components/Gallery/Gallery.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { galleryItems, galleryCategories } from './galleryData';
import './Gallery.css';

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="gallery-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
  const [items, setItems] = useState(galleryItems);
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  useEffect(() => {
    fetch('/api/payment/public/gallery/')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map(item => ({
            ...item,
            image: item.image_src || item.image_url || (galleryItems[0] && galleryItems[0].image),
            categoryName: item.category,
            tags: Array.isArray(item.tags) ? item.tags : [],
          }));
          setItems(formatted);
        }
      })
      .catch(() => {});
  }, []);

  // Scroll listener for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Filter and Search logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.summary && item.summary.toLowerCase().includes(query)) ||
        (item.story && item.story.toLowerCase().includes(query)) ||
        (item.location && item.location.toLowerCase().includes(query)) ||
        (item.categoryName && item.categoryName.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesQuery;
    });
  }, [items, selectedCategory, searchQuery]);

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

        {/* ── Pinterest Search & Category Filter Bar ── */}
        <section className="gallery-controls-bar" aria-label="Gallery filters">
          {/* Search Box */}
          <div className="gallery-search-wrap">
            <div className="gallery-search-input-group">
              <SearchIcon />
              <input
                type="text"
                className="gallery-search-input"
                placeholder="Search moments, programs, arts, festivals, sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search gallery moments"
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
          </div>

          {/* Pinterest Topic Pills */}
          <div className="gallery-category-bar" role="tablist">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-pill-btn ${
                  selectedCategory === cat.id ? 'active' : ''
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="category-pill-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Meta & Results Count Bar ── */}
        <div className="gallery-meta-bar">
          <div className="gallery-count-tag">
            Showing <strong>{filteredItems.length}</strong> captured moments
          </div>
          {(selectedCategory !== 'all' || searchQuery) && (
            <div className="gallery-filter-indicator">
              <span>
                Filtered by:{' '}
                <strong>
                  {selectedCategory !== 'all'
                    ? galleryCategories.find((c) => c.id === selectedCategory)?.label
                    : 'Search: "' + searchQuery + '"'}
                </strong>
              </span>
              <button
                className="gallery-reset-link"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* ── Pinterest Masonry Pin Grid ── */}
        {filteredItems.length > 0 ? (
          <div className="pinterest-masonry">
            {filteredItems.map((item) => {
              const isLiked = !!likedPins[item.id];
              const totalLikes = item.likes + (isLiked ? 1 : 0);

              return (
                <article
                  key={item.id}
                  id={`pin-${item.id}`}
                  className={`pin-card aspect-${item.aspect}`}
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
                          {item.categoryName.split('&')[0]}
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
                      <div className="pin-author-tag">
                        <div className="pin-author-avatar">
                          {item.author.charAt(0)}
                        </div>
                        <span className="pin-author-name">{item.author}</span>
                      </div>
                      <span className="pin-date-tag">{item.date}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="gallery-empty-state">
            <div className="empty-icon">🎨</div>
            <h3 className="empty-title">No moments found</h3>
            <p className="empty-desc">
              We couldn't find any photos matching "{searchQuery}". Try searching for other activities like education, food, arts, or sports.
            </p>
            <button
              type="button"
              className="empty-reset-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              View All Moments
            </button>
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
                  <div className="modal-meta-location">
                    <LocationIcon />
                    <span>{activePin.location}</span>
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
                  <p className="modal-story-text">{activePin.story}</p>

                  {/* Impact Highlight */}
                  <div className="modal-impact-box">
                    <span>{activePin.impact}</span>
                  </div>

                  {/* Tags */}
                  <div className="modal-tags-row">
                    {activePin.tags.map((t, idx) => (
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
