import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AppLayout from './components/AppLayout';
import Keyboard from './pages/Keyboard';
import KeyboardDetail from './pages/KeyboardDetail';
import Landing from './pages/Landing';
import Survey from './pages/Survey';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Inquiry from './pages/Inquiry';
import MechanicalKeyboard from './pages/MechanicalKeyboard';
import Temp from './pages/Temp';
import ReviewCreate from './pages/ReviewCreate';
import Spinner from './components/Spinner';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { logOutForce } from './reducers/userSlice';
import { logOutMyLikes } from './reducers/likesSlice';
import { logOutMyReviews } from './reducers/reviewsSlice';
import { setExpireDate } from './reducers/expireDateReducer';

import './App.less';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const expireDate = useSelector((state) => state.expireDate);

  useEffect(async () => {
    AOS.init();
    if (expireDate) {
      const currentDate = Date.now();
      if (currentDate - expireDate >= 1000 * 60 * 60 * 24 * 2) {
        dispatch(logOutForce());
        dispatch(logOutMyLikes());
        dispatch(logOutMyReviews());
        dispatch(setExpireDate(null));
      }
    }
  }, []);

  return (
    <>
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
        <PublicRoute
          restricted={false}
          path="/survey"
          component={Survey}
          exact
        />
        <AppLayout>
          {loading && <Spinner />}
          <Route path="/temp" component={Temp} />
          <PublicRoute
            restricted={false}
            path="/keyboards"
            component={Keyboard}
            exact
          />
          <PublicRoute
            restricted={false}
            path="/keyboards/:id"
            component={KeyboardDetail}
            exact
          />
          <PublicRoute
            restricted={false}
            path="/mechanical-keyboard"
            component={MechanicalKeyboard}
            exact
          />
          <PublicRoute
            restricted={true}
            path="/login"
            component={Login}
            exact
          />
          <PublicRoute
            restricted={true}
            path="/signup"
            component={Signup}
            exact
          />
          <PublicRoute
            restricted={false}
            path="/inquiry"
            component={Inquiry}
            exact
          />
          <PublicRoute restricted={false} path="/map" component={Map} exact />

          <PrivateRoute path="/mypage" component={Mypage} exact />
          <PrivateRoute path="/review/:id" component={ReviewCreate} />
        </AppLayout>
      </Switch>
    </>
  );
}

export default App;
