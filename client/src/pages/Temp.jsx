import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socialLogIn } from '../reducers/api/userAPI';
import { isError } from '../reducers/errorReducer';

const Temp = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      await dispatch(socialLogIn()).unwrap();
    } catch (err) {
      console.log(err);
      dispatch(isError(err.response));
    }
    history.push('/keyboards');
  }, []);
  return <></>;
};

export default Temp;
