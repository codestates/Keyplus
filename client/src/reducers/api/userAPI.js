import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLikes } from './likesAPI';
import { getReviews } from './reviewsAPI';
import { logOutMyLikes } from '../likesSlice';
import { logOutMyReviews } from '../reviewsSlice';
import exceptionAxios from 'axios';

// 회원가입, 로그인, 로그아웃, 유저정보조회, 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버)

export const signUp = createAsyncThunk(
  'user/signUp',
  async (data, { rejectWithValue }) => {
    try {
      await axios.post('/auth/signup', data);
    } catch (err) {
      return rejectWithValue(err);
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
      return rejectWithValue(err);
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (history, { dispatch, rejectWithValue }) => {
    try {
      await axios.post('/auth/logout');
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      history.replace('/landing');
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (data, { rejectWithValue }) => {
    console.log('나 무슨데이터야?', data);
    try {
      const user = await exceptionAxios.patch('/users', data);
      console.log('여기는 응답 받아온거~', user);
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ history }, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete('/users');
      //unwrap 안하는 이유는 동기 액션이기 때문에 딱히 에러날 일이 없다.
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      history.replace('/landing');
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const socialLogIn = createAsyncThunk(
  'user/socialLogIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.get('/users');
      await Promise.all([
        dispatch(getLikes()).unwrap(),
        dispatch(getReviews()).unwrap(),
      ]);
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const validateNickname = createAsyncThunk(
  '/user/validateNickname',
  async (data, { rejectWithValue }) => {
    console.log('변경할 닉네임 받아온 거', data);
    try {
      await exceptionAxios.post('/auth/nickname', data);
      // console.log('새로운 닉네임 응답 받아온 거', nickname);
      // return nickname;
      // return nickname.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const validateEmail = createAsyncThunk(
  '/user/validateEmail',
  async (data, { rejectWithValue }) => {
    console.log('변경할 이메일 받아온 거', data);
    try {
      await axios.post('/auth/email', data);
      // console.log('새로운 이메일 응답 받아온 거', email);
      // return email.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
