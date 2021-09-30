import React from 'react';

const Question1 = ({ onClickSound }) => {
  return (
    <>
      <div>가장 마음에 드는 소리를 골라주세요.</div>
      <button onClick={() => onClickSound(1)}>보글보글</button>
      <button onClick={() => onClickSound(2)}>도각도각</button>
      <button onClick={() => onClickSound(3)}>서걱서걱 </button>
      <button onClick={() => onClickSound(4)}>찰칵찰칵</button>
    </>
  );
};

export default Question1;
