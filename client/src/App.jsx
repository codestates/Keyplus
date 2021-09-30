import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
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
import Temp from './pages/Temp';
import ReviewCreate from './pages/ReviewCreate';
import Spinner from './components/Spinner';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import './App.less';

function App() {
  const loading = useSelector((state) => state.loading);

  useEffect(async () => {
    AOS.init();
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
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
            path="/survey"
            component={Survey}
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
