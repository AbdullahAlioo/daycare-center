import { Link } from 'react-router-dom';
import {
  FaBookOpen,
  FaChild,
  FaFlask,
  FaMusic,
  FaPalette,
  FaPuzzlePiece,
  FaSeedling,
  FaStar,
} from 'react-icons/fa';
import activitiesImage from '../../assets/images/banners/activities-banner.jpg';
import aboutImage from '../../assets/images/scenes/boys-drawing-cards.jpg';
import './Activities.css';

const ACTIVITIES = [
  { icon: FaPalette, title: 'Arts & crafts', text: 'Painting, making, and experimenting with color help little hands express big ideas.', tone: 'peach' },
  { icon: FaBookOpen, title: 'Story time', text: 'Stories build vocabulary, imagination, listening skills, and a love of books.', tone: 'sage' },
  { icon: FaChild, title: 'Outdoor play', text: 'Fresh air and active play give children room to move, test ideas, and play together.', tone: 'gold' },
  { icon: FaMusic, title: 'Music & movement', text: 'Songs, rhythm, and dance turn joyful movement into connection and confidence.', tone: 'blue' },
  { icon: FaPuzzlePiece, title: 'Indoor discovery', text: 'Puzzles, blocks, and pretend play strengthen focus, problem solving, and cooperation.', tone: 'rose' },
  { icon: FaSeedling, title: 'Nature learning', text: 'Small observations of the natural world grow curiosity, care, and wonder.', tone: 'green' },
];

const Activities = () => (
  <div className="activities-page">
    <section className="activities-hero">
      <div className="activities-hero__image" style={{ backgroundImage: `url(${activitiesImage})` }} />
      <div className="activities-hero__overlay" />
      <div className="container activities-hero__inner">
        <p className="activities-kicker">Little hands, big ideas</p>
        <h1>Every day is an invitation<br /><em>to discover.</em></h1>
        <p>Our activities give children the freedom to explore, create, move, and connect while building the skills that matter for life.</p>
      </div>
    </section>

    <section className="activities-intro activities-section"><div className="container activities-intro__grid"><div><p className="activities-kicker">Learning through living</p><h2>Play is how children make sense of <em>their world.</em></h2></div><div><p>At Angels & Fairies, activities are not filler between routines. They are thoughtfully designed opportunities to practice language, independence, movement, imagination, and friendship.</p><p>We follow children’s interests, offer age-appropriate invitations to play, and stay close enough to extend learning without taking over.</p></div></div></section>

    <section className="activities-list activities-section"><div className="container"><div className="activities-heading"><p className="activities-kicker">A full, joyful day</p><h2>Something wonderful to try <em>every day.</em></h2><p>Our activity mix changes with the seasons, the children’s questions, and the energy in the room.</p></div><div className="activities-grid">{ACTIVITIES.map(({ icon: Icon, title, text, tone }) => (
      <article className={`activity-card activity-card--${tone}`} key={title}>
        <span className="activity-card__icon"><Icon /></span>
        <h3>{title}</h3>
        <p>{text}</p>
      </article>
    ))}</div></div></section>

    <section className="activities-feature activities-section"><div className="container activities-feature__grid"><div className="activities-feature__image"><img src={aboutImage} alt="Two boys drawing cards together at the craft table" /><span><FaStar /> Wonder is welcome here</span></div><div><p className="activities-kicker">More than a schedule</p><h2>We notice what makes each child <em>light up.</em></h2><p>Some children find their voice in a story circle. Others begin with paint, blocks, music, or a careful look at a leaf. Our caregivers pay attention and create more of the moments that help each child feel capable.</p><ul><li><FaFlask /> Hands-on exploration</li><li><FaChild /> Social and emotional growth</li><li><FaMusic /> Movement and self-expression</li></ul><Link to="/programs" className="activities-link">See our programs</Link></div></div></section>

    <section className="activities-cta"><div className="container"><p className="activities-kicker">Come see learning in action</p><h2>There is always room<br /><em>for one more idea.</em></h2><Link to="/contact" className="activities-button">Book a visit</Link></div></section>
  </div>
);

export default Activities;
