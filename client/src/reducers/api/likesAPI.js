import exceptionAxios from 'axios';
import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLikes = createAsyncThunk(
  'likes/getLikes',
  async (_, { rejectWithValue }) => {
    try {
      const likes = await exceptionAxios.get('/likes');
      return likes.data.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
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
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
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
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
