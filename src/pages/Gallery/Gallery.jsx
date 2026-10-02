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
import artTableImage from '../../assets/images/scenes/art-table-overhead.jpg';
import drawingCardsImage from '../../assets/images/scenes/boys-drawing-cards.jpg';
import guidedPaintingImage from '../../assets/images/scenes/caregiver-guided-painting.jpg';
import craftTableImage from '../../assets/images/scenes/girl-craft-table.jpg';
import cardsFlatlayImage from '../../assets/images/scenes/mothers-day-cards-flatlay.jpg';
import puppetsImage from '../../assets/images/scenes/boys-balloons-puppets.jpg';
import brothersCardImage from '../../assets/images/scenes/mothers-day-brothers-card.jpg';
import redTeesImage from '../../assets/images/scenes/three-boys-red-tees.jpg';
import fathersDayImage from '../../assets/images/scenes/fathers-day-tie-card.jpg';
import babyCardImage from '../../assets/images/scenes/baby-fingerprint-card.jpg';
import toddlerCardImage from '../../assets/images/scenes/toddler-mothers-day-card.jpg';
import muralImage from '../../assets/images/scenes/thank-you-card-mural.jpg';
import groupBirthdayImage from '../../assets/images/scenes/group-birthday-party.jpg';
import eidBoysImage from '../../assets/images/scenes/eid-boys-thumbs-up.jpg';
import eidPairImage from '../../assets/images/scenes/eid-outfits-pair.jpg';
import birthdayGirlImage from '../../assets/images/scenes/birthday-girl-and-friend.jpg';
import independenceDayImage from '../../assets/images/scenes/independence-day-salute.jpg';
import cultureDayImage from '../../assets/images/scenes/sindhi-waistcoat-boy.jpg';
import bannerImage from '../../assets/images/scenes/independence-day-group.jpg';
import VideoMoments from '../../components/common/VideoMoments/VideoMoments';
import './Gallery.css';

const GALLERY_ITEMS = [
  { image: groupBirthdayImage, title: 'Birthday parties', category: 'Events', description: 'Cake, balloons, and a room full of friends singing along.' },
  { image: artTableImage, title: 'Busy hands at the art table', category: 'Activities', description: 'Paints, markers, and plenty of room for little ideas.' },
  { image: brothersCardImage, title: 'Made with love', category: 'Development', description: 'Handmade Mother’s Day cards, proudly shown off.' },
  { image: eidPairImage, title: 'Eid celebrations', category: 'Events', description: 'Festive outfits and big smiles on Eid.' },
  { image: guidedPaintingImage, title: 'A guiding hand', category: 'Activities', description: 'Caregivers right beside the children as they create.' },
  { image: eidBoysImage, title: 'Eid Mubarak!', category: 'Events', description: 'Thumbs up from our little ones in their Eid kurtas.' },
  { image: drawingCardsImage, title: 'Drawing together', category: 'Activities', description: 'Focused, happy, and full of colour.' },
  { image: muralImage, title: 'Thank you for helping me grow', category: 'Our spaces', description: 'A proud moment in front of our painted tree mural.' },
  { image: cardsFlatlayImage, title: 'Fingerprint hearts', category: 'Activities', description: 'A table full of finished Mother’s Day cards.' },
  { image: independenceDayImage, title: 'Independence Day', category: 'Events', description: 'Celebrating 14 August in green and white.' },
  { image: redTeesImage, title: 'Best buddies', category: 'Development', description: 'Friendships that grow every single day.' },
  { image: craftTableImage, title: 'Little artists', category: 'Activities', description: 'Trying out paints and making something new.' },
  { image: fathersDayImage, title: 'Father’s Day cards', category: 'Development', description: 'A handmade tie card made just for Dad.' },
  { image: birthdayGirlImage, title: 'Birthday girl', category: 'Events', description: 'Tiaras, balloons, and a special day with friends.' },
  { image: babyCardImage, title: 'Our youngest artists', category: 'Development', description: 'Even the littlest ones get to make something special.' },
  { image: cultureDayImage, title: 'Culture day', category: 'Events', description: 'Dressing up in traditional outfits from across Pakistan.' },
  { image: puppetsImage, title: 'Puppets and balloons', category: 'Activities', description: 'Paper puppets, balloons, and lots of giggles.' },
  { image: toddlerCardImage, title: 'For Mama', category: 'Development', description: 'A toddler’s first handmade Mother’s Day card.' },
  { image: activitiesImage, title: 'Creative play', category: 'Activities', description: 'Room for color, curiosity, and creative confidence.' },
  { image: heroImage, title: 'A warm welcome', category: 'Our spaces', description: 'A cheerful beginning to every day at Angels & Fairies.' },
  { image: aboutImage, title: 'Growing together', category: 'Development', description: 'Play, connection, and thoughtful moments with caring adults.' },
  { image: eidImage, title: 'Eid celebrations', category: 'Events', description: 'Eidi, mithai, and festive smiles shared together.' },
  { image: facilitiesImage, title: 'Our facilities', category: 'Our spaces', description: 'Bright, flexible spaces ready for little hands and big ideas.' },
  { image: programsImage, title: 'Programs for every stage', category: 'Development', description: 'Age-appropriate activities that support confidence and development.' },
  { image: safetyImage, title: 'Safe and cared for', category: 'Our spaces', description: 'Attentive care in a warm, reassuring environment.' },
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
      <section className="gallery-hero"><div className="gallery-hero__image" style={{ backgroundImage: `url(${bannerImage})` }} /><div className="gallery-hero__overlay" /><div className="container gallery-hero__inner"><p className="gallery-kicker">A peek inside</p><h1>Little moments.<br /><em>Big memories.</em></h1><p>Take a look at the spaces, activities, and everyday joy that make Angels & Fairies feel like a second home.</p></div></section>

      <section className="gallery-section"><div className="container"><div className="gallery-heading"><div><p className="gallery-kicker">Life at Angels & Fairies</p><h2>See what makes our days <em>special.</em></h2></div><Link to="/contact" className="gallery-link">Book a visit <FaArrowRight /></Link></div><div className="gallery-filters" role="group" aria-label="Filter gallery images">{CATEGORIES.map((item) => <button type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="gallery-grid">{filteredItems.map((item) => { const itemIndex = GALLERY_ITEMS.indexOf(item); return <button type="button" className="gallery-tile" onClick={() => setActiveIndex(itemIndex)} key={`${item.title}-${itemIndex}`}><img src={item.image} alt={item.title} /><span><strong>{item.title}</strong><small>{item.category}</small></span></button>; })}</div></div></section>

      <VideoMoments />


      <section className="gallery-note"><div className="container gallery-note__grid"><div><p className="gallery-kicker">More than a photo</p><h2>Come see the <em>feeling</em> for yourself.</h2></div><p>Photos can show you a room, but a visit lets you meet the caregivers, hear the laughter, and picture your child settling into their day.</p><Link to="/contact" className="gallery-button">Plan your visit <FaArrowRight /></Link></div></section>

      {activeItem && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeItem.title} onClick={() => setActiveIndex(null)}><button type="button" className="gallery-lightbox__close" onClick={() => setActiveIndex(null)} aria-label="Close image"><FaTimes /></button><button type="button" className="gallery-lightbox__previous" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Previous image"><FaChevronLeft /></button><div className="gallery-lightbox__content" onClick={(event) => event.stopPropagation()}><img src={activeItem.image} alt={activeItem.title} /><div><strong>{activeItem.title}</strong><span>{activeItem.description}</span></div></div><button type="button" className="gallery-lightbox__next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next image"><FaChevronRight /></button></div>}
    </div>
  );
};

export default Gallery;