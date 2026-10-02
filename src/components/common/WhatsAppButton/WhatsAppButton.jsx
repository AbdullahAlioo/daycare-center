/**
 * WhatsAppButton.jsx
 * Floating WhatsApp + Call buttons (always visible)
 * Positioned bottom-right of the screen
 */

import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import './WhatsAppButton.css';

const WHATSAPP_NUMBER = '923339638654';
const PHONE_NUMBER    = '+923339638654';
const WA_MESSAGE      = encodeURIComponent(
  'Assalam o Alaikum! I am interested in enrolling my child at Angels & Fairies Daycare Center. Could you please share more information?'
);

const WhatsAppButton = () => (
  <div className="float-actions" aria-label="Quick contact buttons">

    {/* Call button */}
    <a
      href={`tel:${PHONE_NUMBER}`}
      className="float-btn float-btn--call"
      aria-label="Call us"
      title="Call Now"
    >
      <FaPhone />
      <span className="float-btn__tooltip">Call Now</span>
    </a>

    {/* WhatsApp button */}
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      className="float-btn float-btn--whatsapp"
      aria-label="Chat on WhatsApp"
      title="WhatsApp Us"
    >
      <FaWhatsapp />
      <span className="float-btn__tooltip">WhatsApp Us</span>
    </a>
  </div>
);

export default WhatsAppButton;