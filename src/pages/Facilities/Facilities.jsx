import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBookOpen,
  FaCheck,
  FaHeart,
  FaLock,
  FaMoon,
  FaShieldAlt,
  FaSun,
} from 'react-icons/fa';
import facilitiesImage from '../../assets/images/facilities.png';
import activitiesImage from '../../assets/images/scenes/caregiver-guided-painting.jpg';
import './Facilities.css';

const SPACES = [
  { icon: FaBookOpen, title: 'Learning rooms', text: 'Bright, flexible spaces with books, building materials, art, and room to follow an idea.', tone: 'sage' },
  { icon: FaSun, title: 'Outdoor play', text: 'A welcoming outdoor area for movement, fresh air, and active adventures every day.', tone: 'gold' },
  { icon: FaMoon, title: 'Rest & reset', text: 'Quiet, comfortable areas where children can recharge when their bodies need a slower moment.', tone: 'peach' },
  { icon: FaShieldAlt, title: 'Secure by design', text: 'Controlled access, clear sightlines, and close supervision help everyone feel at ease.', tone: 'blue' },
];

const Facilities = () => (
  <div className="facilities-page">
    <section className="facilities-hero"><div className="facilities-hero__image" style={{ backgroundImage: `url(${facilitiesImage})` }} /><div className="facilities-hero__overlay" /><div className="container facilities-hero__inner"><p className="facilities-kicker">A space to feel at home</p><h1>Bright places for<br /><em>growing minds.</em></h1><p>Our environment is designed to feel calm, welcoming, and full of possibility, with every corner ready for play and discovery.</p></div></section>

    <section className="facilities-intro facilities-section"><div className="container facilities-intro__grid"><div><p className="facilities-kicker">Designed around children</p><h2>Every room has a purpose, and <em>every child has room.</em></h2></div><div><p>Children learn with their whole bodies. Our spaces invite them to move, make, focus, rest, and connect without feeling crowded or overwhelmed.</p><p>From low shelves they can reach to cozy corners they can retreat to, the environment supports independence while caregivers remain close and attentive.</p></div></div></section>

    <section className="facilities-spaces facilities-section"><div className="container"><div className="facilities-heading"><p className="facilities-kicker">Explore our environment</p><h2>Thoughtful spaces for <em>whole-child care.</em></h2></div><div className="facilities-grid">{SPACES.map(({ icon: Icon, title, text, tone }) => <article className={`facility-card facility-card--${tone}`} key={title}><span className="facility-card__icon"><Icon /></span><h3>{title}</h3><p>{text}</p><span className="facility-card__line" /></article>)}</div></div></section>

    <section className="facilities-safety facilities-section"><div className="container facilities-safety__grid"><div className="facilities-safety__image"><img src={activitiesImage} alt="A caregiver guiding a toddler through fingerprint painting" /><div><FaLock /><strong>Safe in every detail</strong><span>Carefully considered spaces, routines, and supervision.</span></div></div><div><p className="facilities-kicker">Peace of mind for parents</p><h2>Safety and warmth should feel like <em>one thing.</em></h2><p>We keep children safe through attentive relationships and consistent routines, not by making the environment feel clinical. Our spaces are open, cheerful, and easy for caregivers to see and support.</p><ul><li><FaCheck /> Secure entry and controlled access</li><li><FaCheck /> Age-appropriate furniture and materials</li><li><FaCheck /> Clean, organised spaces throughout the day</li><li><FaCheck /> Close caregiver supervision and clear routines</li></ul><Link to="/contact" className="facilities-link">Ask about our safety approach <FaArrowRight /></Link></div></div></section>

    <section className="facilities-details facilities-section"><div className="container facilities-details__grid"><div><p className="facilities-kicker">The everyday comforts</p><h2>Little details make a <em>big difference.</em></h2><p>Children settle more easily when their surroundings feel familiar and cared for. We keep our rooms inviting, practical, and ready for the changing needs of each age group.</p></div><div className="facilities-details__list"><span><FaHeart /> Nurturing atmosphere</span><span><FaBookOpen /> Accessible resources</span><span><FaSun /> Natural light and fresh air</span><span><FaMoon /> Calm rest spaces</span></div></div></section>

    <section className="facilities-cta"><div className="container"><p className="facilities-kicker">See it for yourself</p><h2>Come walk through<br /><em>your child’s day.</em></h2><Link to="/contact" className="facilities-button">Book a visit <FaArrowRight /></Link></div></section>
  </div>
);

export default Facilities;