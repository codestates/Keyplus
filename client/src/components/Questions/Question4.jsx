import React from 'react';

const Question4 = ({ onClickTenkey }) => {
  return (
    <>
      <div>숫자 키패드 유무를 골라주세요.</div>
      <button onClick={() => onClickTenkey(1)}>숫자 키패드 있는 키보드</button>
      <button onClick={() => onClickTenkey(0)}>
        숫자 키패드 없는 키보드(텐키리스)
      </button>
    </>
  );
};

export default Question4;
