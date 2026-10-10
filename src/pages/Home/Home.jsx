import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaCheck,
  FaChevronRight,
  FaClock,
  FaHeart,
  FaShieldAlt,
  FaStar,
} from 'react-icons/fa';
import heroImage from '../../assets/images/banners/home-banner.jpg';
import aboutImage from '../../assets/images/scenes/thank-you-card-mural.jpg';
import activitiesImage from '../../assets/images/scenes/art-table-overhead.jpg';
import facilitiesImage from '../../assets/images/scenes/caregiver-guided-painting.jpg';
import programsImage from '../../assets/images/scenes/three-boys-red-tees.jpg';
import VideoMoments from '../../components/common/VideoMoments/VideoMoments';
import ReviewForm from '../../components/common/ReviewForm/ReviewForm';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import momentsImage from '../../assets/images/scenes/group-birthday-party.jpg';
import './Home.css';

const PROGRAMS = [
  { age: '0-1 year', title: 'Infant Care', text: 'Gentle routines, responsive care, and a calm space for your baby to thrive.', tone: 'sage' },
  { age: '1-2 years', title: 'Toddler Care', text: 'Play-based discovery that builds confidence, language, and early independence.', tone: 'peach' },
  { age: '2-4 years', title: 'Developmental Play', text: 'Play-based activities build confidence, communication, cognitive skills, and fine-motor coordination.', tone: 'gold' },
];

// Shown until approved parent reviews exist in the database
const TESTIMONIALS = [
  { id: 'ayesha', quote: 'The team made our daughter feel at home from her very first morning. We see her confidence growing every week.', name: 'Ayesha R.', detail: 'Parent of a 3-year-old', rating: 5 },
  { id: 'hassan', quote: 'We love the thoughtful routines, regular updates, and the genuine care every caregiver shows the children.', name: 'Hassan M.', detail: 'Parent of a toddler', rating: 5 },
];

const Home = () => {
  const [submitted, setSubmitted] = useState(false);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  // Only offer the review form once the reviews table is reachable
  const [reviewsEnabled, setReviewsEnabled] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase
      .from('reviews')
      .select('id, parent_name, relation, rating, message')
      .eq('status', 'Approved')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading reviews:', error);
          return;
        }
        setReviewsEnabled(true);
        if (data?.length) {
          setTestimonials(data.map((review) => ({
            id: review.id,
            quote: review.message,
            name: review.parent_name,
            detail: review.relation || 'Parent',
            rating: review.rating,
          })));
        }
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInquiryLoading(true);
    setInquiryError('');

    const formData = {
      name: document.getElementById('parentName')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      email: document.getElementById('email')?.value || '',
      topic: 'visit',
      message: document.getElementById('message')?.value || '',
      status: 'New'
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('inquiries').insert([formData]);
        if (error) throw error;
      } else {
        throw new Error('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Inquiry submission error:', error);
      setInquiryError('Failed to send inquiry. Please check your connection or contact us directly.');
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__image" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="home-hero__wash" />
        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <p className="home-eyebrow"><span /> A little place to grow</p>
            <h1>Where curious minds and kind hearts <em>blossom.</em></h1>
            <p className="home-hero__lead">
              A warm, nurturing daycare in Lahore where children feel safe, seen,
              and excited to discover something new each day.
            </p>
            <div className="home-hero__actions">
              <Link to="/admissions" className="home-button home-button--primary">Enroll Your Child <FaArrowRight /></Link>
              <a href="#visit" className="home-button home-button--quiet">Book a Visit</a>
            </div>
            <div className="home-hero__note"><FaCheck /> Trusted care for ages 0-5 years</div>
          </div>
          <div className="home-hero__card">
            <span className="home-hero__card-icon"><FaHeart /></span>
            <strong>Care that feels like family</strong>
            <span>Visiting hours: 3:00 PM - 5:00 PM</span>
          </div>
        </div>
        <a className="home-hero__scroll" href="#welcome" aria-label="Scroll to welcome section"><span /> Explore our world</a>
      </section>

      <section className="home-trust" aria-label="Our promises">
        <div className="container home-trust__grid">
          <div><FaShieldAlt /><span><strong>Safe & secure</strong>Thoughtful spaces, close supervision</span></div>
          <div><FaHeart /><span><strong>Kind caregivers</strong>Patient, attentive, and trained</span></div>
          <div><FaClock /><span><strong>Visiting hours</strong>3:00 PM - 5:00 PM</span></div>
        </div>
      </section>

      <section className="home-section home-welcome" id="welcome">
        <div className="container home-welcome__grid">
          <div className="home-photo-frame home-photo-frame--welcome">
            <img src={aboutImage} alt="A child holding her handmade thank-you card in front of our painted tree mural" />
            <div className="home-photo-stamp"><strong>2010</strong><span>loving little<br />learners</span></div>
          </div>
          <div className="home-copy">
            <p className="home-kicker">Welcome to Angels & Fairies</p>
            <h2>A happy beginning for every little <em>journey.</em></h2>
            <p>We believe childhood should feel unhurried, joyful, and full of wonder. Our days balance caring routines with open-ended play, creative exploration, and the simple comfort of family.</p>
            <ul className="home-check-list">
              <li><FaCheck /> Small-group attention</li>
              <li><FaCheck /> Age-appropriate developmental play</li>
              <li><FaCheck /> Warm parent communication</li>
            </ul>
            <Link to="/about" className="home-text-link">Meet our approach <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="home-section home-programs">
        <div className="container">
          <div className="home-section-heading"><div><p className="home-kicker">Growing at their own pace</p><h2>Programs made for <em>little learners.</em></h2></div><Link to="/programs" className="home-text-link">See all programs <FaArrowRight /></Link></div>
          <div className="home-program-grid">
            {PROGRAMS.map((program) => <article className={`home-program-card home-program-card--${program.tone}`} key={program.title}><span className="home-program-card__age">{program.age}</span><h3>{program.title}</h3><p>{program.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="home-section home-safety">
        <div className="container home-safety__grid">
          <div className="home-copy"><p className="home-kicker">More than childcare</p><h2>The little details make a <em>big difference.</em></h2><p>From the first hello in the morning to the final goodbye, we prioritize every child's wellbeing, development, and sense of belonging.</p><ul className="home-check-list"><li><FaCheck /> Trained in pediatric first aid and CPR</li><li><FaCheck /> Clean, secure, and age-appropriate spaces</li><li><FaCheck /> Open communication with parents</li></ul><Link to="/about" className="home-text-link">Learn more about our approach <FaArrowRight /></Link></div>
          <div className="home-safety__visual"><img src={facilitiesImage} alt="A caregiver guiding a toddler through fingerprint painting" /><div className="home-safety__badge"><FaShieldAlt /><span>Secure &amp; Safe</span></div></div>
        </div>
      </section>

      <section className="home-section home-gallery">
        <div className="container"><div className="home-section-heading"><div><p className="home-kicker">A peek inside</p><h2>Days filled with <em>discovery.</em></h2></div><Link to="/gallery" className="home-text-link">See the gallery <FaArrowRight /></Link></div><div className="home-gallery__grid"><img src={activitiesImage} alt="Children making cards together at the art table" /><img src={programsImage} alt="Three friends smiling together" /><img src={momentsImage} alt="A group birthday party with cake and balloons" /></div></div>
      </section>

      <VideoMoments />

      <section className="home-section home-testimonials" id="reviews"><div className="container"><div className="home-section-heading"><div><p className="home-kicker">Kind words from families</p><h2>What parents <em>feel.</em></h2></div>{reviewsEnabled && <button type="button" className="home-button home-button--outline" onClick={() => setShowReviewForm((open) => !open)} aria-expanded={showReviewForm}>{showReviewForm ? 'Close review form' : <>Write a review <FaStar /></>}</button>}</div><div className="home-testimonial-grid">{testimonials.map((item) => <figure className="home-testimonial" key={item.id}><div className="home-stars" aria-label={`${item.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <FaStar key={i} className={i < item.rating ? '' : 'home-star--empty'} />)}</div><blockquote>"{item.quote}"</blockquote><figcaption><strong>{item.name}</strong><span>{item.detail}</span></figcaption></figure>)}</div>{showReviewForm && <ReviewForm />}</div></section>

      <section className="home-inquiry" id="visit">
        <div className="container home-inquiry__grid">
          <div className="home-inquiry__intro">
            <p className="home-kicker">Let's get to know each other</p>
            <h2>Come see where your child will <em>belong.</em></h2>
            <p>Tell us a little about your family and our admissions team will get back to you to arrange a visit.</p>
            <div className="home-inquiry__contact">
              <span>Prefer to talk?</span>
              <a href="tel:+923339638654">0333 9638654</a>
            </div>
          </div>
          <form className="home-inquiry__form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="home-form-success">
                <FaCheck />
                <h3>Thank you for reaching out.</h3>
                <p>Our team will contact you shortly to arrange your visit.</p>
                <button type="button" className="home-button home-button--outline" onClick={() => setSubmitted(false)}>
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="home-form-row">
                  <label>
                    Parent name
                    <input required id="parentName" name="parentName" placeholder="Your name" />
                  </label>
                  <label>
                    Phone number
                    <input required id="phone" name="phone" type="tel" placeholder="+92 300 1234567" />
                  </label>
                </div>
                <label>
                  Email address
                  <input required id="email" name="email" type="email" placeholder="you@example.com" />
                </label>
                <label>
                  How can we help?
                  <textarea required id="message" name="message" rows="3" placeholder="Tell us about your child or ask a question..." />
                </label>
                {inquiryError && (
                  <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    {inquiryError}
                  </p>
                )}
                <button type="submit" className="home-button home-button--primary" disabled={inquiryLoading}>
                  {inquiryLoading ? 'Sending...' : <>Send an inquiry <FaArrowRight /></>}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
