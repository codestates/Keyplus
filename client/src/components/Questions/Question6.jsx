import React from 'react';

const Question6 = ({ onClickPrice }) => {
  return (
    <>
      <div>원하시는 가격대를 알려주세요.</div>
      <button onClick={() => onClickPrice(50000)}>5만원 이하</button>
      <button onClick={() => onClickPrice(100000)}>10만원 이하</button>
      <button onClick={() => onClickPrice(150000)}>15만원 이하</button>
      <button onClick={() => onClickPrice(200000)}>20만원 이하</button>
      <button onClick={() => onClickPrice(300000)}>30만원 이하</button>
    </>
  );
};

export default Question6;
