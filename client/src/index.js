import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

import store from './store';

// import 'antd/dist/antd.css';

// import './index.scss';
import App from './App';

import './assets/fonts/font.css';
// // import './styles/constants.scss';
// // import './styles/mixins.scss';
import './styles/_reset.scss';

import LoadingIndicator from './components/LoadingIndicator';

import axiosConfig from './utils/axiosConfig';
axiosConfig();

// const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {/* <LoadingIndicator isLoading={true} /> */}
        <App />
        {/* </PersistGate> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
