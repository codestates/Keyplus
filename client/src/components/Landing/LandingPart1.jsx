import React from 'react';
import { useHistory } from 'react-router';
import '../styles/LandingPart1.scss';

const LandingPart1 = () => {
  const history = useHistory();

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
          <button
            data-aos="fade"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-in-out"
            className="part1-button"
            onClick={() => history.push('/survey')}
          >
            키보드 찾으러 가기
          </button>
        </div>
        <div className="scroll-down">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </div>
    </>
  );
};

export default LandingPart1;
