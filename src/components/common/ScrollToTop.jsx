/**
 * ScrollToTop — jumps to the top of the page on every navigation
 * (including clicking the link for the current page), so moving around
 * via the navbar/footer never lands mid-page. In-page anchor links
 * like #visit are left alone.
 */

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { key, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [key, hash]);

  return null;
};

export default ScrollToTop;
