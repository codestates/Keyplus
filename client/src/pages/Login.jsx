import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../reducers/api/userAPI';
import { isError } from '../reducers/errorReducer';
import './styles/Login.scss';
import { Link } from 'react-router-dom';

const Login = (props) => {
  // const { data, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [errMessage, setErrMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });
  //TODO: state 업데이트
  const onChangeLoginState = (e) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };
  console.log(`로그인 인풋밸류`, loginState);

  const { email, password } = loginState;

  //TODO: email 형식 검사 함수 -> 불리언 반환
  const isEmail = (email) => {
    const reg = /^\S+@\S+\.\S+$/;
    return reg.test(email);
  };

  //TODO: click handler
  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      //인풋이 모두 채워지지 않았을 땐 dispatch하지 않는다.
      if (!(email !== '' && password !== '')) {
        setErrMessage('모든 칸을 입력해주세요');
      }
      //이메일 형식 검사 -> false 나오면 에러메세지 던짐
      else if (!isEmail(email)) {
        setEmailError('이메일 형식이 잘못됐습니다');
      }
      //위 두 케이스가 모두 통과되면 dispatch
      else {
        await dispatch(logIn(loginState)).unwrap();
        //성공적으로 로그인 되면 리디렉션
        props.history.push('/keyboards');
      }
    } catch (err) {
      setErrMessage('잘못된 이메일이나 비밀번호 입니다');
      dispatch(isError(err.response));
    }
  };

  //오어스 로그인
  const onClickGoogle = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const onClickKakao = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
  };

  const onClickNaver = async () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/naver`;
  };

  return (
    <>
      <section className="login-container">
        <div className="login-flexbox">
          <aside className="login-aside">
            <img src="login.jpg" />
          </aside>

          <div className="login-main">
            <h2 className="title">Login</h2>

            <form className="login-form" onSubmit={onClickLogin}>
              <div className="inputbox">
                <label htmlFor="email">이메일</label>
                <input
                  type="text"
                  placeholder="example@example.com"
                  onChange={onChangeLoginState}
                  name="email"
                  required
                  value={loginState.email}
                />
                <div style={{ color: 'red', fontSize: '12px' }}>
                  {emailError}
                </div>
              </div>

              <div className="inputbox">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  placeholder="password"
                  onChange={onChangeLoginState}
                  name="password"
                  required
                  value={loginState.password}
                />
              </div>
              <div style={{ color: 'red', fontSize: '12px' }}>{errMessage}</div>
              <button type="submit" className="loginbtn">
                로그인
              </button>
            </form>

            <div className="login-oauth">
              <button
                className="oauthbtn"
                style={{
                  backgroundImage: `url(${'google.png'})`,
                }}
                onClick={onClickGoogle}
              ></button>
              <button
                className="oauthbtn"
                style={{
                  backgroundImage: `url(${'kakao.png'})`,
                }}
                onClick={onClickKakao}
              ></button>
              <button
                className="oauthbtn"
                style={{
                  backgroundImage: `url(${'naver.png'})`,
                }}
                onClick={onClickNaver}
              ></button>
            </div>

            <div className="signup-path">
              <Link to="/signup">회원가입 하러가기</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
