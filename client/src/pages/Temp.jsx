import React, { useEffect } from 'react';
import cookies from 'js-cookies';

const Temp = ({ history }) => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const accessToken = params.accessToken;
    console.log(accessToken);
    //  axios
    //   .get(`${process.env.REACT_APP_API_URL}/users`, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then((res) => {
    //     localStorage.setItem('accessToken', accessToken);
    //     dispatch(setLoginModal(false));
    //     dispatch(setIsLogin(true));
    //     dispatch(setUserinfo(res.data.user));
    //   });
    history.push('/keyboards');
  }, []);
  return <></>;
};

export default Temp;
