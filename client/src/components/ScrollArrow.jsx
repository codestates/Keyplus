import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <FaArrowCircleUp
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
