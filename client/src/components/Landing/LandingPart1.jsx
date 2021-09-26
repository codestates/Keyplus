import React from 'react';

import './LandingPart1.scss';

const LandingPart1 = () => {
  return (
    <>
      <div
        className="part1-background"
        style={{
          backgroundImage: "url('/landing-part1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="part1-text-wrapper">
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-out"
            className="part1-text"
          >
            기계식 키보드, 고르기 어려우신가요?
            <br />
            Keyplus가 도와드릴게요!
          </div>
        </div>

        <div className="part1-button-wrapper">
          <div className="part1-button">키보드 찾으러 가기</div>
        </div>
      </div>
    </>
  );
};

export default LandingPart1;
