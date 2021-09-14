import exceptionAxios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMyReviews = createAsyncThunk(
  'reviews/getMyReviews',
  async () => {
    try {
      await exceptionAxios.get('/reviews');
    } catch (err) {
      console.log(err);
    }
  }
);
