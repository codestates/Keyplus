import React from 'react';

import '../styles/QuestionCard.scss';

const Question6 = ({ onClickPrice }) => {
  return (
    <>
      <div className="question-header">
        <h2 className="question-title">원하시는 가격대를 알려주세요.</h2>
      </div>
      <div className="card-container vertical">
        <div className="card" onClick={() => onClickPrice(50000)}>
          <div className="text-wrapper only-text">
            <div className="title">5만원 이하</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickPrice(100000)}>
          <div className="text-wrapper only-text">
            <div className="title">10만원 이하</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickPrice(150000)}>
          <div className="text-wrapper only-text">
            <div className="title">15만원 이하</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickPrice(200000)}>
          <div className="text-wrapper only-text">
            <div className="title">20만원 이하</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickPrice(300000)}>
          <div className="text-wrapper only-text">
            <div className="title">30만원 이하</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickPrice(1000000)}>
          <div className="text-wrapper only-text">
            <div className="title">상관없음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question6;
