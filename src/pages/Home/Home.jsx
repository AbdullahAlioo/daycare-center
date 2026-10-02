import { useState } from 'react';
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
import heroImage from '../../assets/images/hero.png';
import aboutImage from '../../assets/images/about.png';
import activitiesImage from '../../assets/images/activities.png';
import facilitiesImage from '../../assets/images/safety&trust.png';
import programsImage from '../../assets/images/programs.png';
import momentsImage from '../../assets/images/Joyful Eid Celebration with Children and Treats.png';
import './Home.css';

const PROGRAMS = [
  { age: '0-1 year', title: 'Infant Care', text: 'Gentle routines, responsive care, and a calm space for your baby to thrive.', tone: 'sage' },
  { age: '1-2 years', title: 'Toddler Care', text: 'Play-based discovery that builds confidence, language, and early independence.', tone: 'peach' },
  { age: '2-4 years', title: 'Preschool', text: 'Play-based activities build confidence, communication, cognitive skills, and fine-motor coordination.', tone: 'gold' },
];

const TESTIMONIALS = [
  { quote: 'The team made our daughter feel at home from her very first morning. We see her confidence growing every week.', name: 'Ayesha R.', detail: 'Parent of a preschooler' },
  { quote: 'We love the thoughtful routines, regular updates, and the genuine care every caregiver shows the children.', name: 'Hassan M.', detail: 'Parent of a toddler' },
];

const Home = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
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
            <img src={aboutImage} alt="A welcoming daycare learning space" />
            <div className="home-photo-stamp"><strong>2010</strong><span>loving little<br />learners</span></div>
          </div>
          <div className="home-copy">
            <p className="home-kicker">Welcome to Angels & Fairies</p>
            <h2>A happy beginning for every little <em>journey.</em></h2>
            <p>We believe childhood should feel unhurried, joyful, and full of wonder. Our days balance caring routines with open-ended play, creative exploration, and the simple comfort of familiar faces.</p>
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
          <div className="home-section-heading"><div><p className="home-kicker">Growing at their own pace</p><h2>Programs made for <em>little learners.</em></h2></div><Link to="/programs" className="home-text-link">View all programs <FaArrowRight /></Link></div>
          <div className="home-program-grid">
            {PROGRAMS.map((program) => <article className={`home-program-card home-program-card--${program.tone}`} key={program.title}><span className="home-program-card__age">{program.age}</span><h3>{program.title}</h3><p>{program.text}</p><Link to="/programs" aria-label={`Learn more about ${program.title}`}><FaChevronRight /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="home-section home-safety">
        <div className="container home-safety__grid">
          <div className="home-copy"><p className="home-kicker">More than childcare</p><h2>The little details make a <em>big difference.</em></h2><p>From the first hello in the morning to the final story before home time, our team creates a dependable rhythm where children can feel secure and parents can feel confident.</p><div className="home-safety__list"><span><FaShieldAlt /> Secure premises</span><span><FaHeart /> Caring supervision</span><span><FaCheck /> Clean, bright spaces</span><span><FaStar /> Joyful daily activities</span></div><Link to="/facilities" className="home-button home-button--outline">See our facilities <FaArrowRight /></Link></div>
          <div className="home-safety__visual"><img src={facilitiesImage} alt="Bright, child-friendly daycare facility" /><div className="home-safety__badge"><FaShieldAlt /><strong>Safety first</strong><span>Every day, every child</span></div></div>
        </div>
      </section>

      <section className="home-section home-gallery">
        <div className="container"><div className="home-section-heading"><div><p className="home-kicker">A peek inside</p><h2>Days filled with <em>discovery.</em></h2></div><Link to="/gallery" className="home-text-link">See the gallery <FaArrowRight /></Link></div><div className="home-gallery__grid"><img src={activitiesImage} alt="Children enjoying a creative activity" /><img src={programsImage} alt="Children taking part in a daycare program" /><img src={momentsImage} alt="A collage of joyful moments at the daycare" /></div></div>
      </section>

      <section className="home-section home-testimonials"><div className="container"><div className="home-section-heading"><div><p className="home-kicker">Kind words from families</p><h2>What parents <em>feel.</em></h2></div></div><div className="home-testimonial-grid">{TESTIMONIALS.map((item) => <figure className="home-testimonial" key={item.name}><div className="home-stars" aria-label="5 out of 5 stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div><blockquote>“{item.quote}”</blockquote><figcaption><strong>{item.name}</strong><span>{item.detail}</span></figcaption></figure>)}</div></div></section>

      <section className="home-inquiry" id="visit"><div className="container home-inquiry__grid"><div className="home-inquiry__intro"><p className="home-kicker">Let’s get to know each other</p><h2>Come see where your child will <em>belong.</em></h2><p>Tell us a little about your family and our admissions team will get back to you to arrange a visit.</p><div className="home-inquiry__contact"><span>Prefer to talk?</span><a href="tel:+923339638654">0333 9638654</a></div></div><form className="home-inquiry__form" onSubmit={handleSubmit}>{submitted ? <div className="home-form-success"><FaCheck /><h3>Thank you for reaching out.</h3><p>Our team will contact you shortly to arrange your visit.</p><button type="button" className="home-button home-button--outline" onClick={() => setSubmitted(false)}>Send another inquiry</button></div> : <><div className="home-form-row"><label>Parent name<input required name="parentName" placeholder="Your name" /></label><label>Phone number<input required name="phone" type="tel" placeholder="+92 300 1234567" /></label></div><label>Email address<input required name="email" type="email" placeholder="you@example.com" /></label><label>How can we help?<textarea required name="message" rows="3" placeholder="Tell us about your child or ask a question..." /></label><button type="submit" className="home-button home-button--primary">Send an inquiry <FaArrowRight /></button></>}</form></div></section>
    </div>
  );
};

export default Home;