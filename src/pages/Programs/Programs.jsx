import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBaby,
  FaCheck,
  FaClock,
  FaHeart,
  FaPalette,
  FaPuzzlePiece,
  FaUsers,
} from 'react-icons/fa';
import activitiesImage from '../../assets/images/banners/programs-banner.jpg';
import facilitiesImage from '../../assets/images/scenes/art-table-overhead.jpg';
import './Programs.css';

const PROGRAMS = [
  {
    icon: FaBaby,
    age: '0-1 year',
    title: 'Infant Care',
    intro: 'A calm, responsive beginning for your baby, with individual attention and gentle routines.',
    activities: ['Sensory play and tummy time', 'Responsive feeding and rest routines', 'Songs, stories, and early connection'],
    benefits: 'Security, bonding, early communication',
    tone: 'sage',
  },
  {
    icon: FaHeart,
    age: '1-2 years',
    title: 'Toddler Care',
    intro: 'A safe space for busy little explorers to move, connect, and build their growing independence.',
    activities: ['Music, movement, and messy play', 'Language-rich everyday conversations', 'Simple choices and self-help skills'],
    benefits: 'Confidence, language, social skills',
    tone: 'peach',
  },
  {
    icon: FaPuzzlePiece,
    age: '2-4 years',
    title: 'Developmental Play',
    intro: 'A play-based developmental program focused on confidence, communication, and independence, not formal academic instruction.',
    activities: ['Fine-motor coordination through art and hands-on play', 'Cognitive exploration through puzzles and problem-solving games', 'Communication, confidence, and positive social interaction', 'Healthy eating habits and everyday independence'],
    benefits: 'Confidence, communication, cognitive and fine-motor development',
    tone: 'gold',
  },
  {
    icon: FaPalette,
    age: '4-5 years',
    title: 'Early Learning',
    intro: 'A supportive space to strengthen communication, concentration, and everyday independence through play and caring routines.',
    activities: ['Creative projects that build fine-motor coordination', 'Puzzles and hands-on problem-solving activities', 'Conversation, cooperation, and confidence-building choices'],
    benefits: 'Independence, focus, communication, confidence',
    tone: 'blue',
  },
];

const Programs = () => (
  <div className="programs-page">
    <section className="programs-hero">
      <div className="programs-hero__image" style={{ backgroundImage: `url(${activitiesImage})` }} />
      <div className="programs-hero__overlay" />
      <div className="container programs-hero__inner">
        <p className="programs-kicker">Growing at their own pace</p>
        <h1>Programs for every<br /><em>little stage.</em></h1>
        <p>From first giggles to growing independence, our age-appropriate programs give children the care, play, and encouragement they need to flourish.</p>
      </div>
    </section>

    <section className="programs-overview">
      <div className="container programs-overview__bar">
        <div><FaClock /><span><strong>Visiting hours</strong>3:00 PM - 5:00 PM</span></div>
        <div><FaUsers /><span><strong>Small-group care</strong>More attention for every child</span></div>
        <Link to="/admissions" className="programs-link">Ask about availability <FaArrowRight /></Link>
      </div>
    </section>

    <section className="programs-section programs-list">
      <div className="container">
        <div className="programs-heading"><p className="programs-kicker">Find their next happy place</p><h2>Care that grows with <em>your child.</em></h2><p>Every program supports children’s developmental needs at their age, while keeping the day warm, active, and reassuringly consistent.</p></div>
        <div className="programs-cards">{PROGRAMS.map(({ icon: Icon, age, title, intro, activities, benefits, tone }) => <article className={`program-card program-card--${tone}`} key={title}><div className="program-card__top"><span className="program-card__icon"><Icon /></span><span className="program-card__age">{age}</span></div><h3>{title}</h3><p className="program-card__intro">{intro}</p><div className="program-card__details"><strong>What they will explore</strong><ul>{activities.map((activity) => <li key={activity}><FaCheck />{activity}</li>)}</ul><strong>Growing through</strong><p>{benefits}</p></div><Link to="/admissions" className="program-card__link">Enquire about this program <FaArrowRight /></Link></article>)}</div>
      </div>
    </section>

    <section className="programs-section programs-rhythm">
      <div className="container programs-rhythm__grid">
        <div className="programs-rhythm__image"><img src={facilitiesImage} alt="Children making cards together at the art table" /><span>Every day has a gentle rhythm.</span></div>
        <div><p className="programs-kicker">A day at Angels & Fairies</p><h2>Predictable enough to feel safe. <em>Flexible enough to feel fun.</em></h2><p>Children settle into a familiar flow, with plenty of room for their interests and energy. Our caregivers balance active discovery with quiet moments and rest.</p><ol className="programs-timeline"><li><span>01</span><div><strong>Welcome & settle in</strong><p>A warm greeting and a gentle start to the day.</p></div></li><li><span>02</span><div><strong>Explore & create</strong><p>Play, projects, stories, and age-group activities.</p></div></li><li><span>03</span><div><strong>Eat, rest & recharge</strong><p>Nutritious breaks and calm routines when little bodies need them.</p></div></li><li><span>04</span><div><strong>Share & head home</strong><p>Connection, reflection, and a happy handover to families.</p></div></li></ol></div>
      </div>
    </section>

    <section className="programs-section programs-extra"><div className="container programs-extra__grid"><div><p className="programs-kicker">Flexible support for families</p><h2>More ways to make care <em>work for you.</em></h2><p>Need a little extra coverage around the school day? Ask our team about available after-school care and how we can support your family routine.</p><Link to="/contact" className="programs-button programs-button--outline">Talk with our team <FaArrowRight /></Link></div><div className="programs-extra__card"><FaUsers /><h3>After-School Care</h3><span>For school-age children</span><p>A caring place to land after school, with time for snacks, relaxed conversation, creative play, and friendships.</p><Link to="/contact" className="programs-link">Check availability <FaArrowRight /></Link></div></div></section>

    <section className="programs-cta"><div className="container"><p className="programs-kicker">The right fit starts with a conversation</p><h2>Let us help you choose<br /><em>their next step.</em></h2><Link to="/admissions" className="programs-button">Start an enquiry <FaArrowRight /></Link></div></section>
  </div>
);

export default Programs;