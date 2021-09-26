import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, logIn, logOut, signUp } from '../reducers/api/userAPI';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { isError } from '../reducers/errorReducer';

import './Landing.scss';
import LandingPart1 from '../components/Landing/LandingPart1';
import LandingPart2 from '../components/Landing/LandingPart2';
import LandingPart3 from '../components/Landing/LandingPart3';
import LandingPart4 from '../components/Landing/LandingPart4';
import LandingPart5 from '../components/Landing/LandingPart5';
import Footer from '../components/Footer';
import LandingHeader from '../components/LandingHeader';

const Landing = () => {
  return (
    <>
      <div className="landing-main">
        <LandingHeader />
        <LandingPart1 />
        {/* <LandingPart2 /> */}
        <LandingPart3 />
        {/* <LandingPart4 /> */}
        <LandingPart5 />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
