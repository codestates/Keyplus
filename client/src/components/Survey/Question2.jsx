import React from 'react';
import '../styles/Question.scss';

const Question2 = ({ onClickColor }) => {
  return (
    <>
      <div className="question-header">
        <h2 className="question-title">선호하는 색상을 골라주세요.</h2>
      </div>
      <div className="card-container">
        <div className="card" onClick={() => onClickColor(1)}>
          <div className="image-wrapper">
            <img src="/survey/color.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">화려한 색감의</div>
            <div className="title">유채색</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickColor(0)}>
          <div className="image-wrapper">
            <img src="/survey/colorless.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">차분한 색감의</div>
            <div className="title">무채색</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickColor(2)}>
          <div className="image-wrapper">
            <img src="/survey/question.png" alt="" />
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
