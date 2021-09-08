import React from 'react';

const Question2 = ({ onClickNoise }) => {
  return (
    <>
      <div>
        키보드의 시끄러움 정도를 골라주세요! 사용하시는 장소에 따라 보통
        결정됩니다.
      </div>
      <button onClick={() => onClickNoise('조용')}>조용</button>
      <button onClick={() => onClickNoise('보통')}>보통</button>
      <button onClick={() => onClickNoise('시끄러움')}>시끄러움</button>
    </>
  );
};

export default Question2;
