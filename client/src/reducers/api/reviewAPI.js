import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMyReviews = createAsyncThunk(
  'review/getMyReviews',
  async () => {
    try {
      await axios.get('/reviews');
    } catch (err) {
      console.log(err);
    }
  }
);
