import exceptionAxios from 'axios';
import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getReviews = createAsyncThunk('reviews/getReviews', async () => {
  try {
    await exceptionAxios.get('/reviews');
  } catch (err) {
    console.log(err);
  }
});

//TODO: 공부 후 작성
export const addReviews = createAsyncThunk(
  'reviews/addReviews',
  async (data) => {
    try {
      await axios.post(`/reviews/${data}`);
    } catch (err) {
      console.log(err);
    }
  }
);

//TODO: 공부 후 작성
export const updateReviews = createAsyncThunk(
  'reviews/updateReviews',
  async (data) => {
    try {
      await axios.patch(`/reviews/${data}`);
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteReviews = createAsyncThunk(
  'reviews/deleteReviews',
  async (data) => {
    try {
      await axios.delete(`/reviews/${data}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
