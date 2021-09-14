import exceptionAxios from 'axios';
import axios from '../../utils/customAxios';
import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

export const getMyLikes = createAsyncThunk(
  'likes/getMyLikes',
  async ({ rejectWithValue }) => {
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
      const likedKeyboard = await axios.post(`/likes/${data}`);
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
      await axios.delete(`/likes/${data}`);
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
