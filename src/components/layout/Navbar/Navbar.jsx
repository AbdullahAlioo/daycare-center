/**
 * Navbar.jsx — Sticky top navigation
 * - Logo with icon
 * - All page links with active state via NavLink
 * - "Enroll Now" CTA button
 * - Glassmorphism effect on scroll
 * - Mobile hamburger drawer
 */

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';
import logoMain from '../../../assets/images/Untitled-01.png';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/programs', label: 'Programs' },
  { to: '/activities', label: 'Activities' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add glass effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change / ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <img src={logoMain} alt="Angels & Fairies Daycare" className="navbar__logo-img" />
          </Link>

          {/* Desktop nav links */}
          <nav aria-label="Main navigation">
            <ul className="navbar__links">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to} className="navbar__link">
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="navbar__actions">
            <a href="tel:+923001234567" className="navbar__call" aria-label="Call us">
              <FaPhone size={13} />
              +92 300 123 4567
            </a>
            <Link
              to="/admissions"
              className="btn btn-secondary btn-sm"
              id="navbar-enroll-btn"
            >
              Enroll Now
            </Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`navbar__overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <nav
        className={`navbar__mobile ${menuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'active' : ''}`
            }
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
        <div className="navbar__mobile-cta">
          <Link
            to="/admissions"
            className="btn btn-secondary w-full"
            id="mobile-enroll-btn"
            onClick={closeMenu}
          >
            Enroll Now
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;