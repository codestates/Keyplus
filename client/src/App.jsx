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
import TypingShop from './pages/TypingShop';
import Introduction from './pages/Introduction';
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
import { fakeLogIn } from './reducers/api/userAPI';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const expireDate = useSelector((state) => state.expireDate);

  useEffect(() => {
    AOS.init();
  }, []);

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
      ///TODO: 서로 다른 기기나 브라우저에서 로그인을 해서 무언가 작업했다면, 다른 기기에서는 쿠키가 만료되지 않았어도 redux에 들고 있는 정보는 다르기 때문에 오류가 날 수밖에 없다. 해결하자!
      //! 토큰(쿠키)이 유효하다면
      else {
        //? 아이디 비밀번호 없이 쿠키에 있는 정보만으로 유저 정보 보내주는 api
        //? 리뷰, 라이크 받아오기
        try {
          await dispatch(fakeLogIn()).unwrap();
        } catch (err) {
          console.log(err);
          // dispatch(isError(err.response));
        }
      }
    }
  }, [window.location.href]);

  return (
    <>
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
        <Route
          path="/survey"
          render={(props) => <Survey {...props} key={Date.now()} />}
          exact
        />
        <PublicRoute
          restricted={false}
          path="/typing-shop"
          component={TypingShop}
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
            path="/introduction"
            component={Introduction}
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

          <PrivateRoute path="/mypage" component={Mypage} exact />
          <PrivateRoute path="/review/:id" component={ReviewCreate} />
        </AppLayout>
      </Switch>
    </>
  );
}

export default App;
