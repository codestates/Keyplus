import React from 'react';

const Question4 = ({ onClickSound }) => {
  return (
    <>
      <div>키보드를 누를때 어떤 소리를 더 선호하시나요?</div>
      <button onClick={() => onClickSound('도각')}>도각</button>
      <button onClick={() => onClickSound('서걱')}>서걱</button>
      <button onClick={() => onClickSound('보글')}>보글</button>
      <button onClick={() => onClickSound('찰칵')}>찰칵</button>
    </>
  );
};

export default Question4;
