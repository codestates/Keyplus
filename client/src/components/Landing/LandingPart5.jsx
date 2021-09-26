import React from 'react';

import './LandingPart5.scss';

const LandingPart5 = () => {
  return (
    <>
      <div
        className="part5-background"
        style={{
          backgroundImage: "url('/landing-part5.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="part5-text-wrapper">
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-out"
            className="part5-text"
          >
            당신에게 딱 맞는 키보드를 추천해드립니다.
            <br />
            지금 바로 경험해보세요.
          </div>
        </div>

        <div className="part5-button-wrapper">
          <button
            data-aos="fade"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-in-out"
            className="part5-button"
          >
            키보드 찾으러 가기
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPart5;
