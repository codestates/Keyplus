import React from 'react';

import '../styles/LandingPart3.scss';

const LandingPart3 = () => {
  return (
    <>
      <div className="part3-background">
        <div className="part3-image-wrapper">
          <div
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-out"
            className="part3-image"
          >
            <img src="/landing-part3-1.png" alt="리뷰 첫 번째 사진" />
          </div>
        </div>
        <div className="part3-image-wrapper">
          <div
            data-aos="fade-left"
            data-aos-delay="550"
            data-aos-duration="1000"
            data-aos-easing="ease-out"
            className="part3-image"
          >
            <img src="/landing-part3-2.png" alt="리뷰 두 번째 사진" />
          </div>
        </div>
        <div className="part3-image-wrapper">
          <div
            data-aos="fade-down"
            data-aos-delay="1050"
            data-aos-duration="1000"
            data-aos-easing="ease-out"
            className="part3-image"
          >
            <img src="/landing-part3-3.png" alt="리뷰 세 번째 사진" />
          </div>
        </div>
        <div className="part3-text-wrapper">
          <div
            data-aos="fade"
            data-aos-delay="1600"
            data-aos-duration="500"
            data-aos-easing="ease-out"
            className="part3-text"
          >
            <span>디자인, 타건감, LED, 소리, 가격, 무선 등</span> <br />
            <span>수많은 고민 요소들, 해결해드립니다.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPart3;
