// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <a href="#" className="nav-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 7v5c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V7L12 2z" />
          </svg>
        </div>
        <span className="logo-text">Speed <span>Trust</span></span>
      </a>

      <ul className="nav-links">
        <li><a href="#">About</a></li>
        <li><a href="#">Programs</a></li>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">Events</a></li>
        <li><a href="#" className="nav-cta">Donate Now</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;