import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Mypage = () => {
  // const [errorMsg, setErrorMsg] = useState('');
  // const dispatch = useDispatch();
  // const history = useHistory();

  // //FIXME: 회원정보 수정 함수
  // const onClickModify = () => {
  //   //회원 정보 수정이 완료되면 확인 모달창 띄우기
  //   //회원 정보 수정에 실패했으면 실패 모달 창 띄우기
  //   return;
  // };

  // //FIXME: 회원탈퇴 함수
  // const onClickDelete = async () => {
  //   // try {
  //   //   await dispatch(logOut());
  //   //   //
  //   //   history.push('/landing');
  //   // } catch (err) {
  //   //   dispatch(isError(err.response));
  //   // }
  //   return;
  // };

  return (
    <>
      <h2>회원정보 수정</h2>

      {/* <section>
        //FIXME: 회원정보 수정창
        <div>
          <span>{errorMsg}</span>
          <button onClick={onClickModify}>회원정보 수정</button>
        </div>
        //FIXME: 관심키보드 / 내 리뷰
        <div></div>
        <div onClick={onClickDelete}>회원 탈퇴</div>
      </section> */}
    </>
  );
};

export default Mypage;
