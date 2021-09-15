import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLikes } from './likesAPI';
import { getReviews } from './reviewsAPI';
import { logOutMyLikes } from '../likesSlice';
import { logOutMyReviews } from '../reviewsSlice';

// 회원가입, 로그인, 로그아웃, 유저정보조회, 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버)

export const signUp = createAsyncThunk(
  'user/signUp',
  async (data, { rejectWithValue }) => {
    try {
      await axios.post('/auth/signup', data);
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  'user/logIn',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.post('/auth/login', data);
      await Promise.all([
        dispatch(getLikes()).unwrap(),
        dispatch(getReviews()).unwrap(),
      ]);
      return user.data.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.post('/auth/logout');
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (data, { rejectWithValue }) => {
    try {
      const user = await axios.patch('/users', data);
      return user.data.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete('/users');
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogIn = createAsyncThunk(
  'user/googleLogIn',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/auth/google');
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const kakaoLogIn = createAsyncThunk(
  'user/kakaoLogin',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/auth/kakao');
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const naverLogIn = createAsyncThunk(
  'user/naverLogIn',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('/auth/naver');
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
