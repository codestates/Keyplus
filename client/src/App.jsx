import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AppLayout from './components/AppLayout';
import Keyboard from './pages/Keyboard';
import KeyboardDetail from './pages/KeyboardDetail';
import Landing from './pages/Landing';
import Survey from './pages/Survey';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Temp from './pages/Temp';

function App() {
  const loading = useSelector((state) => state.loading);
  return (
    <>
      <AppLayout>
        <Switch>
          <>
            {loading && <h1>로딩 중입니다</h1>}
            {/* <Redirect exact path="/" to="keyboard" /> */}
            <Route path="/landing" component={Landing} />
            <Route path="/temp" component={Temp} />
            <Route exact path="/keyboards" component={Keyboard} />
            <Route path="/keyboards/:id" component={KeyboardDetail} />
            <Route path="/survey" component={Survey} />
            <Route path="/login" component={Login} />
          </>
        </Switch>
      </AppLayout>
    </>
  );
}

export default App;
