import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Keyboard from './pages/Keyboard';

function App() {
  return (
    <>
      <Switch>
        <Redirect exact path='/' to='landing' />
        <Route path='/keyboard' component={Keyboard} />
      </Switch>
    </>
  );
}

export default App;
