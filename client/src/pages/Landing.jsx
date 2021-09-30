import React, { useEffect } from 'react';

import LandingHeader from '../components/LandingHeader';
import LandingPart1 from '../components/Landing/LandingPart1';
import LandingPart2 from '../components/Landing/LandingPart2';
import LandingPart3 from '../components/Landing/LandingPart3';
import LandingPart4 from '../components/Landing/LandingPart4';
import LandingPart5 from '../components/Landing/LandingPart5';
import Footer from '../components/Footer';

import './styles/Landing.scss';

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('🥰🥰🥰🥰🥰🥰🥰🥰', document.cookie);
  }, []);

  return (
    <>
      <div className="landing-main">
        <LandingHeader />
        <LandingPart1 />
        <LandingPart2 />
        <LandingPart3 />
        <LandingPart4 />
        <LandingPart5 />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
