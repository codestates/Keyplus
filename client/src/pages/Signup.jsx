import React, { useState, useRef } from 'react';
import { message } from 'antd';
import { Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import {
  signUp,
  validateEmail,
  validateNickname,
} from '../reducers/api/userAPI';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { EmailValidation, PasswordValidation } from '../utils/validation';
import './styles/Signup.scss';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [validEmail, setValidEmail] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [validNickname, setValidNickname] = useState(false);
  const [userState, setUserState] = useState({
    email: '',
    nickname: '',
    password: '',
    repassword: '',
  });

  const onChangeUpdateState = (e) => {
    const { name, value } = e.target;
    setUserState({ ...userState, [name]: value });
  };
  const { email, nickname, password, repassword } = userState;

  const emailVerify = () => {
    if (input == code) {
      setValidEmail(true);
      return message.success('이메일 인증에 성공했습니다');
    }
    return message.warning('인증번호 확인에 실패했습니다');
  };

  const emailValidate = async (e) => {
    e.preventDefault();
    try {
      if (!EmailValidation(email)) {
        setValidEmail(false);
        return message.warning('올바르지 않은 이메일 형식입니다');
      } else {
        const response = await validateEmail({ email });
        setIsClicked(true);
        setCode(response.data.data.verificationCode);
      }
    } catch (err) {
      setValidEmail(false);
      message.warning('이미 사용 중인 이메일입니다');
    }
  };

  const nicknameValidate = async (e) => {
    e.preventDefault();
    try {
      if (nickname === '') return message.warning('닉네임을 입력해주세요');
      await validateNickname({ nickname });
      setValidNickname(true);
      message.success('사용 가능한 닉네임입니다');
    } catch (err) {
      setValidNickname(false);
      message.warning('사용 불가능한 닉네임입니다');
    }
  };

  const imgref = useRef(null);
  const handleImgRef = () => {
    imgref.current.click();
  };

  const onChangeImage = (e) => {
    //! file state 업데이트
    const newFile = e.target.files[0];
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgUrl = reader.result;
        setProfileImg(imgUrl);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const isEmpty =
    email === '' || nickname === '' || password === '' || repassword === '';

  const onClickSignup = async (e) => {
    e.preventDefault();
    try {
      if (!validEmail) {
        return message.warning('이메일 인증을 해주세요');
      }
      if (!validNickname) {
        return message.warning('닉네임 중복검사를 해주세요');
      }
      if (isEmpty) {
        return message.warning('모든 칸을 입력해주세요');
      }
      if (password !== repassword) {
        return message.warning('비밀번호를 다시 확인해주세요');
      }
      if (!PasswordValidation(password)) {
        return message.warning(
          '최소 6자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자의 비밀번호가 필요합니다'
        );
      }

      const formData = new FormData();
      formData.append('img', e.target.img.files[0]);
      formData.append('email', email);
      formData.append('nickname', nickname);
      formData.append('password', password);
      //! profileImg에 이미지 url이 있다
      await dispatch(
        signUp({
          state: { ...userState, image: profileImg },
          formData,
          history,
        })
      ).unwrap();
      message.success('회원가입에 성공했습니다');
      setValidNickname(false);
      setValidEmail(false);
    } catch (err) {
      if (!err.response) throw err;
      message.warning('회원가입에 실패했습니다');
    }
  };

  return (
    <>
      <section className="signup-container">
        <div className="signup-flexbox">
          <div className="signup-main">
            <h2 className="title">Signup</h2>
            <form className="signup-form" onSubmit={onClickSignup}>
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
                {profileImg ? (
                  <div className="upload-image" onClick={handleImgRef}>
                    <Avatar src={profileImg} size={80} />
                  </div>
                ) : (
                  <div className="upload-image" onClick={handleImgRef}>
                    <Avatar icon={<UserOutlined />} size={80} />
                  </div>
                )}
              </div>
              <div>
                <p className="text profile">프로필 사진을 업로드 해주세요</p>
              </div>
              <div className="input-box">
                <label htmlFor="email">이메일</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    onChange={onChangeUpdateState}
                    name="email"
                    placeholder="example@example.com"
                    required
                    value={email || ''}
                  />
                  <button type="button" onClick={emailValidate}>
                    전송
                  </button>
                </div>
                <p className="text">이메일 인증을 해주세요</p>
              </div>
              {isClicked && (
                <>
                  <div className="input-box">
                    <p>인증번호</p>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <button
                        className="verifybtn"
                        type="button"
                        onClick={emailVerify}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="input-box">
                <label htmlFor="nickname">닉네임</label>
                <div className="input-wrapper">
                  <input
                    className="inputlong"
                    type="text"
                    onChange={onChangeUpdateState}
                    name="nickname"
                    placeholder="nickname"
                    value={nickname || ''}
                  />
                  <button type="button" onClick={nicknameValidate}>
                    중복확인
                  </button>
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  onChange={onChangeUpdateState}
                  placeholder="password"
                  name="password"
                  value={password || ''}
                />
              </div>
              <div className="input-box">
                <label htmlFor="repassword">비밀번호 확인</label>
                <input
                  type="password"
                  onChange={onChangeUpdateState}
                  placeholder="confirm password"
                  name="repassword"
                  value={repassword || ''}
                />
              </div>
              <button type="submit" className="signup-btn">
                회원가입
              </button>
            </form>
            <div className="login-path">
              <Link to="/login">로그인 하러가기</Link>
            </div>
          </div>
          <aside className="signup-aside">
            <img src="/others/signup.jpg" />
          </aside>
        </div>
      </section>
    </>
  );
};

export default Signup;
