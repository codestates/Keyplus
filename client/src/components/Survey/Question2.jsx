import React from 'react';

import '../styles/QuestionCard.scss';

const Question2 = ({ onClickColor }) => {
  return (
    <>
      <h2 className="question-title">선호하는 색상을 골라주세요.</h2>
      <div className="card-container">
        <div className="card" onClick={() => onClickColor(1)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">화려한 색감의</div>
            <div className="title">유채색</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickColor(0)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">차분한 색감의</div>
            <div className="title">무채색</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickColor(2)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">색깔은 중요하지 않다</div>
            <div className="title">상관없음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question2;
