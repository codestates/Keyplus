import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/api/userAPI';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import './styles/Login.scss';

const Login = (props) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(logIn(data)).unwrap();
      message.success('로그인을 완료했습니다');
      props.history.push('/keyboards');
    } catch (err) {
      message.warning('올바르지 않은 이메일 또는 비밀번호 입니다.');
    }
    reset();
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
          <figure className="login-aside">
            <img src="/others/login.jpg" />
          </figure>
          <div className="login-main">
            <h2 className="title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="inputbox">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: '올바르지 않은 이메일 형식입니다.',
                    },
                  })}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
              <div className="inputbox">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  {...register('password', {
                    required: '비밀번호를 입력해주세요.',
                    minLength: {
                      value: 6,
                      message: '비밀번호는 최소 6자 이상입니다.',
                    },
                  })}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
              <button type="submit" className="loginbtn">
                로그인
              </button>
            </form>

            <div className="login-oauth">
              <button
                className="oauthbtn"
                style={{
                  backgroundImage: `url(${'/others/google.png'})`,
                }}
                onClick={onClickGoogle}
              ></button>
              <button
                className="oauthbtn"
                style={{
                  backgroundImage: `url(${'/others/kakao.png'})`,
                }}
                onClick={onClickKakao}
              ></button>
              <button
                className="oauthbtn"
                style={{
                  backgroundImage: `url(${'/others/naver.png'})`,
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
