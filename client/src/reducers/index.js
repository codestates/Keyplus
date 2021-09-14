import { combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage에 저장

import userReducer from './userSlice';
import likesReducer from './likesSlice';
import reviewsReducer from './reviewsSlice';
import loadingReducer from './loadingReducer';
// import keyboardsReducer  from './keyboard';

const persistConfig = {
  key: 'root',
  // localStorage에 저장
  storage,
  // 여러 가지 reducer 중에 userSlice만 local storage에 저장
  // whitelist: ['userSlice'],
  // blacklist -> 그것만 제외합니다
};

export const reducer = persistReducer(
  persistConfig,
  combineReducers({
    loading: loadingReducer,
    user: userReducer,
    likes: likesReducer,
    reviews: reviewsReducer,
    // keyboards: keyboardReducer,
  })
);
