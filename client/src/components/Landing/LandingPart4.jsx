import React from 'react';

const LandingPart4 = () => {
  return (
    <>
      {' '}
      <div
        style={{
          height: '1000px',
          backgroundImage: "url('/landing-part-1.png')",
          backgroundSize: 'cover',
        }}
      >
        <div className="text-wrapper">
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-out"
            className="text"
          >
            기계식 키보드, 고르기 어려우신가요?
            <br />
            Keyplus가 도와드릴게요!
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPart4;
