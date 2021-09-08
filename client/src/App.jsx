import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Keyboard from './pages/Keyboard';
import Survey from './pages/Survey';

function App() {
  return (
    <>
      <Switch>
        <Redirect exact path="/" to="landing" />
        <Route path="/keyboard" component={Keyboard} />
        <Route path="/survey" component={Survey} />
      </Switch>
    </>
  );
}

export default App;
