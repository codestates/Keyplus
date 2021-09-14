import exceptionAxios from 'axios';
import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async ({ rejectWithValue }) => {
    try {
      await exceptionAxios.get('/reviews');
    } catch (err) {
      console.log(err.response.data);
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

//TODO: 공부 후 작성
export const addReviews = createAsyncThunk(
  'reviews/addReviews',
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(`/reviews/${data}`);
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

//TODO: 공부 후 작성
export const updateReviews = createAsyncThunk(
  'reviews/updateReviews',
  async (data, { rejectWithValue }) => {
    try {
      await axios.patch(`/reviews/${data}`);
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteReviews = createAsyncThunk(
  'reviews/deleteReviews',
  async (data, { rejectWithValue }) => {
    try {
      await axios.delete(`/reviews/${data}`);
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
