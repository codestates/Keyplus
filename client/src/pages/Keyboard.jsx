import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, logIn, logOut, signUp } from '../reducers/api/userAPI';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';

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
        email: 'kimcoding333@github.com',
        password: 'test',
        nickname: '김코딩3333',
      })
    );
  };
  const onclickLogInBtn = () => {
    dispatch(
      logIn({
        email: 'kimcoding333@github.com',
        password: 'test',
      })
    );
  };
  const onclickLogOutBtn = () => {
    dispatch(logOut());
  };

  const onclickDeleteUserBtn = () => {
    dispatch(deleteUser());
  };

  const onclickAddLike = () => {
    dispatch(addLikes(10));
  };

  const onclickDeleteLike = () => {
    dispatch(deleteLikes(10));
  };

  return (
    <>
      <button onClick={onclickSignUpBtn}>회원가입 버튼</button>
      <button onClick={onclickLogInBtn}>로그인 버튼</button>
      <button onClick={onclickLogOutBtn}>로그아웃 버튼</button>
      <button onClick={onclickDeleteUserBtn}>회원탈퇴 버튼</button>

      <button onClick={onclickAddLike}>좋아요 추가</button>
      <button onClick={onclickDeleteLike}>좋아요 삭제</button>
    </>
  );
};

export default Keyboard;
