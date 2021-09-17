import exceptionAxios from 'axios';
import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (_, { rejectWithValue }) => {
    try {
      const reviews = await exceptionAxios.get('/reviews');
      return reviews.data.data;
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
export const addReviews = createAsyncThunk(
  'reviews/addReviews',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      await axios.post(`/reviews/${data.keyboardId}`, data);
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
      await axios.patch(`/reviews/${data.keyboardId}`);
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
