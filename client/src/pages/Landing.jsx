import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, logIn, logOut, signUp } from '../reducers/api/userAPI';
import { addLikes, deleteLikes } from '../reducers/api/likesAPI';
import { isError } from '../reducers/errorReducer';

import './Landing.scss';

const Landing = () => {
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

  const onclickSignUpBtn = async () => {
    try {
      await dispatch(
        signUp({
          email: 'kimcoding333@github.com',
          password: 'test',
          nickname: '김코딩3333',
        })
      ).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onclickLogInBtn = async () => {
    try {
      await dispatch(
        logIn({
          email: 'kimcoding333@github.com',
          password: 'test',
        })
      ).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onclickLogOutBtn = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onclickDeleteUserBtn = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onclickAddLike = async () => {
    try {
      await dispatch(addLikes(10)).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
  };

  const onclickDeleteLike = async () => {
    try {
      await dispatch(deleteLikes(10)).unwrap();
    } catch (err) {
      dispatch(isError(err.response));
    }
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
  // return (
  //   <>
  //     <video autoPlay muted loop className="video">
  //       <source
  //         src={`${process.env.REACT_APP_IMAGE_URL}/keyboard/main.mp4`}
  //         type="video/mp4"
  //       />
  //     </video>
  //   </>
  // );
};

export default Landing;
