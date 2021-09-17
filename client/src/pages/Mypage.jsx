import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';

import { updateUserInfo } from '../reducers/api/userAPI';
import DeleteModal from '../components/DeleteModal';
import './Mypage.scss';
import { message, Button, Space } from 'antd';
import { isError } from '../reducers/errorReducer';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Mypage = () => {
  // const history = useHistory();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  console.log('내가 유저 정보', userState);

  const [updateState, setUpdateState] = useState({
    email: userState.email,
    nickname: userState.nickname,
    password: '',
  });

  //FIXME: state 업데이트
  const onChangeUpdateState = (e) => {
    const { name, value } = e.target;
    setUpdateState({ ...updateState, [name]: value });
  };
  console.log(`인풋밸류`, updateState);

  const { email, nickname, password } = updateState;

  const successMessage = () => {
    message.success('회원정보 수정이 완료되었습니다');
  };
  const inputErrMessage = () => {
    message.warning('모든 칸을 채워주세요');
  };
  const errorMessage = () => {
    message.warning('처리도중 문제가 발생했습니다');
  };

  //FIXME: 회원정보 수정 함수
  const onClickModify = async () => {
    try {
      //인풋이 모두 채워지지 않았다면 인풋 에러메세지 보낸다.
      // if (nickname === '' && password === '') {
      //   inputErrMessage();
      // }
      //회원 정보 수정이 완료되면 확인 알림창 띄운다

      // const { image } = userState;
      // const data = { updateState, image };
      // console.log('제발나와줘', data);

      await dispatch(updateUserInfo(updateState)).unwrap();
      successMessage();
    } catch (err) {
      //회원 정보 수정에 실패했으면 실패 알림창 띄운다
      dispatch(isError(err.response));
      errorMessage();
    }
  };

  //FIXME: 회원정보가 없는 경우(=로그아웃 했는데 )

  return (
    <>
      <h2>회원정보 수정</h2>

      <section>
        {/* FIXME: 회원정보 수정창 */}
        <div className="container">
          <figure>
            <div>{userState.image}</div>
            {userState.image ? (
              <Avatar src={userState.image} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
            <input type="file" />
            <label htmlFor="file">사진을 업로드 해주세요</label>
          </figure>
          <form>
            <label htmlFor="email">이메일</label>
            <input type="email" name="email" disabled value={email} />
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              onChange={onChangeUpdateState}
              name="nickname"
              required
              value={nickname || ''}
            />
            {userState.socialType === 'local' && (
              <>
                <label htmlFor="password">패스워드</label>
                <input
                  type="password"
                  onChange={onChangeUpdateState}
                  placeholder="******"
                  name="password"
                  value={password || ''}
                />
              </>
            )}
          </form>
          <Space>
            <Button onClick={onClickModify}>회원정보 수정</Button>
          </Space>
        </div>
        {/* FIXME: 관심키보드 / 내 리뷰 */}
        <div className="container">
          <div></div>
        </div>

        {/* FIXME: 회원탈퇴 */}
        <DeleteModal />
      </section>
    </>
  );
};

export default Mypage;
