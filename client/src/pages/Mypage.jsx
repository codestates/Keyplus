import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  updateUserInfo,
  validateNickname,
} from '../reducers/api/userAPI';
import TextModal from '../components/TextModal';
import { message } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import KeyboardCard from '../components/KeyboardCard';
import Review from '../components/Review';
import { PasswordValidation } from '../utils/validation';
import './styles/Mypage.scss';

//! 추가하는 부분
import axios from '../utils/customAxios';

const { TabPane } = Tabs;

const Mypage = () => {
  const dispatch = useDispatch();
  const likesState = useSelector((state) => state.likes);
  const reviewsState = useSelector((state) => state.reviews);
  const userId = useSelector((state) => state.user?.id);
  const [file, setFile] = useState(null);
  const [validNickname, setValidNickname] = useState(false);
  console.log('이건 likeState', reviewsState);

  const [userInfo, setUserInfo] = useState({});
  // ! 서버에서 유저정보를 가져와야한다.
  useEffect(() => {
    let isComponentMounted = true;
    const getUserInfo = async () => {
      let newData = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      //! unmount될 시 요청이 늦게와도 setState를 방지함으로써 마지막 요청의 결과를 UI에 표시하게 한다.
      if (isComponentMounted) {
        setUserInfo(newData.data.data);
      }
    };
    getUserInfo();

    return () => {
      isComponentMounted = false;
    };
  }, []);

  const [reviewInfo, setReviewInfo] = useState([]);
  const [likesInfo, setLikesInfo] = useState([]);
  useLayoutEffect(() => {
    let isComponentMounted = true;
    const fetchData = async () => {
      const likesData = await axios.get(
        `${process.env.REACT_APP_API_URL}/likes`
      );
      const reviewData = await axios.get(
        `${process.env.REACT_APP_API_URL}/reviews`
      );
      //! unmount될 시 요청이 늦게와도 setState를 방지함으로써 마지막 요청의 결과를 UI에 표시하게 한다.
      if (isComponentMounted) {
        setLikesInfo(likesData.data.data);
        console.log('서버에서 가져온 좋아요', likesData);
        setReviewInfo(reviewData.data.data);
        console.log('서버에서 가져온 리뷰', reviewData);
      }
    };
    fetchData();

    return () => {
      isComponentMounted = false;
    };
  }, []);
  console.log('서버에서 가져온 리뷰2', reviewInfo);
  console.log('서버에서 가져온 좋아요2', likesInfo);

  // * 업데이트 함수
  const onChangeUpdateState = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const { email, nickname, password } = userInfo;
  const prevNickname = userInfo.nickname;

  const onClickValidate = async (e) => {
    e.preventDefault();
    try {
      if (prevNickname === nickname) {
        return message.success('사용 가능한 닉네임입니다');
      }
      await validateNickname({ nickname });
      setValidNickname(true);
      message.success('사용 가능한 닉네임입니다');
    } catch (err) {
      setValidNickname(false);
      message.warning('사용 불가능한 닉네임입니다');
    }
  };

  const prevImg = userInfo.image;
  const [newImg, setNewImg] = useState(prevImg);

  //! 프로필 이미지 미리보기
  const imgref = useRef(null);
  const handleImgRef = () => {
    imgref.current.click();
  };

  const onChangeImage = (e) => {
    const newFile = e.target.files[0];
    //! file state 업데이트
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

  const onClickModify = async (e) => {
    e.preventDefault();
    if (password && !PasswordValidation(password)) {
      return message.warning(
        '최소 6자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자의 비밀번호가 필요합니다'
      );
    } else if (prevNickname === nickname || validNickname) {
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
  };

  return (
    <>
      <div className="mypage-wrapper">
        <section className="mypage-container">
          <div className="mypage-main">
            <h2 className="title">MYPAGE</h2>
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
                <input type="email" name="email" value={email || ''} disabled />
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
              {userInfo.socialType === 'local' && (
                <>
                  <div className="input-box">
                    <label htmlFor="password">비밀번호</label>
                    <input
                      type="password"
                      onChange={onChangeUpdateState}
                      placeholder="password"
                      required
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
            <div className="mypage-tabs">
              <Tabs defaultActiveKey="1">
                {likesInfo.length !== 0 && (
                  <TabPane tab="관심 키보드" key="관심 키보드">
                    {likesInfo.map((keyboard) => (
                      <div
                        key={`${keyboard.id}_${keyboard.name}`}
                        className="mypage-tab-item"
                      >
                        <KeyboardCard keyboard={keyboard} />
                      </div>
                    ))}
                  </TabPane>
                )}

                {reviewInfo.length !== 0 && (
                  <TabPane tab="내 리뷰" key="내 리뷰">
                    {reviewInfo.map((review, idx) => (
                      <Link
                        key={`${review}_${idx}`}
                        to={`/keyboards/${review.keyboardId}`}
                      >
                        <div className="mypage-tab-item mypage-review">
                          <Review review={review} userId={userId} />
                        </div>
                      </Link>
                    ))}
                  </TabPane>
                )}
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Mypage;
