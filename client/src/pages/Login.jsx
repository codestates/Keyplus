import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../reducers/api/userAPI';

const Login = () => {
  const { data, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClickBtn = () => {
    dispatch(
      logIn({
        email: 'kimcoding@github.com',
        password: 'test',
      })
    );
  };

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      {data && <h1>{data.nickname}</h1>}
      <button onClick={onClickBtn}>로그인 요청 쏘세요! 클릭!</button>
    </>
  );
};

export default Login;
