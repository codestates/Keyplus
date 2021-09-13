import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMyLikes } from './likeAPI';
import { getMyReviews } from './reviewAPI';
import axios from 'axios';

// 회원가입, 로그인, 로그아웃, 유저정보조회, 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버), 이메일 중복(유효성) 검사, 닉네임 중복 검사

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

export const logOut = createAsyncThunk('user/logOut', async () => {
  try {
    await axios.post('/auth/logout');
  } catch (err) {
    console.log(err);
  }
});

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

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  try {
    await axios.delete('/users');
  } catch (err) {
    console.log(err);
  }
});

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

export const validateEmail = createAsyncThunk(
  'user/validateEmail',
  async (data) => {
    try {
      const code = await axios.post('/users/email', data);
      return code.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const validateNickname = createAsyncThunk(
  'user/validateNickname',
  async (data) => {
    try {
      await axios.post('/users/nickname', data);
    } catch (err) {
      console.log(err);
    }
  }
);
