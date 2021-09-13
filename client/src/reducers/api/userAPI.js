import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMyLikes } from './likeAPI';
import { getMyReviews } from './reviewAPI';
import axios from 'axios';

// 회원가입, 로그인, 로그아웃, 유저정보조회, 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버), 이메일 중복(유효성) 검사, 닉네임 중복 검사

const delay = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

export const signUp = createAsyncThunk('user/signUp', async (data) => {
  try {
    await axios.post('/auth/signup', data);
  } catch (err) {
    console.log(err);
  }
});

export const logIn = createAsyncThunk('user/logIn', async (data, thunkAPI) => {
  try {
    // const [userData, reviews, likes] = await Promise.all([
    //   axios.post('/auth/login', data),
    //   await axios.get('/reviews'),
    //   await axios.get('/likes'),
    // ]);
    // return { userData, reviews, likes };
    const user = await axios.post('/auth/login', data);
    // thunkAPI.dispatch(getMyReviews());
    thunkAPI.dispatch(getMyLikes());
    return user.data.data;
  } catch (err) {
    console.log(err);
  }
});

export const logOut = createAsyncThunk(
  'user/logOut',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const googleLogIn = createAsyncThunk(
  'user/googleLogIn',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const kakaoLogIn = createAsyncThunk(
  'user/kakaoLogin',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const naverLogIn = createAsyncThunk(
  'user/naverLogIn',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const validateEmail = createAsyncThunk(
  'user/validateEmail',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);

export const validateNickname = createAsyncThunk(
  'user/validateNickname',
  async (data, thunkAPI) => {
    // data = {email, password}
    // const response = await logInAPI.post(URL, data);
    // return response.data.data;
  }
);
