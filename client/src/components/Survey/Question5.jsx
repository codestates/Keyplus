import React from 'react';

import '../styles/QuestionCard.scss';

const Question5 = ({ onClickBluetooth }) => {
  return (
    <>
      <h2 className="question-title">무선 지원 여부를 선택해주세요.</h2>
      <div className="card-container">
        <div className="card" onClick={() => onClickBluetooth(1)}>
          <div className="image-wrapper">
            <img src="/bluetooth.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">휴대하기 좋은</div>
            <div className="title">블루투스 키보드</div>
          </div>
        </div>
        {/* <div className="card" onClick={() => onClickBluetooth(0)}>
          <div className="image-wrapper">
            <img src="/no-image.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">
              선을 연결하여 <br />
              끊김 없이 사용할 수 있는
            </div>
            <div className="title">유선 키보드</div>
          </div>
        </div> */}
        <div className="card" onClick={() => onClickBluetooth(2)}>
          <div className="image-wrapper">
            <img src="/wired-keyboard.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">무선, 유선 둘 다 괜찮다</div>
            <div className="title">상관없음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question5;
