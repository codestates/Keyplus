import React from 'react';

const Question5 = ({ onClickBluetooth }) => {
  return (
    <>
      <div>블루투스 유무를 선택해주세요.</div>
      <button onClick={() => onClickBluetooth(1)}>
        블루투스를 지원하는 무선 키보드
      </button>
      <button onClick={() => onClickBluetooth(0)}>
        선을 연결하여 끊김 없이 사용할 수 있는 유선 키보드
      </button>
    </>
  );
};

export default Question5;
