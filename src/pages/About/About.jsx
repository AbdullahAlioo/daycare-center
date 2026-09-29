import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBookOpen,
  FaCheck,
  FaHeart,
  FaLeaf,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa';
import aboutImage from '../../assets/images/about.jpg';
import activitiesImage from '../../assets/images/activities.jpg';
import facilitiesImage from '../../assets/images/facilities.jpg';
import './About.css';

const VALUES = [
  { icon: FaHeart, title: 'Warmth first', text: 'Every child is welcomed with patience, kindness, and the comfort of familiar faces.' },
  { icon: FaLeaf, title: 'Room to grow', text: 'We follow each child’s pace and make space for curiosity, confidence, and independence.' },
  { icon: FaShieldAlt, title: 'Safety always', text: 'Thoughtful routines, secure spaces, and attentive supervision guide every part of the day.' },
  { icon: FaUsers, title: 'Together', text: 'Families and caregivers work as a team through honest, caring communication.' },
];

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-hero__image" style={{ backgroundImage: `url(${aboutImage})` }} />
      <div className="about-hero__overlay" />
      <div className="container about-hero__inner">
        <p className="about-kicker">The heart behind the care</p>
        <h1>Growing childhoods<br /><em>with intention.</em></h1>
        <p>We are a nurturing daycare where children feel known, families feel supported, and every day holds something worth discovering.</p>
      </div>
    </section>

    <section className="about-intro about-section">
      <div className="container about-intro__grid">
        <div className="about-intro__label"><span>01</span><strong>Our story</strong></div>
        <div className="about-intro__content">
          <p className="about-kicker">A place made for wonder</p>
          <h2>Childhood is not a race. It is a <em>beautiful beginning.</em></h2>
          <p>Angels & Fairies Daycare Center was created for families looking for more than supervision. We offer a gentle, enriching place where children can build friendships, explore ideas, and grow into themselves at their own pace.</p>
          <p>Our rooms are filled with conversation, movement, stories, and the small everyday moments that help children feel capable. We notice the little things, celebrate progress, and make sure every child has someone cheering them on.</p>
          <Link to="/contact" className="about-link">Talk with our team <FaArrowRight /></Link>
        </div>
      </div>
    </section>

    <section className="about-philosophy about-section">
      <div className="container about-philosophy__grid">
        <div className="about-philosophy__image"><img src={activitiesImage} alt="Children learning through a hands-on activity" /><span className="about-image-note">Play is serious learning.</span></div>
        <div className="about-philosophy__content">
          <p className="about-kicker">Our philosophy</p>
          <h2>Care deeply. Learn joyfully. <em>Be curious.</em></h2>
          <p>Young children learn best when they feel safe enough to wonder out loud. That is why our approach combines dependable routines with open-ended play and meaningful connection.</p>
          <div className="about-pillars">
            <div><FaBookOpen /><span><strong>Play-based learning</strong>Hands-on experiences that make ideas stick.</span></div>
            <div><FaHeart /><span><strong>Responsive care</strong>Adults who listen, notice, and respond with warmth.</span></div>
            <div><FaUsers /><span><strong>Family partnership</strong>Clear updates and shared goals from day one.</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="about-values about-section">
      <div className="container">
        <div className="about-heading"><p className="about-kicker">What guides us</p><h2>Small values, <em>felt every day.</em></h2><p>Our values are not just words on a wall. They shape how we greet children, plan activities, speak with families, and care for each space.</p></div>
        <div className="about-values__grid">{VALUES.map(({ icon: Icon, title, text }) => <article key={title}><span className="about-value-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="about-mission about-section">
      <div className="container about-mission__grid">
        <div><p className="about-kicker">Our promise</p><h2>A safe place to become <em>who they are.</em></h2><p>We want every child to leave our care feeling more confident, more connected, and more excited about the world than when they arrived.</p><ul>{['A calm and secure environment', 'Age-appropriate learning and play', 'Respectful, two-way parent communication'].map((item) => <li key={item}><FaCheck /> {item}</li>)}</ul></div>
        <div className="about-mission__photo"><img src={facilitiesImage} alt="A bright and thoughtfully arranged daycare room" /><div><strong>Safe, bright, and ready</strong><span>Spaces designed for little hands and big imaginations.</span></div></div>
      </div>
    </section>

    <section className="about-caregivers about-section">
      <div className="container about-caregivers__grid">
        <div className="about-caregivers__number">02</div>
        <div><p className="about-kicker">The people children remember</p><h2>Our caregivers bring <em>heart to every day.</em></h2><p>Children thrive with adults who are present, patient, and genuinely interested in who they are. Our caregivers create consistent relationships, guide children through big feelings, and celebrate every new step.</p><Link to="/facilities" className="about-link">See our environment <FaArrowRight /></Link></div>
      </div>
    </section>

    <section className="about-cta"><div className="container"><p className="about-kicker">Come feel the difference</p><h2>Your child’s next happy beginning<br /><em>could start here.</em></h2><Link to="/admissions" className="about-button">Plan a visit <FaArrowRight /></Link></div></section>
  </div>
);

export default About;