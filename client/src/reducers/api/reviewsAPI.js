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
      return rejectWithValue(err);
    }
  }
);

//TODO: 공부 후 작성
export const addReviews = createAsyncThunk(
  'reviews/addReviews',
  async ({ formData, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/reviews/${data.keyboardId}`,
        formData
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//TODO: 공부 후 작성
export const updateReviews = createAsyncThunk(
  'reviews/updateReviews',
  async ({ formData, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/reviews/${data.keyboardId}`,
        formData
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteReviews = createAsyncThunk(
  'reviews/deleteReviews',
  async ({ history, keyboardId, reviewId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/reviews/${keyboardId}`);
      history.replace(`/keyboards`);
      return reviewId;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
