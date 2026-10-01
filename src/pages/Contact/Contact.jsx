import { useState } from 'react';
import { FaCheck, FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const formData = {
      name: document.getElementById('name')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      email: document.getElementById('email')?.value || '',
      topic: document.getElementById('topic')?.value || 'visit',
      message: document.getElementById('message')?.value || '',
      status: 'New'
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('inquiries').insert([formData]);
        if (error) throw error;
      } else {
        console.warn('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Inquiry submission error:', error);
      setErrorMessage('Failed to send inquiry. Please check your connection or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__image" />
        <div className="contact-hero__overlay" />
        <div className="container contact-hero__inner">
          <p className="contact-kicker">We would love to hear from you</p>
          <h1>Let’s start a<br /><em>conversation.</em></h1>
          <p>Whether you are exploring care, ready to enroll, or simply have a question, our team is here to help.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-details">
            <p className="contact-kicker">Find us and say hello</p>
            <h2>Good care begins with <em>good communication.</em></h2>
            <p>Reach out in the way that feels easiest for you. We can answer questions, share availability, and arrange a relaxed visit to the center.</p>
            <div className="contact-info-list">
              <a href="tel:+923001234567">
                <span><FaPhone /></span>
                <div>
                  <strong>Call us</strong>
                  <small>+92 300 123 4567</small>
                </div>
              </a>
              <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">
                <span><FaWhatsapp /></span>
                <div>
                  <strong>WhatsApp us</strong>
                  <small>Message our admissions team</small>
                </div>
              </a>
              <a href="mailto:info@angelsandfairies.pk">
                <span><FaEnvelope /></span>
                <div>
                  <strong>Email us</strong>
                  <small>info@angelsandfairies.pk</small>
                </div>
              </a>
              <div>
                <span><FaMapMarkerAlt /></span>
                <div>
                  <strong>Visit us</strong>
                  <small>123 Main Boulevard, DHA Phase 2,<br />Lahore, Pakistan</small>
                </div>
              </div>
              <div>
                <span><FaClock /></span>
                <div>
                  <strong>Visiting hours</strong>
                  <small>3:00 PM - 5:00 PM</small>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <span>Follow along</span>
              <a href="https://www.facebook.com/angelsandfairiesdcc" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/angles_fairies_daycare/" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://wa.me/923001234567" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          <div className="contact-form-wrap">
            <div className="contact-form-heading">
              <span>01</span>
              <div>
                <strong>Send an inquiry</strong>
                <small>We usually reply within one business day.</small>
              </div>
            </div>

            {submitted ? (
              <div className="contact-success">
                <FaCheck />
                <h3>Thank you for reaching out.</h3>
                <p>Your message is with our team. We will be in touch shortly.</p>
                <button
                  type="button"
                  className="contact-button contact-button--outline"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <label>
                    Your name
                    <input
                      required
                      id="name"
                      name="name"
                      placeholder="Parent or guardian name"
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      required
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+92 300 1234567"
                    />
                  </label>
                </div>

                <label>
                  Email address
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  What can we help with?
                  <select id="topic" name="topic" defaultValue="visit">
                    <option value="visit">I would like to book a visit</option>
                    <option value="admissions">I have an admissions question</option>
                    <option value="programs">I want to learn about programs</option>
                    <option value="other">Something else</option>
                  </select>
                </label>

                <label>
                  Your message
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us a little about how we can help..."
                  />
                </label>

                {errorMessage && (
                  <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    {errorMessage}
                  </p>
                )}

                <button type="submit" className="contact-button" disabled={loading}>
                  {loading ? 'Sending...' : <>Send message <FaEnvelope /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="container contact-map__inner">
          <div>
            <p className="contact-kicker">Come visit us</p>
            <h2>A welcoming place<br /><em>is waiting.</em></h2>
            <p>We are happy to show you around, introduce you to our caregivers, and talk through what your child needs.</p>
          </div>
          <div className="contact-map__card">
            <FaMapMarkerAlt />
            <strong>Angels & Fairies Daycare Center</strong>
            <span>123 Main Boulevard, DHA Phase 2<br />Lahore, Pakistan</span>
            <a href="https://maps.google.com/?q=123+Main+Boulevard+DHA+Phase+2+Lahore" target="_blank" rel="noreferrer">Open in Google Maps</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

