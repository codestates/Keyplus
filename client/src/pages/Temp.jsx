import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socialLogIn } from '../reducers/api/userAPI';

const Temp = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      await dispatch(socialLogIn()).unwrap();
    } catch (err) {
      throw err;
    }
    history.push('/keyboards');
  }, []);
  return <></>;
};

export default Temp;
