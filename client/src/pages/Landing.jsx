import React from 'react';

import './Landing.scss';

const Landing = () => {
  return (
    <>
      <video autoPlay muted loop className="video">
        <source
          src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/main.mp4`}
          type="video/mp4"
        />
      </video>
    </>
  );
};

export default Landing;
