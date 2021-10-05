import { configureStore } from '@reduxjs/toolkit';
// import loggerMiddleware from 'redux-logger';
import { persistedReducer } from './reducers/index';

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
