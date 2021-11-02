import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage에 저장
import userReducer from './userSlice';
import likesReducer from './likesSlice';
import reviewsReducer from './reviewsSlice';
import loadingReducer from './loadingSlice';
import errorReducer from './errorSlice';
import expireDateReducer from './expireDateReducer';

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    loading: loadingReducer,
    error: errorReducer,
    user: userReducer,
    likes: likesReducer,
    reviews: reviewsReducer,
    expireDate: expireDateReducer,
  })
);
