import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socialLogIn } from '../reducers/api/userAPI';

const Temp = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchSocialLogin = async () => {
      try {
        await dispatch(socialLogIn()).unwrap();
      } catch (err) {
        throw err;
      }
      history.push('/keyboards');
    };
    dispatchSocialLogin();
  }, []);

  return <></>;
};

export default Temp;
