import React from 'react';

const Question1 = ({ onClickGaming }) => {
  return (
    <>
      <div>어떤 용도로 사용하실 계획인가요?</div>
      <button onClick={() => onClickGaming(1)}>게임</button>
      <button onClick={() => onClickGaming(0)}>개발</button>
      <button onClick={() => onClickGaming(0)}>사무</button>
    </>
  );
};

export default Question1;
