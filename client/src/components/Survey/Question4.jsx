import React from 'react';
import '../styles/Question.scss';

const Question4 = ({ onClickTenkey }) => {
  return (
    <>
      <div className="question-header">
        <h2 className="question-title">숫자 키패드 유무를 골라주세요.</h2>
      </div>
      <div className="card-container">
        <div className="card" onClick={() => onClickTenkey(1)}>
          <div className="image-wrapper">
            <img src="/survey/full.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">숫자를 입력하기 편한</div>
            <div className="title">숫자 키패드가 있는 키보드</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickTenkey(0)}>
          <div className="image-wrapper">
            <img src="/survey/tkl.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">키보드의 가로 길이가 짧은</div>
            <div className="title">숫자 키패드가 없는 키보드</div>
          </div>
        </div>
        <div className="card" onClick={() => onClickTenkey(2)}>
          <div className="image-wrapper">
            <img src="/survey/question.png" alt="" />
          </div>
          <div className="text-wrapper">
            <div className="description">둘 다 괜찮다</div>
            <div className="title">상관없음</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question4;
