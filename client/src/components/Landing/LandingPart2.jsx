import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import '../styles/LandingPart2.scss';

const LandingPart2 = () => {
  return (
    <>
      <div className="part2-background">
        <Carousel
          autoPlay
          infiniteLoop
          emulateTouch
          showStatus={false}
          showThumbs={false}
        >
          <img
            className="part2-carousel-image"
            src="/landing-part2-1.png"
            alt=""
          />
          <img
            className="part2-carousel-image"
            src="/landing-part2-2.png"
            alt=""
          />
          <img
            className="part2-carousel-image"
            src="/landing-part2-3.png"
            alt=""
          />
          <img
            className="part2-carousel-image"
            src="/landing-part2-4.png"
            alt=""
          />
          <img
            className="part2-carousel-image"
            src="/landing-part2-5.png"
            alt=""
          />
        </Carousel>
        <div className="part2-text-wrapper">
          <div
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-out"
            className="part2-text"
          >
            이렇게 예쁜 기계식 키보드,
            <br />
            언제까지 고민만 하실 건가요?
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPart2;
