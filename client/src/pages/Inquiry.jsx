import React from 'react';

const Inquiry = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contents, setContents] = useState('');

  const onChangeEmail = (e) => {
    return setEmail(e.target.value);
  };

  const onChangeName = (e) => {
    return setName(e.target.value);
  };

  const onChangeContents = (e) => {
    return setContents(e.target.value);
  };

  const onClickSendBtn = () => {
    //axios 요청
    //alert모달 가져와서 띄우기
  };

  return (
    <>
      <section>
        <div>문의하기</div>
        <select>
          <option>키보드 추가 요청</option>
          <option>키보드 추천 요청</option>
          <option>버그 제보</option>
          <option>그 외</option>
        </select>
        <input type="text" value={email} onChange={onChangeEmail} />
        <input type="text" value={name} onChange={onChangeName} />
        <input type="text" value={contents} onChange={onChangeContents} />
        <button onClick={onClickSendBtn}>메일 전송</button>
      </section>
    </>
  );
};

export default Inquiry;
