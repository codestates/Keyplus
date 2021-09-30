import React, { useState, useRef } from 'react';
import { message } from 'antd';
import { Avatar } from 'antd';
import { isError } from '../reducers/errorReducer';
import { useDispatch } from 'react-redux';
import {
  signUp,
  validateEmail,
  validateNickname,
} from '../reducers/api/userAPI';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './styles/Signup.scss';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userState, setUserState] = useState({
    email: '',
    nickname: '',
    password: '',
    repassword: '',
  });
  //FIXME: state 업데이트
  const onChangeUpdateState = (e) => {
    const { name, value } = e.target;
    setUserState({ ...userState, [name]: value });
  };
  console.log(`새로운 인풋밸류`, userState);
  const { email, nickname, password, repassword } = userState;

  //FIXME: 이메일 중복확인 함수
  //이미 사용중인 이메일입니다 v
  //올바르지 않은 이메일 형식 입니다 v
  //이메일을 확인해 주세요
  //사용 가능한 이메일 입니다 v
  const isEmail = (email) => {
    const reg =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return reg.test(email) ? true : false;
  };

  const [validEmail, setValidEmail] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

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
      //이메일 형식 regex가 false라면
      if (!isEmail(email)) {
        setValidEmail(false);
        return message.warning('올바르지 않은 이메일 형식입니다');
      } else {
        //올바른 이메일 형식이라면
        const response = await validateEmail({ email });
        console.log('🌱', response);
        setIsClicked(true);
        setCode(response.data.data.verificationCode);
      }
    } catch (err) {
      console.log(err);
      // dispatch(isError(err.response));
      setValidEmail(false);
      message.warning('이미 사용중인 이메일 입니다');
    }
  };

  //FIXME: 닉네임 중복확인 함수
  const [validNickname, setValidNickname] = useState(false);
  const nicknameValidate = async (e) => {
    e.preventDefault();
    try {
      if (nickname === '') return message.warning('닉네임을 입력해주세요');
      await validateNickname({ nickname });
      setValidNickname(true);
      message.success('사용 가능한 닉네임 입니다');
    } catch (err) {
      console.log(err.response);
      // dispatch(isError(err.response));
      setValidNickname(false);
      message.warning('사용 불가한 닉네임 입니다');
    }
  };

  //FIXME: 프로필 이미지 미리보기
  const imgref = useRef(null);
  const handleImgRef = () => {
    imgref.current.click();
  };

  const [profileImg, setProfileImg] = useState('');
  const onChangeImage = (e) => {
    //FIXME: file state 업데이트 시키기
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

  //FIXME: 패스워드 일치 함수와 정규표현식
  const passwordValidate = (password) => {
    const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return reg.test(password) ? true : false;
  };

  const isEmpty =
    email === '' || nickname === '' || password === '' || repassword === '';

  //FIXME: 회원가입 함수
  const onClickSignup = async (e) => {
    e.preventDefault();
    try {
      if (!validEmail) {
        return message.warning('이메일 중복검사를 해주세요');
      }
      if (!validNickname) {
        return message.warning('닉네임 중복검사를 해주세요');
      }
      if (isEmpty) {
        return message.warning('모든 칸을 입력해주세요');
      }
      if (password !== repassword) {
        return message.warning('패스워드를 다시 확인해주세요');
      }
      if (!passwordValidate(password)) {
        return message.warning(
          '최소 6 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자의 비밀번호가 필요합니다'
        );
      }

      const formData = new FormData();
      formData.append('img', e.target.img.files[0]); //e.target.img.files[0]
      formData.append('email', email);
      formData.append('nickname', nickname);
      formData.append('password', password);
      //여기 프로필 이미지엔 이미지 url이 담겨있음
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
      dispatch(isError(err.response));
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
                <p className="text">이메일 확인 후 인증번호를 입력해 주세요</p>
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
                    // required
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
                  // required
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
                  // required
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
            <img src="signup.jpg" />
          </aside>
        </div>
      </section>
    </>
  );
};

export default Signup;
