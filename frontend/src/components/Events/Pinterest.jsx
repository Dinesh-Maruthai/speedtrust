import React, { useState, useEffect, useRef } from 'react';
import './Pinterest.css';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  // Gallery data - Pinterest style with different image sizes
  const [galleryData, setGalleryData] = useState({
    sectionLabel: 'Our Gallery',
    title: 'Moments of',
    titleHighlight: 'Hope & Joy',
    description: 'A glimpse into the lives we touch and the smiles we create every day.',

    // Filter categories
    filters: [
      { id: 'all', label: 'All' },
      { id: 'events', label: 'Events' },
      { id: 'children', label: 'Children' },
      { id: 'activities', label: 'Activities' },
      { id: 'facilities', label: 'Facilities' },
      { id: 'volunteers', label: 'Volunteers' }
    ],

    // Gallery images with different aspect ratios (Pinterest style)
    images: [
      {
        id: 1,
        title: 'Annual Day Celebration 2025',
        description: 'Children performing cultural dance at our annual day celebration.',
        category: 'events',
        imageUrl: null, // Will use placeholder
        emoji: '🎭',
        aspectRatio: 'portrait', // portrait, landscape, square
        likes: 124,
        comments: 18,
        date: 'Dec 25, 2025',
        tags: ['celebration', 'culture', 'performance']
      },
      {
        id: 2,
        title: 'Classroom Learning',
        description: 'Students engaged in interactive learning sessions.',
        category: 'children',
        imageUrl: null,
        emoji: '📚',
        aspectRatio: 'landscape',
        likes: 89,
        comments: 12,
        date: 'Nov 15, 2025',
        tags: ['education', 'learning', 'classroom']
      },
      {
        id: 3,
        title: 'Food Distribution Drive',
        description: 'Distributing nutritious meals to underprivileged families.',
        category: 'activities',
        imageUrl: null,
        emoji: '🍲',
        aspectRatio: 'square',
        likes: 156,
        comments: 24,
        date: 'Oct 20, 2025',
        tags: ['fooddrive', 'community', 'nutrition']
      },
      {
        id: 4,
        title: 'New Library Inauguration',
        description: 'Our new library with over 1000 books for the children.',
        category: 'facilities',
        imageUrl: null,
        emoji: '📖',
        aspectRatio: 'portrait',
        likes: 203,
        comments: 31,
        date: 'Sep 10, 2025',
        tags: ['library', 'facilities', 'education']
      },
      {
        id: 5,
        title: 'Sports Day Fun',
        description: 'Children participating in various sports activities.',
        category: 'children',
        imageUrl: null,
        emoji: '⚽',
        aspectRatio: 'landscape',
        likes: 167,
        comments: 22,
        date: 'Aug 15, 2025',
        tags: ['sports', 'activities', 'fun']
      },
      {
        id: 6,
        title: 'Medical Camp 2025',
        description: 'Free health checkup camp for children and community members.',
        category: 'activities',
        imageUrl: null,
        emoji: '🏥',
        aspectRatio: 'square',
        likes: 98,
        comments: 15,
        date: 'Jul 20, 2025',
        tags: ['medical', 'health', 'community']
      },
      {
        id: 7,
        title: 'Volunteer Training Session',
        description: 'Training our dedicated volunteers for better child care.',
        category: 'volunteers',
        imageUrl: null,
        emoji: '🤝',
        aspectRatio: 'portrait',
        likes: 78,
        comments: 9,
        date: 'Jun 25, 2025',
        tags: ['volunteers', 'training', 'care']
      },
      {
        id: 8,
        title: 'Art Exhibition',
        description: 'Children showcasing their artistic talents.',
        category: 'events',
        imageUrl: null,
        emoji: '🎨',
        aspectRatio: 'landscape',
        likes: 145,
        comments: 20,
        date: 'May 10, 2025',
        tags: ['art', 'creativity', 'exhibition']
      },
      {
        id: 9,
        title: 'Playground Equipment',
        description: 'New playground equipment installed for the children.',
        category: 'facilities',
        imageUrl: null,
        emoji: '🛝',
        aspectRatio: 'square',
        likes: 112,
        comments: 16,
        date: 'Apr 05, 2025',
        tags: ['playground', 'facilities', 'fun']
      },
      {
        id: 10,
        title: 'Independence Day Celebration',
        description: 'Celebrating Independence Day with flag hoisting and cultural events.',
        category: 'events',
        imageUrl: null,
        emoji: '🇮🇳',
        aspectRatio: 'portrait',
        likes: 234,
        comments: 35,
        date: 'Aug 15, 2025',
        tags: ['independenceday', 'celebration', 'patriotism']
      },
      {
        id: 11,
        title: 'Story Time Session',
        description: 'Engaging story time sessions that spark imagination.',
        category: 'children',
        imageUrl: null,
        emoji: '📖',
        aspectRatio: 'landscape',
        likes: 92,
        comments: 14,
        date: 'Mar 12, 2025',
        tags: ['reading', 'storytime', 'imagination']
      },
      {
        id: 12,
        title: 'Community Outreach',
        description: 'Our team reaching out to the local community.',
        category: 'volunteers',
        imageUrl: null,
        emoji: '🌟',
        aspectRatio: 'square',
        likes: 134,
        comments: 19,
        date: 'Feb 28, 2025',
        tags: ['outreach', 'community', 'volunteers']
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

  // Handle filter change
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  // Handle image click (open modal)
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Get filtered images
  const getFilteredImages = () => {
    if (activeFilter === 'all') {
      return galleryData.images;
    }
    return galleryData.images.filter(img => img.category === activeFilter);
  };

  // Get aspect ratio class
  const getAspectClass = (aspectRatio) => {
    switch(aspectRatio) {
      case 'portrait': return 'aspect-portrait';
      case 'landscape': return 'aspect-landscape';
      case 'square': return 'aspect-square';
      default: return 'aspect-square';
    }
  };

  // Get random gradient for placeholder
  const getGradient = (id) => {
    const gradients = [
      'linear-gradient(135deg, #FF6B6B, #FFA94D)',
      'linear-gradient(135deg, #51CF66, #69DB7C)',
      'linear-gradient(135deg, #4DABF7, #74C0FC)',
      'linear-gradient(135deg, #9775FA, #B197FC)',
      'linear-gradient(135deg, #FFD43B, #FFA94D)',
      'linear-gradient(135deg, #20C997, #38D9A9)',
      'linear-gradient(135deg, #FF6B6B, #FF8787)',
      'linear-gradient(135deg, #92B775, #6e9a54)'
    ];
    return gradients[id % gradients.length];
  };

  const filteredImages = getFilteredImages();

  return (
    <section className="gallery-section" ref={sectionRef}>
      <div className="gallery-container">
        {/* Section Header */}
        <div className="gallery-header">
          <div className={`sec-eyebrow ${isVisible ? 'visible' : ''}`}>
            {galleryData.sectionLabel}
          </div>
          <h2 className={`gallery-title ${isVisible ? 'visible d1' : ''}`}>
            {galleryData.title} <em>{galleryData.titleHighlight}</em>
          </h2>
          <p className={`gallery-description ${isVisible ? 'visible d2' : ''}`}>
            {galleryData.description}
          </p>
        </div>

        {/* Filter Tabs - Pinterest Style */}
        <div className={`gallery-filters ${isVisible ? 'visible' : ''}`}>
          {galleryData.filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid - Pinterest Style */}
        <div className={`gallery-grid ${isVisible ? 'visible' : ''}`}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item ${getAspectClass(image.aspectRatio)}`}
              style={{ animationDelay: `${0.05 * (index + 1)}s` }}
              onClick={() => handleImageClick(image)}
            >
              <div className="gallery-card">
                {/* Image Placeholder with Gradient */}
                <div 
                  className="gallery-image"
                  style={{ background: getGradient(image.id) }}
                >
                  <div className="image-emoji">{image.emoji}</div>
                  
                  {/* Overlay on Hover */}
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h4>{image.title}</h4>
                      <p>{image.description}</p>
                      <div className="overlay-stats">
                        <span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          {image.likes}
                        </span>
                        <span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                          {image.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="gallery-card-footer">
                  <h5>{image.title}</h5>
                  <div className="card-tags">
                    {image.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="card-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className={`gallery-footer ${isVisible ? 'visible' : ''}`}>
          <button className="load-more-btn">
            Load More
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Modal - Pinterest Style Lightbox */}
      {selectedImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              ✕
            </button>
            
            <div className="modal-body">
              <div 
                className="modal-image"
                style={{ background: getGradient(selectedImage.id) }}
              >
                <div className="modal-emoji">{selectedImage.emoji}</div>
              </div>
              
              <div className="modal-details">
                <h2>{selectedImage.title}</h2>
                <p className="modal-description">{selectedImage.description}</p>
                
                <div className="modal-meta">
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{selectedImage.likes} Likes</span>
                  </div>
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>{selectedImage.comments} Comments</span>
                  </div>
                </div>

                <div className="modal-tags">
                  {selectedImage.tags.map((tag, idx) => (
                    <span key={idx} className="modal-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;