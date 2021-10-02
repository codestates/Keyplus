import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteUser,
  updateUserInfo,
  validateNickname,
} from '../reducers/api/userAPI';

import TextModal from '../components/TextModal';

import './styles/Mypage.scss';
import { message, Button, Space } from 'antd';
import { isError } from '../reducers/errorReducer';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import KeyboardCard from './KeyboardCard';
import Review from '../components/Review';
// import '../components/styles/Review.scss';

const Mypage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const likesState = useSelector((state) => state.likes);

  const reviewsState = useSelector((state) => state.reviews);
  console.log('내가 리덕스에 있는 리뷰다', reviewsState);

  const userId = useSelector((state) => state.user?.id);

  const [updateState, setUpdateState] = useState({
    email: userState.email,
    nickname: userState.nickname,
    password: '',
  });
  const [file, setFile] = useState(null);
  const [newImg, setNewImg] = useState(userState.image);
  const [validNickname, setValidNickname] = useState(false);

  //! state 업데이트
  const onChangeUpdateState = (e) => {
    const { name, value } = e.target;
    setUpdateState({ ...updateState, [name]: value });
  };
  console.log(`새로운 인풋밸류`, updateState);

  const { email, nickname, password } = updateState;
  const prevNickname = userState.nickname;

  //! 닉네임 중복확인 함수
  const onClickValidate = async (e) => {
    e.preventDefault();

    try {
      //! 닉네임이 바뀌지 않았을 경우
      if (prevNickname === nickname) {
        return message.success('사용 가능한 닉네임입니다');
      }
      await validateNickname({ nickname });
      setValidNickname(true);
      message.success('사용 가능한 닉네임입니다');
    } catch (err) {
      console.log(err.response);
      // dispatch(isError(err.response));
      setValidNickname(false);
      message.warning('사용 불가능한 닉네임입니다');
    }
  };

  //! 회원정보 수정 함수
  const onClickModify = async (e) => {
    e.preventDefault();
    // if (!validNickname) return message.warning('닉네임 중복검사를 해주세요');
    try {
      if (prevNickname === nickname || validNickname) {
        setValidNickname(true);

        const formData = new FormData();
        formData.append('img', file); //e.target.img.files[0]
        formData.append('email', email);
        formData.append('nickname', nickname);
        formData.append('password', password);
        await dispatch(updateUserInfo({ formData })).unwrap();
        message.success('회원정보 수정이 완료되었습니다');
        setValidNickname(false);
      } else {
        return message.warning('닉네임 중복검사를 해주세요');
      }
    } catch (err) {
      if (!err.response) throw err;
      dispatch(isError(err.response));
      message.warning('처리 도중 문제가 발생했습니다');
    }
  };

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const prevImg = userState.image;

  //! 프로필 이미지 미리보기
  const imgref = useRef(null);
  const handleImgRef = () => {
    imgref.current.click();
  };

  const onChangeImage = (e) => {
    const newFile = e.target.files[0];
    //! file state 업데이트 시키기
    setFile(newFile);
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgUrl = reader.result;
        setNewImg(imgUrl);
      };
      reader.readAsDataURL(newFile);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mypage-wrapper">
        <section className="mypage-container">
          <div className="mypage-main">
            <h2 className="title">MYPAGE</h2>
            {/* 회원정보 수정창 */}
            <form encType="multipart/form-data" onSubmit={onClickModify}>
              <div className="upload-box">
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept=".png, .jpg, jpeg"
                  onChange={(e) => onChangeImage(e)}
                  ref={imgref}
                  hidden
                />

                {newImg ? (
                  <div className="upload-image" onClick={handleImgRef}>
                    <Avatar size={80} src={newImg} />
                  </div>
                ) : prevImg === '' ? (
                  <div className="upload-image" onClick={handleImgRef}>
                    <Avatar size={80} icon={<UserOutlined />} />
                  </div>
                ) : (
                  <div className="upload-image" onClick={handleImgRef}>
                    <Avatar size={80} src={prevImg} />
                  </div>
                )}
              </div>
              <div>
                <p className="text profile">사진을 업로드 해주세요</p>
              </div>

              <div className="input-box">
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" value={email} disabled />
              </div>

              <div className="input-box">
                <label htmlFor="nickname">닉네임</label>
                <div className="input-wrapper">
                  <input
                    className="inputlong"
                    type="text"
                    onChange={onChangeUpdateState}
                    name="nickname"
                    required
                    value={nickname || ''}
                  />

                  <button type="submit" onClick={onClickValidate}>
                    중복확인
                  </button>
                </div>
              </div>

              {userState.socialType === 'local' && (
                <>
                  <div className="input-box">
                    <label htmlFor="password">패스워드</label>
                    <input
                      type="password"
                      onChange={onChangeUpdateState}
                      placeholder="password"
                      name="password"
                      value={password || ''}
                    />
                  </div>
                </>
              )}

              <div>
                <button type="submit" className="mypage-btn">
                  회원정보 수정
                </button>
              </div>
              <div className="mypage-delete-btn">
                <TextModal
                  modalText="탈퇴하시겠습니까?"
                  loadingText="탈퇴 진행 중입니다"
                  buttonText="회원 탈퇴"
                  action={deleteUser}
                />
              </div>
            </form>
            {/* FIXME: 관심키보드 / 내 리뷰 */}
            <div className="mypage-tabs">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="관심 키보드" key="관심 키보드">
                  {/* <div className="mypage-tabs"> */}
                  {likesState.map((keyboard) => (
                    <div key={keyboard} className="mypage-tab-item">
                      <KeyboardCard
                        key={`${keyboard.id}_${keyboard.name}`}
                        keyboard={keyboard}
                      />
                    </div>
                  ))}
                  {/* </div> */}
                </TabPane>

                <TabPane tab="내 리뷰" key="내 리뷰">
                  {/* <div className="mypage-tabs"> */}
                  {reviewsState.map((review, idx) => (
                    <div
                      key={`${review}_${idx}`}
                      className="mypage-tab-item mypage-review"
                    >
                      <Review review={review} userId={userId} />
                    </div>
                  ))}
                  {/* </div> */}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Mypage;
