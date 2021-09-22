import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

import AppLayout from './components/AppLayout';
import Keyboard from './pages/Keyboard';
import KeyboardDetail from './pages/KeyboardDetail';
import Landing from './pages/Landing';
import Survey from './pages/Survey';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import Temp from './pages/Temp';
import ReviewCreate from './pages/ReviewCreate';
import Spinner from './components/Spinner';
import PrivateRoute from './utils/PrivateRoute';
// import PublicRoute from './utils/PublicRoute';

import './App.less';

function App() {
  const loading = useSelector((state) => state.loading);

  return (
    <>
      <AppLayout>
        <Switch>
          <>
            {loading && <Spinner />}
            {/* <Redirect exact path="/" to="keyboard" /> */}
            <Route path="/landing" component={Landing} />
            <Route path="/temp" component={Temp} />
            <Route exact path="/keyboards" component={Keyboard} />
            <Route path="/keyboards/:id" component={KeyboardDetail} />
            <Route path="/survey" component={Survey} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/mypage" component={Mypage} exact />
            <Route path="/review/:id" component={ReviewCreate} />
          </>
        </Switch>
      </AppLayout>
    </>
  );
}

export default App;
