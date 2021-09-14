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
      const res = await axios.delete(`/likes/${data}`, {
        withCredentials: true,
      });
      console.log('여기ㅣㅣㅣㅣㅣㅣㅣㅣㅣ ', res.data.message);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
