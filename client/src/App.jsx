import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AppLayout from './components/AppLayout';
import Keyboard from './pages/Keyboard';
import Landing from './pages/Landing';
import Survey from './pages/Survey';
import Login from './pages/Login';

function App() {
  return (
    <>
      <AppLayout>
        <Switch>
          <Redirect exact path="/" to="keyboard" />
          <Route path="/landing" component={Landing} />
          <Route path="/keyboard" component={Keyboard} />
          <Route path="/survey" component={Survey} />
          <Route path="/login" component={Login} />
        </Switch>
      </AppLayout>
    </>
  );
}

export default App;
