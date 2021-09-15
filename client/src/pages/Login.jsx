import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  logIn,
  googleLogIn,
  kakaoLogIn,
  naverLogIn,
} from '../reducers/api/userAPI';
import { isError } from '../reducers/errorReducer';
import './Login.scss';

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
  const onClickLogin = async () => {
    try {
      //인풋이 모두 채워지지 않았을 땐 dispatch하지 않는다.
      if (!(email !== '' && password !== '')) {
        setErrMessage('모든 칸을 입력해주세요');
      }
      //이메일 형식 검사 -> false 나오면 에러메세지 던짐
      else if (!isEmail(email)) {
        setEmailError('이메일 형식이 잘못됬습니다');
      }
      //위 두 케이스가 모두 통과되면 dispatch
      else {
        await dispatch(logIn(loginState)).unwrap();
        //성공적으로 로그인 되면 리디렉션
        props.history.push('/keyboards');
      }
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  //오어스 로그인
  const onClickGoogle = async () => {
    try {
      await dispatch(
        googleLogIn({
          //TODO: auth 코드
        })
      );
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onClickKakao = async () => {
    try {
      await dispatch(
        kakaoLogIn({
          //TODO: auth 코드
        })
      );
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onClickNaver = async () => {
    try {
      await dispatch(
        naverLogIn({
          //TODO: auth 코드
        })
      );
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  /*
  1. 이메일 인풋 
  2. 패스워드 인풋
  3. 오어스 버튼 세개 
  4. 회원가입 버튼 클릭 시 api 요청
  */

  /*
  signup
  1. 이메일 인풋과 이메일 확인 버튼 
  2. 이메일 확인 버튼 누르면 api가 쏴져야한다. 
  3. 이메일 형식에 맞지 않은 경우 경고 메세지를 보여준다.
  4. 이메일 형식에 맞는 경우, 이메일 확인 버튼 누르면 api가 쏴져야한다. 
  5. 그러면서 이
  */

  return (
    <>
      <section className="container">
        <h2>Login</h2>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          placeholder="examle@example.com"
          onChange={onChangeLoginState}
          name="email"
          required
          value={loginState.email}
        />
        <div style={{ color: 'red', fontSize: '12px' }}>{emailError}</div>

        <label htmlFor="password">패스워드</label>
        <input
          type="password"
          placeholder="******"
          onChange={onChangeLoginState}
          name="password"
          required
          value={loginState.password}
        />

        <div className="oauth">
          <button onClick={onClickGoogle}>Google</button>
          <button onClick={onClickKakao}>Kakaotalk</button>
          <button onClick={onClickNaver}>Naver</button>
        </div>

        <div style={{ color: 'red', fontSize: '12px' }}>{errMessage}</div>
        <button onClick={onClickLogin}>로그인</button>
        {/* {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {data && <h1>{data.nickname}</h1>} */}
      </section>
    </>
  );
};

export default Login;
