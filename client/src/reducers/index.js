import { combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage에 저장

import userReducer from './userSlice';
import likesReducer from './likesSlice';
import reviewsReducer from './reviewsSlice';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

const persistConfig = {
  key: 'root',
  // localStorage에 저장
  storage,
  // 여러 가지 reducer 중에 userSlice만 local storage에 저장
  // whitelist: ['userReducer'],
  // blacklist -> 그것만 제외합니다
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    loading: loadingReducer,
    error: errorReducer,
    user: userReducer,
    likes: likesReducer,
    reviews: reviewsReducer,
  })
);
