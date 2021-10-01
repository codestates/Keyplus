import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollToTop from './utils/ScrollToTop';

import store from './store';

import App from './App';
import './assets/fonts/font.css';
import './styles/_reset.scss';

import axiosConfig from './utils/axiosConfig';
axiosConfig();

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
