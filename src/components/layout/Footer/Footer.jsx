/**
 * Footer.jsx — Site-wide footer
 * - Brand logo + description + social links
 * - Quick links column
 * - Programs column
 * - Contact info column
 * - Copyright bar
 */

import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
} from 'react-icons/fa';
import logoMain from '../../../assets/images/Untitled-01.png';
import './Footer.css';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/facilities', label: 'Our Facilities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact Us' },
];

const PROGRAM_LINKS = [
  { to: '/programs', label: 'Infant Care (0–1 yr)' },
  { to: '/programs', label: 'Toddler Care (1–2 yrs)' },
  { to: '/programs', label: 'Preschool (2–4 yrs)' },
  { to: '/programs', label: 'Early Learning (4–5 yrs)' },
  { to: '/programs', label: 'After-School Care' },
  { to: '/admissions', label: 'Enroll Now' },
];

const SOCIALS = [
  { href: 'https://www.facebook.com/angelsandfairiesdcc', icon: <FaFacebookF />, label: 'Facebook' },
  { href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' },
  { href: 'https://wa.me/923001234567', icon: <FaWhatsapp />, label: 'WhatsApp' },
  { href: 'https://youtube.com', icon: <FaYoutube />, label: 'YouTube' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">

        {/* ---- Top grid ---- */}
        <div className="footer__top">

          {/* Brand */}
          <div>
            <Link to="/" className="footer__brand-logo">
              <img src={logoMain} alt="Angels & Fairies Daycare" className="footer__logo-img" />
            </Link>
            <p className="footer__brand-desc">
              A safe, nurturing, and joyful environment where every child grows,
              learns, and blossoms. Trusted by hundreds of Pakistani families
              since our founding.
            </p>
            <div className="footer__socials">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-btn"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer__col-title">Quick Links</h3>
            <ul className="footer__links">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="footer__col-title">Our Programs</h3>
            <ul className="footer__links">
              {PROGRAM_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer__col-title">Contact Us</h3>

            <div className="footer__contact-item">
              <div className="footer__contact-icon" aria-hidden="true">
                <FaMapMarkerAlt />
              </div>
              <div className="footer__contact-text">
                <strong>Address</strong>
                123 Main Boulevard, DHA Phase 2,
                Lahore, Pakistan
              </div>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon" aria-hidden="true">
                <FaPhone />
              </div>
              <div className="footer__contact-text">
                <strong>Phone / WhatsApp</strong>
                <a href="tel:+923001234567" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +92 300 123 4567
                </a>
              </div>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon" aria-hidden="true">
                <FaEnvelope />
              </div>
              <div className="footer__contact-text">
                <strong>Email</strong>
                <a href="mailto:info@angelsandfairies.pk" style={{ color: 'inherit', textDecoration: 'none' }}>
                  info@angelsandfairies.pk
                </a>
              </div>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon" aria-hidden="true">
                <FaClock />
              </div>
              <div className="footer__contact-text">
                <strong>Visiting hours</strong>
                3:00 PM - 5:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {year} <span>Angels &amp; Fairies Daycare Center</span>. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Use</a>
            <a href="#" className="footer__bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;