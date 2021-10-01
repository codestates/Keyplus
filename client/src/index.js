import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './store';

import App from './App';
import './assets/fonts/font.css';
import './styles/_reset.scss';

import axiosConfig from './utils/axiosConfig';
axiosConfig();

const persistor = persistStore(store);

ReactDOM.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);
