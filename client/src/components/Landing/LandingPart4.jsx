import React from 'react';
import { useHistory } from 'react-router';
import '../styles/LandingPart4.scss';

const LandingPart4 = () => {
  const history = useHistory();

  return (
    <>
      <div className="part4-background">
        <div className="part4-text-wrapper">
          <div
            data-aos="fade-down"
            data-aos-delay="50"
            data-aos-duration="1300"
            data-aos-easing="ease-out"
            className="part4-text"
          >
            다양한 브랜드의 기계식 키보드를
            <br /> 한눈에 볼 수 있습니다.
          </div>
        </div>

        <div className="part4-logo">
          <img
            src="/landing/logo.png"
            alt="logo-collection"
            style={{ width: '100%' }}
          />
        </div>

        <div className="part4-button-wrapper">
          <button
            data-aos="fade"
            data-aos-delay="50"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
            className="part4-button"
            onClick={() => history.push('/keyboards')}
          >
            키보드 구경하러 가기
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPart4;
