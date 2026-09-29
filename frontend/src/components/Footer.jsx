// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="fgrid">
          <div>
            <Link to="/" className="logo">
              <span className="logo-mark">
                <img src="/speedtrustlogo.png" alt="Speed Trust Logo" style={{ height: '100%', width: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
              </span>
              <span>Speed Trust<small>CHILDREN'S TRUST</small></span>
            </Link>
            <p>Empowering Lives, Building Futures. Dedicated to providing shelter, food, education, and care since 2008.</p>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/#programs">Our Work</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/donate">Donate</Link></li>
            </ul>
          </div>
          <div>
            <h5>Get Involved</h5>
            <ul>
              <li><Link to="/contact">Volunteer</Link></li>
              <li><Link to="/donate">Sponsor a Child</Link></li>
              <li><Link to="/contact">Partner With Us</Link></li>
              <li><Link to="/contact">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contact Us</h5>
            <ul>
              <li>+91 96260 56872 / 96779 79306</li>
              <li>speedtrustofficial@gmail.com</li>
              <li>Ka.Mamananthal Village, Kallakurichi, TN, India</li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>Speed Trust &copy; {new Date().getFullYear()}. All Rights Reserved.</span>
          <nav>
            <a href="#">Privacy Policy</a><span>|</span>
            <a href="#">Terms &amp; Conditions</a><span>|</span>
            <a href="#">Refund Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;