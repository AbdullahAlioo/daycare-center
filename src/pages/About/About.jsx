import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBookOpen,
  FaCheck,
  FaChild,
  FaComments,
  FaHandHoldingHeart,
  FaHandPaper,
  FaHeart,
  FaInfoCircle,
  FaLeaf,
  FaMusic,
  FaUsers,
} from 'react-icons/fa';
import aboutImage from '../../assets/images/banners/about-banner.jpg';
import activitiesImage from '../../assets/images/scenes/art-table-overhead.jpg';
import facilitiesImage from '../../assets/images/scenes/thank-you-card-mural.jpg';
import './About.css';

const VALUES = [
  { icon: FaHeart, title: 'Emotional growth', text: 'Children feel safe, valued, and supported with affection and patience.' },
  { icon: FaUsers, title: 'Social growth', text: 'Positive interactions help children build meaningful relationships.' },
  { icon: FaChild, title: 'Physical & cognitive growth', text: 'Age-appropriate play and learning give children room to move, explore, and develop.' },
  { icon: FaLeaf, title: 'Spiritual growth', text: 'Timeless Islamic values guide moral nurturing and compassionate care.' },
];

const COMMUNICATION = [
  { icon: FaComments, title: 'Talking and listening', text: 'Engaging children in simple conversations, naming familiar objects and giving them time to respond.' },
  { icon: FaMusic, title: 'Stories, songs and rhymes', text: 'Creating enjoyable opportunities to hear words, explore sounds and join in at their own pace.' },
  { icon: FaUsers, title: 'Interaction with other children', text: 'Encouraging shared play, turn-taking and communication with children in their age group.' },
  { icon: FaHandPaper, title: 'Expressing everyday needs', text: 'Creating opportunities for children to make choices, ask for help and communicate their feelings during meals, play and other daily routines.' },
  { icon: FaHeart, title: 'Patient encouragement', text: 'Responding warmly to each child’s attempts to communicate, whether through words, sounds, gestures or expressions, without pressure or comparison.' },
];

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-hero__image" style={{ backgroundImage: `url(${aboutImage})` }} />
      <div className="about-hero__overlay" />
      <div className="container about-hero__inner">
        <p className="about-kicker">About Angels & Fairies Daycare Centre</p>
        <h1>Nurturing Little Hearts<br /><em>Since 2010.</em></h1>
        <p>A warm, welcoming place where children feel safe, loved, valued, and confident to explore the world around them.</p>
      </div>
    </section>

    <section className="about-intro about-section">
      <div className="container about-intro__grid">
        <div className="about-intro__label"><span>01</span><strong>Our story</strong></div>
        <div className="about-intro__content">
          <p className="about-kicker">Our story</p>
          <h2>Childhood filled with love, security, learning, and <em>meaningful experiences.</em></h2>
          <p>Founded in 2010, Angels & Fairies Daycare Centre has proudly spent 16 years caring for, nurturing, and supporting young children and their families.</p>
          <p>We believe every child deserves a warm, wholesome environment where they feel safe, valued, and confident to explore the world around them. Childcare is more than supervision: we nurture emotional, social, physical, cognitive, and spiritual development through age-appropriate play, positive interaction, and compassionate care.</p>
          <Link to="/contact" className="about-link">Talk with our team <FaArrowRight /></Link>
        </div>
      </div>
    </section>

    <section className="about-philosophy about-section">
      <div className="container about-philosophy__grid">
        <div className="about-philosophy__image"><img src={activitiesImage} alt="Children learning through a hands-on activity" /><span className="about-image-note">Play is serious learning.</span></div>
        <div className="about-philosophy__content">
          <p className="about-kicker">Our foundation</p>
          <h2>The Blessed Example of <em>Sayyidah Halimah Al-Sa'diyah (R.A.)</em></h2>
          <p>Our philosophy is inspired by the nurturing legacy of Sayyidah Halimah Al-Sa'diyah (R.A.), the foster mother of Prophet Muhammad ﷺ, remembered in Islamic tradition for the care and affection she provided during his early childhood.</p>
          <p>Inspired by her compassion, responsibility, love, and nurturing care, we create a safe and wholesome environment for every little one entrusted to us. We bring modern early-childhood care together with timeless Islamic values, guided by affection, patience, protection, and moral nurturing.</p>
          <div className="about-pillars">
            <div><FaBookOpen /><span><strong>Compassion</strong>Care rooted in affection, patience, and kindness.</span></div>
            <div><FaHeart /><span><strong>Responsibility</strong>Protective, attentive care for every child.</span></div>
            <div><FaUsers /><span><strong>Wholesome growth</strong>Modern early care guided by timeless Islamic values.</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="about-values about-section">
      <div className="container">
        <div className="about-heading"><p className="about-kicker">Our approach</p><h2>Grow through play. <em>Develop at their own pace.</em></h2><p>We create an environment where children explore with confidence, build positive relationships, express themselves, and develop at their own pace. Safety, cleanliness, responsive caregiving, meaningful developmental activities, and strong communication with families remain at the heart of our approach.</p></div>
        <div className="about-values__grid">{VALUES.map(({ icon: Icon, title, text }) => <article key={title}><span className="about-value-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="about-communication about-section">
      <div className="container">
        <div className="about-communication__grid">
          <div className="about-communication__intro">
            <p className="about-kicker">Communication & social growth</p>
            <h2>Helping little voices <em>grow.</em></h2>
            <p>At Angels & Fairies Daycare Centre, we place special emphasis on encouraging speech, communication and social interaction through everyday childcare. For children experiencing speech or communication delays, we offer a patient, welcoming environment where they have opportunities to express themselves and connect with others.</p>
            <h3>Everyday moments, meaningful communication</h3>
            <p>We make communication part of the day through conversation, play and shared routines.</p>
            <p className="about-communication__focus">Our focus is on helping children feel heard, included and comfortable communicating. We value parents’ understanding of their child and recognise that each child’s needs and pace are different.</p>
          </div>
          <ul className="about-communication__list">{COMMUNICATION.map(({ icon: Icon, title, text }) => <li key={title}><span className="about-value-icon"><Icon /></span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ul>
        </div>
        <div className="about-communication__notes">
          <article className="about-communication__card"><span className="about-value-icon"><FaHandHoldingHeart /></span><div><h3>Understanding every child</h3><p>Our caring approach also extends to children with ADHD or OCD. We focus on their individual strengths, comfort and everyday needs, offering patience, reassurance and opportunities to participate alongside others.</p></div></article>
          <article className="about-communication__card about-communication__card--note"><span className="about-value-icon"><FaInfoCircle /></span><div><h3>About our service</h3><p>Our service is daycare, with a particular focus on communication and social interaction. This support takes place naturally throughout the day; we do not provide clinical assessments, therapy sessions or medical treatment.</p></div></article>
        </div>
      </div>
    </section>

    <section className="about-mission about-section">
      <div className="container about-mission__grid">
        <div><p className="about-kicker">Our promise</p><h2>Safe like home.<br />Loved like family.<br /><em>Encouraged to grow.</em></h2><p>We want every child who enters Angels & Fairies to feel safe, loved, and encouraged. Safety, cleanliness, responsive caregiving, meaningful learning, and strong family communication guide our care.</p><ul>{['A safe and wholesome environment', 'Learning through age-appropriate play', 'Compassionate care and moral nurturing'].map((item) => <li key={item}><FaCheck /> {item}</li>)}</ul></div>
        <div className="about-mission__photo"><img src={facilitiesImage} alt="A child holding her handmade thank-you card in front of our painted tree mural" /><div><strong>Care • Learning • Love • Values</strong><span>Angels & Fairies Daycare Centre</span></div></div>
      </div>
    </section>

    <section className="about-caregivers about-section">
      <div className="container about-caregivers__grid">
        <div className="about-caregivers__number">16</div>
        <div><p className="about-kicker">Nurturing little hearts since 2010</p><h2>Years of care, learning, love, and <em>values.</em></h2><p>Angels & Fairies Daycare Centre — Where Little Hearts Grow with Love.</p><Link to="/contact" className="about-link">Plan a visit <FaArrowRight /></Link></div>
      </div>
    </section>

    <section className="about-cta"><div className="container"><p className="about-kicker">Angels & Fairies Daycare Centre</p><h2>Where Little Hearts<br /><em>Grow with Love.</em></h2><Link to="/admissions" className="about-button">Plan a visit <FaArrowRight /></Link></div></section>
  </div>
);

export default About;