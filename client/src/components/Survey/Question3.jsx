import React from 'react';

import '../styles/QuestionCard.scss';

const Question3 = ({ onClickBacklight }) => {
  return (
    <>
      <h2 className="question-title">
        키보드 LED 백라이트 여부를 선택해주세요.
      </h2>
      <div className="card-container">
        <div className="card" onClick={() => onClickBacklight(1)}>
          <div className="image-wrapper">
            <img src="/gaming.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">키보드를 밝혀주는</div>
            <div className="title"> 조명이 있는 키보드</div>
          </div>
        </div>
        {/* <div className="card" onClick={() => onClickBacklight(0)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">여기는 설명이다</div>
            <div className="title">조명이 없는 차분한 키보드</div>
          </div>
        </div> */}
        <div className="card" onClick={() => onClickBacklight(2)}>
          <div className="image-wrapper">
            <img src="/question.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">조명이 있든 없든 상관없다</div>
            <div className="title">상관없음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question3;