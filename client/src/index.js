import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

// import store from './store';
import axiosInterceptor from './api/axiosInterceptor';
import App from './App';
import LoadingIndicator from './components/LoadingIndicator';
// import './styles/constants.scss';
// import './styles/mixins.scss';
import './styles/reset.scss';

// const persistor = persistStore(store);
axiosInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* <LoadingIndicator isLoading={true} /> */}
      <App />
      {/* </PersistGate> */}
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
