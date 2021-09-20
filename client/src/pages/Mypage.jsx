import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserInfo, validateNickname } from '../reducers/api/userAPI';
import DeleteModal from '../components/DeleteModal';
import './Mypage.scss';
import { message, Button, Space } from 'antd';
import { isError } from '../reducers/errorReducer';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import { useHistory } from 'react-router';
import { Tabs } from 'antd';
import KeyboardCard from './KeyboardCard';

const Mypage = () => {
  // const history = useHistory();
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
  const [validNickname, setValidNickname] = useState(false);

  //FIXME: 닉네임 중복확인 함수
  const onClickValidate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(validateNickname({ nickname })).unwrap();
      setValidNickname(true);
      message.success('사용 가능한 닉네임 입니다');
    } catch (err) {
      dispatch(isError(err.response));
      setValidNickname(false);
      message.warning('사용 불가한 닉네임 입니다');
    }
  };

  //FIXME: 회원정보 수정 함수
  const onClickModify = async (e) => {
    e.preventDefault();
    if (!validNickname) return message.warning('닉네임 중복검사를 해주세요');
    try {
      await dispatch(updateUserInfo(updateState)).unwrap();
      setValidNickname(false);
      message.success('회원정보 수정이 완료되었습니다');
    } catch (err) {
      dispatch(isError(err.response));
      message.warning('처리도중 문제가 발생했습니다');
    }
  };

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

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
            <div>
              <label htmlFor="email">이메일</label>
              <input type="email" name="email" disabled value={email} />
            </div>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                onChange={onChangeUpdateState}
                name="nickname"
                required
                value={nickname || ''}
              />
            </div>
            <button type="submit" onClick={onClickValidate}>
              닉네임 중복확인
            </button>
            {userState.socialType === 'local' && (
              <>
                <div>
                  <label htmlFor="password">패스워드</label>
                  <input
                    type="password"
                    onChange={onChangeUpdateState}
                    placeholder="******"
                    name="password"
                    value={password || ''}
                  />
                </div>
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

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="관심 키보드" key="관심 키보드">
            {likesState.map((keyboard) => (
              <KeyboardCard
                key={`${keyboard.id}_${keyboard.name}`}
                keyboard={keyboard}
              />
            ))}
          </TabPane>

          <TabPane tab="내 리뷰" key="내 리뷰">
            여긴 리뷰 페이지
          </TabPane>
        </Tabs>

        {/* FIXME: 회원탈퇴 */}
        <DeleteModal />
      </section>
    </>
  );
};

export default Mypage;
