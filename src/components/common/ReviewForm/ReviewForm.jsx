import { useState } from 'react';
import { FaCheck, FaPaperPlane, FaStar } from 'react-icons/fa';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import './ReviewForm.css';

const MAX_MESSAGE = 1000;
const EMPTY_FORM = { parent_name: '', email: '', relation: '', message: '', website: '' };

const ReviewForm = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!rating) {
      setErrorMessage('Please choose a star rating.');
      return;
    }

    // Hidden spam-trap field: real visitors never fill it in
    if (form.website) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      }

      const { error } = await supabase.from('reviews').insert([{
        parent_name: form.parent_name.trim(),
        email: form.email.trim(),
        relation: form.relation.trim() || null,
        rating,
        message: form.message.trim(),
      }]);
      if (error) throw error;

      setSubmitted(true);
      setForm(EMPTY_FORM);
      setRating(0);
    } catch (error) {
      console.error('Review submission error:', error);
      setErrorMessage('Sorry, we could not send your review. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="review-form review-form--success">
        <FaCheck />
        <h3>Thank you for sharing your experience.</h3>
        <p>Your review has been sent to our team and will appear on the website once it has been approved.</p>
        <button type="button" className="review-form__button review-form__button--outline" onClick={() => setSubmitted(false)}>
          Write another review
        </button>
      </div>
    );
  }

  const shownRating = hoverRating || rating;

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form__heading">
        <h3>Share your experience</h3>
        <p>Reviews are checked by our team before they appear on the website. Your email is never shown publicly.</p>
      </div>

      <div className="review-form__rating" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHoverRating(0)}>
        <span className="review-form__label">Your rating</span>
        <div className="review-form__stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? 's' : ''}`}
              className={value <= shownRating ? 'is-filled' : ''}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
            >
              <FaStar />
            </button>
          ))}
        </div>
      </div>

      <div className="review-form__row">
        <label>
          Your name
          <input required name="parent_name" minLength={2} maxLength={80} value={form.parent_name} onChange={handleChange} placeholder="e.g. Ayesha R." />
        </label>
        <label>
          Email address
          <input required name="email" type="email" maxLength={200} value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </label>
      </div>

      <label>
        About you <span className="review-form__optional">(optional)</span>
        <input name="relation" maxLength={80} value={form.relation} onChange={handleChange} placeholder="e.g. Parent of a 3-year-old" />
      </label>

      <label>
        Your review
        <textarea required name="message" rows="4" minLength={10} maxLength={MAX_MESSAGE} value={form.message} onChange={handleChange} placeholder="Tell other parents about your family's experience..." />
        <span className="review-form__counter">{form.message.length}/{MAX_MESSAGE}</span>
      </label>

      {/* Spam trap, hidden from people */}
      <label className="review-form__trap" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
      </label>

      {errorMessage && <p className="review-form__error">{errorMessage}</p>}

      <button type="submit" className="review-form__button" disabled={loading}>
        {loading ? 'Sending...' : <>Submit review <FaPaperPlane /></>}
      </button>
    </form>
  );
};

export default ReviewForm;
