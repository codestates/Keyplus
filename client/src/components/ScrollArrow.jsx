import React, { useState } from 'react';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import smoothscroll from 'smoothscroll-polyfill';
import './styles/ScrollArrow.scss';

const ScrollArrow = ({ landing }) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    smoothscroll.polyfill();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  window.addEventListener('scroll', checkScrollTop);

  return (
    <HiOutlineChevronDoubleUp
      className="scrollTop"
      onClick={scrollTop}
      style={{
        color: landing ? '#fff' : '#000',
        display: showScroll ? 'flex' : 'none',
      }}
    />
  );
};

export default ScrollArrow;
