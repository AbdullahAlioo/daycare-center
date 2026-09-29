import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronDown, FaClock, FaHeart, FaShieldAlt } from 'react-icons/fa';
import './FAQ.css';

const QUESTIONS = [
  { question: 'What age groups do you accept?', answer: 'We welcome children from 0 to 5 years across our infant, toddler, preschool, and early learning programs. Our team can help you find the best fit for your child’s age and stage.' },
  { question: 'What are your daycare timings?', answer: 'We are open Monday through Saturday from 7:30 AM to 6:00 PM. Please contact us to discuss your preferred routine and availability.' },
  { question: 'How do you ensure children’s safety?', answer: 'Our environment is designed around close supervision, secure access, clear routines, age-appropriate equipment, and attentive caregiver relationships. We also maintain hygiene and emergency procedures for every room.' },
  { question: 'What should my child bring each day?', answer: 'Please bring a labelled change of clothes, any comfort item your child needs, and age-appropriate personal supplies. Our admissions team will share a tailored checklist before your child starts.' },
  { question: 'Do you provide meals and snacks?', answer: 'Meal and snack arrangements depend on the child’s program and family preferences. We will discuss allergies, dietary needs, and your child’s routine during enrollment.' },
  { question: 'Can parents visit before admission?', answer: 'Absolutely. We encourage families to book a visit, meet our team, see the learning spaces, and ask questions before making a decision.' },
  { question: 'How can I enroll my child?', answer: 'Start by sending an inquiry through our admissions form or contacting us directly. We will confirm availability, arrange a visit, explain the next steps, and answer your questions about fees.' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-page">
      <section className="faq-hero"><div className="container faq-hero__inner"><p className="faq-kicker">Helpful answers for families</p><h1>Questions are welcome<br /><em>here.</em></h1><p>Everything you need to feel informed, prepared, and confident about choosing care for your child.</p></div></section>
      <section className="faq-section"><div className="container faq-layout"><aside className="faq-sidebar"><p className="faq-kicker">Before you visit</p><h2>A little clarity goes a <em>long way.</em></h2><p>We know choosing childcare is a big decision. If you cannot find your answer below, our team is happy to talk it through.</p><div className="faq-sidebar__note"><FaHeart /><strong>Still wondering?</strong><span>There is no such thing as a small question when it comes to your child.</span><Link to="/contact">Ask our team <FaArrowRight /></Link></div></aside><div className="faq-list">{QUESTIONS.map((item, index) => <div className={`faq-item ${openIndex === index ? 'open' : ''}`} key={item.question}><button type="button" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}><span>{item.question}</span><FaChevronDown /></button><div className="faq-answer"><p>{item.answer}</p></div></div>)}</div></div></section>
      <section className="faq-trust"><div className="container faq-trust__grid"><div><FaShieldAlt /><span><strong>Safe by design</strong>Secure, attentive care</span></div><div><FaClock /><span><strong>Open six days</strong>7:30 AM - 6:00 PM</span></div><div><FaHeart /><span><strong>Here to listen</strong>Warm family support</span></div></div></section>
      <section className="faq-cta"><div className="container"><p className="faq-kicker">Let’s talk about your family</p><h2>Some answers are best found<br /><em>in conversation.</em></h2><Link to="/contact" className="faq-button">Contact us <FaArrowRight /></Link></div></section>
    </div>
  );
};

export default FAQ;