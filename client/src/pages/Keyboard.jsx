import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut, signUp } from '../reducers/api/userAPI';

const Keyboard = () => {
  const dispatch = useDispatch();
  // useEffect(async () => {
  //   try {
  //     const token = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/users/checkToken`
  //     );
  //     console.log(token.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const onclickSignUpBtn = () => {
    dispatch(
      signUp({
        email: 'kimcoding222@github.com',
        password: 'test',
        nickname: '김코딩222',
      })
    );
  };
  const onclickLogInBtn = () => {
    dispatch(
      logIn({
        email: 'kimcoding222@github.com',
        password: 'test',
      })
    );
  };
  const onclickLogOutBtn = () => {
    dispatch(logOut());
  };

  return (
    <>
      <button onClick={onclickSignUpBtn}>회원가입 버튼</button>
      <button onClick={onclickLogInBtn}>로그인 버튼</button>
      <button onClick={onclickLogOutBtn}>로그아웃 버튼</button>
    </>
  );
};

export default Keyboard;
