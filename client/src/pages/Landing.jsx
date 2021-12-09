import React from 'react';
import Header from '../components/Header';
import LandingPart1 from '../components/Landing/LandingPart1';
import LandingPart2 from '../components/Landing/LandingPart2';
import LandingPart3 from '../components/Landing/LandingPart3';
import LandingPart4 from '../components/Landing/LandingPart4';
import LandingPart5 from '../components/Landing/LandingPart5';
import Footer from '../components/Footer';
import ScrollArrow from '../components/ScrollArrow';
import './styles/Landing.scss';

const Landing = () => {
  return (
    <>
      <ScrollArrow landing={true} />
      <div className="landing-main">
        <Header landing />
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
