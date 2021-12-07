import React, { useState, useRef, useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
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
import { PasswordValidation } from '../utils/validation';
import Tab from '../components/Tab';
import './styles/Mypage.scss';

import axios from '../utils/customAxios';

const Mypage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.id);
  const [file, setFile] = useState(null);
  const [validNickname, setValidNickname] = useState(false);

  const [userInfo, setUserInfo] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [likesInfo, setLikesInfo] = useState([]);

  useEffect(() => {
    let isComponentMounted = true;
    const fetchData = async () => {
      const urls = [
        `${process.env.REACT_APP_API_URL}/users`,
        `${process.env.REACT_APP_API_URL}/likes`,
        `${process.env.REACT_APP_API_URL}/reviews`,
      ];
      const promises = urls.map((cur) => {
        return axios.get(cur);
      });
      const resolvedRes = await Promise.all(promises);

      if (isComponentMounted) {
        unstable_batchedUpdates(() => {
          resolvedRes.map((cur) => {
            const url = cur.config.url;
            if (url === `${process.env.REACT_APP_API_URL}/users`) {
              setUserInfo(cur.data.data);
            } else if (url === `${process.env.REACT_APP_API_URL}/likes`) {
              setLikesInfo(cur.data.data);
            } else if (url === `${process.env.REACT_APP_API_URL}/reviews`) {
              setReviewInfo(cur.data.data);
            }
          });
        });
      }
    };
    fetchData();
    return () => {
      isComponentMounted = false;
    };
  }, []);

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
            <Tab
              reviewInfo={reviewInfo}
              likesInfo={likesInfo}
              userId={userId}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Mypage;
