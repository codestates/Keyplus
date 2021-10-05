import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/api/userAPI';
import { EmailValidation } from '../utils/validation';
import { message } from 'antd';
import './styles/Login.scss';

const Login = (props) => {
  const dispatch = useDispatch();

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const onChangeLoginState = (e) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };
  const { email, password } = loginState;

  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      if (!(email !== '' && password !== '')) {
        message.warning('모든 칸을 입력해주세요');
      } else if (!EmailValidation(email)) {
        message.warning('이메일 형식이 잘못되었습니다');
      } else {
        await dispatch(logIn(loginState)).unwrap();
        message.success('로그인을 완료했습니다');
        props.history.push('/keyboards');
      }
    } catch (err) {
      message.warning('올바르지 않은 이메일이나 비밀번호입니다');
    }
  };

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
