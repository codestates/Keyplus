import React from 'react';

const Question1 = ({ onClickGaming }) => {
  return (
    <>
      <button onClick={() => onClickGaming(true)}>게임</button>
      <button onClick={() => onClickGaming(false)}>개발</button>
      <button onClick={() => onClickGaming(false)}>사무</button>
    </>
  );
};

export default Question1;
