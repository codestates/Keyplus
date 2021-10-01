import React from 'react';

import '../styles/QuestionCard.scss';

const Question1 = ({ onClickSound }) => {
  return (
    <>
      <h2 className="question-title">가장 마음에 드는 소리를 알려주세요.</h2>
      <div className="card-container">
        <div className="card" onClick={() => onClickSound(1)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">찌개 끓는 소리</div>
            <div className="title">보글보글</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickSound(2)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">초콜릿 부러뜨리는 소리</div>
            <div className="title">도각도각</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickSound(3)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">서걱의 정체는 무엇인가?</div>
            <div className="title">서걱서걱 </div>
          </div>
        </div>
        <div className="card" onClick={() => onClickSound(4)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">PC방 키보드 소리</div>
            <div className="title">찰칵찰칵</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question1;
