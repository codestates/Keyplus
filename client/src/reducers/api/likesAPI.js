import { createAsyncThunk } from '@reduxjs/toolkit';

import { logOutForce } from '../userSlice';
import { logOutMyLikes } from '../likesSlice';
import { logOutMyReviews } from '../reviewsSlice';
import { setExpireDate } from '../expireDateReducer';

import axios from '../../utils/customAxios';
import exceptionAxios from 'axios';

import { message } from 'antd';

export const getLikes = createAsyncThunk(
  'likes/getLikes',
  async (_, { rejectWithValue }) => {
    try {
      const likes = await exceptionAxios.get('/likes');
      return likes.data.data;
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

export const addLikes = createAsyncThunk(
  'likes/addLikes',
  async (data, { rejectWithValue }) => {
    try {
      const likedKeyboard = await exceptionAxios.post(`/likes/${data}`);
      return likedKeyboard.data.data;
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

export const deleteLikes = createAsyncThunk(
  'likes/deleteLikes',
  async (data, { rejectWithValue }) => {
    try {
      await exceptionAxios.delete(`/likes/${data}`);
      return data;
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
