import exceptionAxios from 'axios';
import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMyLikes = createAsyncThunk('likes/getMyLikes', async () => {
  try {
    const likes = await exceptionAxios.get('/likes');
    return likes.data.data;
  } catch (err) {
    console.log(err);
  }
});
