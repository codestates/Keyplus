import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';

import { updateUserInfo, validateNickname } from '../reducers/api/userAPI';
import DeleteModal from '../components/DeleteModal';
import './Mypage.scss';
import { message, Button, Space } from 'antd';
import { isError } from '../reducers/errorReducer';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const Mypage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  console.log('내가 유저 정보', userState);

  const likesState = useSelector((state) => state.likes);
  console.log('내가 좋아요들', likesState);

  const reviewsState = useSelector((state) => state.reviews);
  console.log('내가 리뷰들', reviewsState);

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

  const inputErrMessage = () => {
    message.warning('모든 칸을 채워주세요');
  };

  //FIXME: 닉네임 중복확인 함수
  const onClickValidate = async (e) => {
    e.preventDefault();
    console.log('나는 업데이트 스택의 닉네임', updateState.nickname, nickname);
    try {
      await dispatch(validateNickname({ nickname })).unwrap();
      //여기서 지금 스태이트가 비워짐
      message.success('사용 가능한 닉네임 입니다');
    } catch (err) {
      dispatch(isError(err.response));
      message.warning('사용 불가한 닉네임 입니다');
    }
  };

  //FIXME: 회원정보 수정 함수
  const onClickModify = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserInfo(updateState)).unwrap();
      message.success('회원정보 수정이 완료되었습니다');
    } catch (err) {
      console.log('나 왜 에러나? ', err.response);
      //회원 정보 수정에 실패했으면 실패 알림창 띄운다
      dispatch(isError(err.response));
      message.warning('처리도중 문제가 발생했습니다');
    }
  };

  return (
    <>
      <h2>회원정보 수정</h2>

      <section>
        {/* FIXME: 회원정보 수정창 */}
        <div className="mypage-container">
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
          <div>
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
            <button type="submit" onClick={onClickValidate}>
              닉네임 중복확인
            </button>
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
          </div>
          <Space>
            <Button type="submit" onClick={onClickModify}>
              회원정보 수정
            </Button>
          </Space>
        </div>
        {/* FIXME: 관심키보드 / 내 리뷰 */}
        <div className="container">
          <div></div>
        </div>

        {/* <div className="image-list-type">
          <span
            className={isUserPosts ? 'slide-btn selected' : 'slide-btn'}
            onClick={getUserPosts}
          >
            게시글
          </span>
          <span
            className={isUserPosts ? 'slide-btn' : 'slide-btn selected'}
            onClick={getInterestPost}
          >
            관심글
          </span>
        </div>
        <div>
          <PostList posts={posts} />
        </div> */}

        {/* FIXME: 회원탈퇴 */}
        <DeleteModal />
      </section>
    </>
  );
};

export default Mypage;
