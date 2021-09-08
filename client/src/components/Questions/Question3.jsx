import React from 'react';

const Question3 = ({ onClickWeight }) => {
  return (
    <>
      <div>키보드를 누를때 힘을 주는 정도는 어떠하신가요?</div>
      <button onClick={() => onClickWeight(45)}>가볍게 누른다</button>
      <button onClick={() => onClickWeight(46)}>세게 누른다</button>
    </>
  );
};

export default Question3;
