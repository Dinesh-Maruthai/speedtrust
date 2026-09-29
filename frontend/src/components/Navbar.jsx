// components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container nav">
        <Link to="/" className="logo">
          <span className="logo-mark">
            <img
              src="/speedtrustlogo.png"
              alt="Speed Trust Logo"
              style={{ height: '100%', width: '100%', borderRadius: 'inherit', objectFit: 'cover' }}
            />
          </span>
          <span>Speed Trust<small>CHILDREN'S TRUST</small></span>
        </Link>
        <nav className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/#programs" onClick={() => setMenuOpen(false)}>Programs</Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
        </nav>
        <div className="nav-cta">
          <Link to="/contact" className="btn btn-outline btn-sm">Contact</Link>
          <Link to="/donate" className="btn btn-primary btn-sm">Donate Now</Link>
          <button className="burger" id="burger" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;