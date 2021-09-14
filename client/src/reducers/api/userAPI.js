import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMyLikes } from './likesAPI';
import { getMyReviews } from './reviewsAPI';
import { logOutMyLikes } from '../likesSlice';
import { logOutMyReviews } from '../reviewsSlice';

// 회원가입, 로그인, 로그아웃, 유저정보조회, 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버)

export const signUp = createAsyncThunk('user/signUp', async (data) => {
  try {
    await axios.post('/auth/signup', data);
  } catch (err) {
    console.log(err);
  }
});

export const logIn = createAsyncThunk(
  'user/logIn',
  async (data, { dispatch }) => {
    try {
      const user = await axios.post('/auth/login', data);
      dispatch(getMyLikes());
      // dispatch(getMyReviews());
      return user.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (_, { dispatch }) => {
    try {
      await axios.post('/auth/logout');
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
    } catch (err) {
      console.log(err);
    }
  }
);

// export const getUserInfo = createAsyncThunk(
//   'user/getUserInfo',
//   async (data, thunkAPI) => {
//       try {
//         const user = await axios.get('/users');
//       } catch (err) {
//         console.log(err);
//       }
//   }
// );

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (data) => {
    try {
      const user = await axios.patch('/users', data);
      return user.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, { dispatch }) => {
    try {
      await axios.delete('/users');
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
    } catch (err) {
      console.log(err);
    }
  }
);

export const googleLogIn = createAsyncThunk(
  'user/googleLogIn',
  async (data, thunkAPI) => {}
);

export const kakaoLogIn = createAsyncThunk(
  'user/kakaoLogin',
  async (data, thunkAPI) => {}
);

export const naverLogIn = createAsyncThunk(
  'user/naverLogIn',
  async (data, thunkAPI) => {}
);
