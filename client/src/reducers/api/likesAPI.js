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

export const addLikes = createAsyncThunk('likes/addLikes', async (data) => {
  try {
    const likedKeyboard = await axios.post(`/likes/${data}`);
    return likedKeyboard.data.data;
  } catch (err) {
    console.log(err);
  }
});

export const deleteLikes = createAsyncThunk(
  'likes/deleteLikes',
  async (data) => {
    try {
      await axios.delete(`/likes/${data}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
