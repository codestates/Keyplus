import React from 'react';

const Question2 = ({ onClickColor }) => {
  return (
    <>
      <div>선호하는 색상을 골라주세요.</div>
      <button onClick={() => onClickColor(1)}>유채색</button>
      <button onClick={() => onClickColor(0)}>무채색</button>
    </>
  );
};

export default Question2;
