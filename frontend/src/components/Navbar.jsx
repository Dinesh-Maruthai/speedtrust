// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      {/* Logo */}
      <Link to="/" className="nav-logo">
        <div className="logo-icon">
          {/* SVG placeholder – replace with actual logo if needed */}
          {/* <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 7v5c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V7L12 2z" />
          </svg> */}
          <img
            src="/speedtrustlogo.png"
            alt="Speed Trust Logo"
            style={{ height: '60px', width: '64px', borderRadius: '50%' }}
          />
        </div>
        <span className="logo-text">
          Speed <span>Trust</span>
        </span>
      </Link>

      {/* Navigation links */}
      <ul className="nav-links">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="#programs">Programs</Link>
        </li>
        <li>
          <Link to="#gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/donate" className="nav-cta">
            Donate Now
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;