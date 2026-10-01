import { useState } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero.png';
import aboutImage from '../../assets/images/about.png';
import activitiesImage from '../../assets/images/activities.png';
import facilitiesImage from '../../assets/images/facilities.png';
import programsImage from '../../assets/images/programs.png';
import safetyImage from '../../assets/images/safety&trust.png';
import eidImage from '../../assets/images/Joyful Eid Celebration with Children and Treats.png';
import storyTimeImage from '../../assets/images/scenes/story-time.jpg';
import musicImage from '../../assets/images/scenes/music-and-movement.jpg';
import outdoorPlayImage from '../../assets/images/scenes/outdoor-play.jpg';
import learningDuasImage from '../../assets/images/scenes/learning-duas.jpg';
import friendshipImage from '../../assets/images/scenes/friendship.jpg';
import playAreaImage from '../../assets/images/scenes/play-area.jpg';
import restAreaImage from '../../assets/images/scenes/rest-area.jpg';
import mealsImage from '../../assets/images/scenes/healthy-meals.jpg';
import birthdayImage from '../../assets/images/scenes/birthday-celebration.jpg';
import './Gallery.css';

const GALLERY_ITEMS = [
  { image: activitiesImage, title: 'Creative play', category: 'Activities', description: 'Room for color, curiosity, and creative confidence.' },
  { image: heroImage, title: 'A warm welcome', category: 'Our spaces', description: 'A cheerful beginning to every day at Angels & Fairies.' },
  { image: aboutImage, title: 'Growing together', category: 'Development', description: 'Play, connection, and thoughtful moments with caring adults.' },
  { image: eidImage, title: 'Eid celebrations', category: 'Events', description: 'Eidi, mithai, and festive smiles shared together.' },
  { image: facilitiesImage, title: 'Our facilities', category: 'Our spaces', description: 'Bright, flexible spaces ready for little hands and big ideas.' },
  { image: storyTimeImage, title: 'Story time', category: 'Activities', description: 'Stories that spark imagination and a love of reading.' },
  { image: programsImage, title: 'Programs for every stage', category: 'Development', description: 'Age-appropriate activities that support confidence and development.' },
  { image: safetyImage, title: 'Safe and cared for', category: 'Our spaces', description: 'Attentive care in a warm, reassuring environment.' },
  { image: musicImage, title: 'Music and movement', category: 'Activities', description: 'Clapping, singing, and dancing our way through the day.' },
  { image: learningDuasImage, title: 'Values and duas', category: 'Development', description: 'Gentle lessons in kindness, gratitude, and everyday duas.' },
  { image: outdoorPlayImage, title: 'Outdoor play', category: 'Activities', description: 'Fresh air, sunshine, and plenty of room to run.' },
  { image: playAreaImage, title: 'Soft play area', category: 'Our spaces', description: 'Cushioned, colorful spaces made for safe adventures.' },
  { image: friendshipImage, title: 'Making friends', category: 'Development', description: 'Little friendships that grow every single day.' },
  { image: mealsImage, title: 'Healthy meals', category: 'Our spaces', description: 'Wholesome, home-style meals enjoyed together.' },
  { image: restAreaImage, title: 'Rest time', category: 'Our spaces', description: 'Calm, cozy corners for quiet rest and naps.' },
  { image: birthdayImage, title: 'Birthday parties', category: 'Events', description: 'Cakes, candles, and happy celebrations with friends.' },
];

const CATEGORIES = ['All', 'Activities', 'Development', 'Our spaces', 'Events'];

const Gallery = () => {
  const [category, setCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);
  const filteredItems = category === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === category);
  const activeItem = activeIndex === null ? null : GALLERY_ITEMS[activeIndex];

  const showPrevious = () => setActiveIndex((current) => current === 0 ? GALLERY_ITEMS.length - 1 : current - 1);
  const showNext = () => setActiveIndex((current) => current === GALLERY_ITEMS.length - 1 ? 0 : current + 1);

  return (
    <div className="gallery-page">
      <section className="gallery-hero"><div className="gallery-hero__image" style={{ backgroundImage: `url(${heroImage})` }} /><div className="gallery-hero__overlay" /><div className="container gallery-hero__inner"><p className="gallery-kicker">A peek inside</p><h1>Little moments.<br /><em>Big memories.</em></h1><p>Take a look at the spaces, activities, and everyday joy that make Angels & Fairies feel like a second home.</p></div></section>

      <section className="gallery-section"><div className="container"><div className="gallery-heading"><div><p className="gallery-kicker">Life at Angels & Fairies</p><h2>See what makes our days <em>special.</em></h2></div><Link to="/contact" className="gallery-link">Book a visit <FaArrowRight /></Link></div><div className="gallery-filters" role="group" aria-label="Filter gallery images">{CATEGORIES.map((item) => <button type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="gallery-grid">{filteredItems.map((item) => { const itemIndex = GALLERY_ITEMS.indexOf(item); return <button type="button" className="gallery-tile" onClick={() => setActiveIndex(itemIndex)} key={`${item.title}-${itemIndex}`}><img src={item.image} alt={item.title} /><span><strong>{item.title}</strong><small>{item.category}</small></span></button>; })}</div></div></section>

      <section className="gallery-note"><div className="container gallery-note__grid"><div><p className="gallery-kicker">More than a photo</p><h2>Come see the <em>feeling</em> for yourself.</h2></div><p>Photos can show you a room, but a visit lets you meet the caregivers, hear the laughter, and picture your child settling into their day.</p><Link to="/contact" className="gallery-button">Plan your visit <FaArrowRight /></Link></div></section>

      {activeItem && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeItem.title} onClick={() => setActiveIndex(null)}><button type="button" className="gallery-lightbox__close" onClick={() => setActiveIndex(null)} aria-label="Close image"><FaTimes /></button><button type="button" className="gallery-lightbox__previous" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Previous image"><FaChevronLeft /></button><div className="gallery-lightbox__content" onClick={(event) => event.stopPropagation()}><img src={activeItem.image} alt={activeItem.title} /><div><strong>{activeItem.title}</strong><span>{activeItem.description}</span></div></div><button type="button" className="gallery-lightbox__next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next image"><FaChevronRight /></button></div>}
    </div>
  );
};

export default Gallery;