import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, signUp } from '../reducers/api/userAPI';

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

  const onclickBtn = () => {
    dispatch(
      signUp({
        email: 'kimcoding222@github.com',
        password: 'test',
        nickname: '김코딩222',
      })
    );
  };
  const onclickBtn2 = () => {
    dispatch(
      logIn({
        email: 'kimcoding222@github.com',
        password: 'test',
      })
    );
  };

  return (
    <>
      <button onClick={onclickBtn}>회원가입 버튼</button>
      <button onClick={onclickBtn2}>로그인 버튼</button>
    </>
  );
};

export default Keyboard;
