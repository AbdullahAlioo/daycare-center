/**
 * useScrollAnimation.js
 * Reusable hook — attaches IntersectionObserver to add
 * `.anim-visible` class when elements enter the viewport.
 *
 * Usage:
 *   import useScrollAnimation from '../../hooks/useScrollAnimation';
 *   useScrollAnimation();
 *   // Then add className="anim-fade-up" (or fade-left/right/scale-in)
 *   // optionally add delay-1 … delay-6
 */

import { useEffect } from 'react';

const useScrollAnimation = (selector = '[class*="anim-fade"], [class*="anim-scale"]') => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
            observer.unobserve(entry.target); // trigger once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
};

export default useScrollAnimation;
