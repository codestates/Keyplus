import React from 'react';

const Question3 = ({ onClickBacklight }) => {
  return (
    <>
      <div>키보드 LED 백라이트 여부를 선택해주세요.</div>
      <button onClick={() => onClickBacklight(1)}>
        화려한 조명이 있는 키보드
      </button>
      <button onClick={() => onClickBacklight(0)}>
        조명이 없는 차분한 키보드
      </button>
    </>
  );
};

export default Question3;
