import React from 'react';

const Question2 = ({ onClickNoise }) => {
  return (
    <>
      <button onClick={() => onClickNoise('조용')}>조용</button>
      <button onClick={() => onClickNoise('보통')}>보통</button>
      <button onClick={() => onClickNoise('시끄러움')}>시끄러움</button>
    </>
  );
};

export default Question2;
