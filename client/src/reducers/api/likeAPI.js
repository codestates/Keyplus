import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const logOutMyLikes = createAction('like/logOutMyLikes');

export const getMyLikes = createAsyncThunk('like/getMyLikes', async () => {
  try {
    const likes = await axios.get('/likes');
    return likes.data.data;
  } catch (err) {
    console.log(err);
  }
});
