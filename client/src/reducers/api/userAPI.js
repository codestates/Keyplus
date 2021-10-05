import { createAsyncThunk } from '@reduxjs/toolkit';
import { logOutMyLikes } from '../likesSlice';
import { logOutMyReviews } from '../reviewsSlice';
import { setExpireDate } from '../expireDateReducer';
import { getLikes } from './likesAPI';
import { getReviews } from './reviewsAPI';
import axios from '../../utils/customAxios';
import exceptionAxios from 'axios';

export const logIn = createAsyncThunk(
  'user/logIn',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.post('/auth/login', data);
      await Promise.all([
        dispatch(getLikes()).unwrap(),
        dispatch(getReviews()).unwrap(),
      ]);
      dispatch(setExpireDate(Date.now()));
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fakeLogIn = createAsyncThunk(
  'user/fakeLogIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user = await axios.get('/users');
      await Promise.all([
        dispatch(getLikes()).unwrap(),
        dispatch(getReviews()).unwrap(),
      ]);
      return user.data.data;
    } catch (err) {
      // dispatch(logOutForce());
      // dispatch(logOutMyLikes());
      // dispatch(logOutMyReviews());
      // dispatch(setExpireDate(null));
      // message.warning('오류가 발생하여 로그아웃됩니다.');
      return rejectWithValue(err);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ state, formData, history }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post('/auth/signup', formData);
      dispatch(logIn(state)).unwrap();
      history.replace('/keyboards');
      return state;
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
      dispatch(setExpireDate(null));
      history.replace('/');
    } catch (err) {
      // dispatch(logOutForce());
      // dispatch(logOutMyLikes());
      // dispatch(logOutMyReviews());
      // dispatch(setExpireDate(null));
      // message.warning('오류가 발생하여 로그아웃됩니다.');
      return rejectWithValue(err);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const user = await exceptionAxios.patch('/users', formData);
      return user.data.data;
    } catch (err) {
      // dispatch(logOutForce());
      // dispatch(logOutMyLikes());
      // dispatch(logOutMyReviews());
      // dispatch(setExpireDate(null));
      // message.warning('오류가 발생하여 로그아웃됩니다.');
      return rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ history }, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete('/users');
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      history.replace('/');
    } catch (err) {
      // dispatch(logOutForce());
      // dispatch(logOutMyLikes());
      // dispatch(logOutMyReviews());
      // dispatch(setExpireDate(null));
      // message.warning('오류가 발생하여 로그아웃됩니다.');
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
      dispatch(setExpireDate(Date.now()));
      return user.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const validateNickname = async (data) => {
  const response = await exceptionAxios.post('/auth/nickname', data);
  return response;
};

export const validateEmail = async (data) => {
  const response = await exceptionAxios.post('/auth/email', data);
  return response;
};
