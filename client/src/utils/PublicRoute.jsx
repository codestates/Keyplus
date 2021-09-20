import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const userState = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/landing" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
