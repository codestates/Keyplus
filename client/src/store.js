import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from 'redux-logger';

import { reducer } from './reducers/index';

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  // devTools: process.env.NODE_ENV !== 'production',
});
