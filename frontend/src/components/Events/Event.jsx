import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './Event.css';
import { eventsData } from './eventsData';

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/payment/public/events/');
      const data = res.data;
      if (Array.isArray(data)) {
        const formatted = data.map((item) => ({
          ...item,
          thumbnail: item.thumbnail_url || item.thumbnail || (eventsData[0] && eventsData[0].thumbnail),
          donorInitials: item.donor_initials || item.donorInitials || (item.donor ? item.donor.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : 'ST'),
        }));
        setEvents(formatted);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Unable to load upcoming events from server. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleLoadDemo = () => {
    setEvents(eventsData);
    setError(null);
    setLoading(false);
  };

  const handleReadMore = (id) => navigate(`/events/${id}`);

  return (
    <div className="events-page">
      {/* ── Hero ── */}
      <div className="events-hero">
        <div className="events-hero-label">
          <span aria-hidden="true" />
          Live Events
        </div>
        <h1>
          Our <em>Events</em> &amp; Drives
        </h1>
        <p>
          Every event is a step forward — feeding hope, spreading knowledge,
          and healing lives across Kallakurichi.
        </p>
      </div>

      {/* ── Section Header & Content ── */}
      <div className="events-section">
        <div className="events-section-header">
          <h2>Upcoming &amp; Past Events</h2>
          {!loading && !error && (
            <span className="events-count-badge">{events.length} Events</span>
          )}
        </div>

        {/* ── 1. Loading State ── */}
        {loading && (
          <div className="events-state-wrapper">
            <div className="events-loading-header">
              <div className="events-spinner" />
              <p>Loading upcoming events &amp; community drives…</p>
            </div>
            <div className="events-skeleton-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="events-skeleton-card">
                  <div className="events-skeleton-img" />
                  <div className="events-skeleton-body">
                    <div className="events-skeleton-line short" />
                    <div className="events-skeleton-line title" />
                    <div className="events-skeleton-line desc" />
                    <div className="events-skeleton-line desc-2" />
                  </div>
                  <div className="events-skeleton-footer">
                    <div className="events-skeleton-btn" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 2. Error State ── */}
        {!loading && error && (
          <div className="events-state-card events-error-card">
            <div className="events-state-icon">⚠️</div>
            <h3 className="events-state-title">Unable to Load Events</h3>
            <p className="events-state-desc">{error}</p>
            <div className="events-state-actions">
              <button
                type="button"
                className="events-state-btn primary"
                onClick={fetchEvents}
              >
                🔄 Try Again
              </button>
              <button
                type="button"
                className="events-state-btn secondary"
                onClick={handleLoadDemo}
              >
                View Sample Events
              </button>
            </div>
          </div>
        )}

        {/* ── 3. Empty State (0 events found) ── */}
        {!loading && !error && events.length === 0 && (
          <div className="events-state-card events-empty-card">
            <div className="events-state-icon">📅</div>
            <h3 className="events-state-title">No Events Scheduled Right Now</h3>
            <p className="events-state-desc">
              There are currently no active community events or drives listed. Our team is preparing upcoming education, healthcare, and nutrition initiatives in Kallakurichi.
            </p>
            <div className="events-state-actions">
              <button
                type="button"
                className="events-state-btn primary"
                onClick={() => navigate('/gallery')}
              >
                Explore Photo Gallery
              </button>
              <button
                type="button"
                className="events-state-btn secondary"
                onClick={() => navigate('/donate')}
              >
                Support Our Mission
              </button>
            </div>
          </div>
        )}

        {/* ── 4. Events Grid ── */}
        {!loading && !error && events.length > 0 && (
          <div className="events-grid">
            {events.map((ev) => (
              <article key={ev.id} className="event-card">
                {/* Image */}
                <div className="event-thumbnail-wrap">
                  <img
                    src={ev.thumbnail}
                    alt={ev.title}
                    className="event-thumbnail"
                    loading="lazy"
                  />
                  <span className="event-category-pill">{ev.category}</span>
                  <div className="event-date-chip">
                    <CalendarIcon />
                    {ev.date}
                  </div>
                </div>

                {/* Body */}
                <div className="event-body">
                  <h3 className="event-title">{ev.title}</h3>
                  <p className="event-description">{ev.description}</p>
                  <div className="event-donor-row">
                    <div className="event-donor-avatar" aria-hidden="true">
                      {ev.donorInitials}
                    </div>
                    <p className="event-donor-label">
                      Supported by <strong>{ev.donor || 'Community Donors'}</strong>
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="event-card-footer">
                  <button
                    className="read-more-btn"
                    onClick={() => handleReadMore(ev.id)}
                    id={`event-read-more-${ev.id}`}
                    aria-label={`Read more about ${ev.title}`}
                  >
                    Read More <ArrowIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;

//   {
//     id: 1,
//     title: 'Community Food Drive',
//     category: 'Nutrition',
//     thumbnail: foodDrive,
//     description: 'Providing nutritious meals and grocery bags for families struggling with food insecurity in Kallakurichi.',
//     date: 'Oct 12, 2024',
//     donor: 'John Doe',
//     donorInitials: 'JD',
//     details:
//       'Our Community Food Drive brought together over 80 volunteers who distributed fresh produce, grains, and packed meals to more than 250 families across Kallakurichi. Funded by generous donors, this initiative helped ease the burden on parents during school season. We plan to make this a quarterly event, expanding outreach to neighbouring villages.',
//   },
//   {
//     id: 2,
//     title: 'School Supplies Giveaway',
//     category: 'Education',
//     thumbnail: schoolSupplies,
//     description: 'Free backpacks, notebooks, and stationery distributed to children beginning the new academic year.',
//     date: 'Nov 5, 2024',
//     donor: 'Jane Smith',
//     donorInitials: 'JS',
//     details:
//       'Ahead of the new academic year, Speed Trust partnered with local businesses to procure and distribute school kits — including backpacks, notebooks, pens, and geometry sets — to over 320 children from underprivileged families. This programme ensures that no child misses school due to lack of basic supplies.',
//   },
//   {
//     id: 3,
//     title: 'Free Health Check-up Camp',
//     category: 'Healthcare',
//     thumbnail: healthCamp,
//     description: 'Medical professionals offered free screenings, vaccinations, and health counselling for children.',
//     date: 'Dec 20, 2024',
//     donor: 'Dr. Ramesh Kumar',
//     donorInitials: 'RK',
//     details:
//       'In collaboration with a team of 12 volunteer doctors and nurses, Speed Trust hosted a free health camp at the community hall. Children received general check-ups, vision tests, dental screening, and necessary vaccinations. Medicines were distributed at no cost, and parents were counselled on nutrition and hygiene practices.',
//   },
// ];

// // ─── Helpers ───────────────────────────────────────────────────────────────────
// const CalendarIcon = () => (
//   <svg viewBox="0 0 24 24" aria-hidden="true">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// const ArrowIcon = () => (
//   <svg viewBox="0 0 24 24" aria-hidden="true">
//     <line x1="5" y1="12" x2="19" y2="12" />
//     <polyline points="12 5 19 12 12 19" />
//   </svg>
// );

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Component ─────────────────────────────────────────────────────────────────
// const Event = () => {
//   const [events] = useState(mockEvents);
//   const [selected, setSelected] = useState(null);

//   const handleReadMore = (event) => setSelected(event);
//   const closeModal = () => setSelected(null);

//   return (
//     <div className="events-page">
//       {/* ── Hero ── */}
//       <div className="events-hero">
//         <div className="events-hero-label">
//           <span aria-hidden="true" />
//           Live Events
//         </div>
//         <h1>
//           Our <em>Events</em> &amp; Drives
//         </h1>
//         <p>
//           Every event is a step forward — feeding hope, spreading knowledge,
//           and healing lives across Kallakurichi.
//         </p>
//       </div>

//       {/* ── Cards ── */}
//       <div className="events-section">
//         <div className="events-section-header">
//           <h2>Upcoming &amp; Past Events</h2>
//           <span className="events-count-badge">{events.length} Events</span>
//         </div>

//         <div className="events-grid">
//           {events.map((ev) => (
//             <article key={ev.id} className="event-card">
//               {/* Image */}
//               <div className="event-thumbnail-wrap">
//                 <img
//                   src={ev.thumbnail}
//                   alt={ev.title}
//                   className="event-thumbnail"
//                   loading="lazy"
//                 />
//                 <span className="event-category-pill">{ev.category}</span>
//                 <div className="event-date-chip">
//                   <CalendarIcon />
//                   {ev.date}
//                 </div>
//               </div>

//               {/* Body */}
//               <div className="event-body">
//                 <h3 className="event-title">{ev.title}</h3>
//                 <p className="event-description">{ev.description}</p>
//                 <div className="event-donor-row">
//                   <div className="event-donor-avatar" aria-hidden="true">
//                     {ev.donorInitials}
//                   </div>
//                   <p className="event-donor-label">
//                     Supported by <strong>{ev.donor}</strong>
//                   </p>
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="event-card-footer">
//                 <button
//                   className="read-more-btn"
//                   onClick={() => handleReadMore(ev)}
//                   id={`event-read-more-${ev.id}`}
//                   aria-label={`Read more about ${ev.title}`}
//                 >
//                   Read More <ArrowIcon />
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>

//       {/* ── Modal ── */}
//       {selected && (
//         <div
//           className="event-modal-overlay"
//           onClick={closeModal}
//           role="dialog"
//           aria-modal="true"
//           aria-label={selected.title}
//         >
//           <div
//             className="event-modal"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close */}
//             <button
//               className="modal-close-btn"
//               onClick={closeModal}
//               aria-label="Close modal"
//             >
//               <CloseIcon />
//             </button>

//             {/* Hero image */}
//             <div className="modal-image-wrap">
//               <img src={selected.thumbnail} alt={selected.title} />
//               <div className="modal-image-overlay" aria-hidden="true" />
//               <h2 className="modal-image-title">{selected.title}</h2>
//             </div>

//             {/* Body */}
//             <div className="modal-body">
//               {/* Meta chips */}
//               <div className="modal-meta-row">
//                 <div className="modal-meta-chip">
//                   <CalendarIcon />
//                   {selected.date}
//                 </div>
//                 <div className="modal-meta-chip">
//                   <UserIcon />
//                   {selected.donor}
//                 </div>
//                 <div className="modal-meta-chip">
//                   {selected.category}
//                 </div>
//               </div>

//               <p className="modal-details-text">{selected.details}</p>

//               {/* Similar events */}
//               {events.filter((e) => e.id !== selected.id).length > 0 && (
//                 <>
//                   <p className="modal-similar-header">Similar Events</p>
//                   <div className="similar-grid">
//                     {events
//                       .filter((e) => e.id !== selected.id)
//                       .map((e) => (
//                         <div
//                           key={e.id}
//                           className="similar-card"
//                           onClick={() => setSelected(e)}
//                           role="button"
//                           tabIndex={0}
//                           onKeyDown={(ev) => ev.key === 'Enter' && setSelected(e)}
//                           aria-label={`View ${e.title}`}
//                         >
//                           <img src={e.thumbnail} alt={e.title} loading="lazy" />
//                           <div className="similar-card-label">{e.title}</div>
//                         </div>
//                       ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Event;

