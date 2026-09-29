import { useState } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero.jpg';
import aboutImage from '../../assets/images/about.jpg';
import activitiesImage from '../../assets/images/activities.jpg';
import facilitiesImage from '../../assets/images/facilities.jpg';
import './Gallery.css';

const GALLERY_ITEMS = [
  { image: activitiesImage, title: 'Creative studio', category: 'Activities', description: 'Making room for color, curiosity, and creative confidence.' },
  { image: heroImage, title: 'A warm welcome', category: 'Our spaces', description: 'A cheerful beginning to every day at Angels & Fairies.' },
  { image: aboutImage, title: 'Learning together', category: 'Learning', description: 'Shared stories and thoughtful moments with caring adults.' },
  { image: facilitiesImage, title: 'Our learning room', category: 'Our spaces', description: 'Bright, flexible spaces ready for little hands and big ideas.' },
  { image: activitiesImage, title: 'Making and exploring', category: 'Activities', description: 'Hands-on invitations that let children follow their interests.' },
  { image: heroImage, title: 'Playful beginnings', category: 'Events', description: 'The everyday moments that become happy memories.' },
];

const CATEGORIES = ['All', 'Activities', 'Learning', 'Our spaces', 'Events'];

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