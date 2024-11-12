// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCoins, 
  faTachometerAlt, 
  faBars, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import '../Navbar/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setMenuOpen(false);
      }
      setIsMobile(window.innerWidth <= 860);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuOpen && !e.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Climate Action</Link>
      </div>

      <button 
        className="navbar-toggle" 
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => isMobile && setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/tips" onClick={() => isMobile && setMenuOpen(false)}>Tips</Link></li>
        <li><Link to="/calculator" onClick={() => isMobile && setMenuOpen(false)}>Calculator</Link></li>
        <li><Link to="/events" onClick={() => isMobile && setMenuOpen(false)}>Upcoming Events</Link></li>
        <li><Link to="/resources" onClick={() => isMobile && setMenuOpen(false)}>Resources</Link></li>
        <li><Link to="/cart" onClick={() => isMobile && setMenuOpen(false)}>Eco Basket</Link></li>
        <li><Link to="/simulator" onClick={() => isMobile && setMenuOpen(false)}>Simulator</Link></li>
      </ul>

      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <div>
          <FontAwesomeIcon icon={faCoins} /> Eco-Coin <span style={{ color: "#b1cab3" }}>0</span>
        </div>
        <Link to="/dashboard" onClick={() => isMobile && setMenuOpen(false)}>
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </Link>
        <Link 
          to="/subscribe" 
          className="subscription-button"
          onClick={() => isMobile && setMenuOpen(false)}
        >
          Subscribe
        </Link>
      </div>

      <div className={`navbar-login ${menuOpen ? 'active' : ''}`}>
        <button className='Log-In' style={{backgroundColor: '#ff8800'}}>
          <Link to="/login" onClick={() => isMobile && setMenuOpen(false)} style={{ textDecoration: 'none', color: 'white'}}>Log In</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;