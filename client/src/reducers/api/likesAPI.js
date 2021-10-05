import { createAsyncThunk } from '@reduxjs/toolkit';
import { logOutForce } from '../userSlice';
import { logOutMyLikes } from '../likesSlice';
import { logOutMyReviews } from '../reviewsSlice';
import { setExpireDate } from '../expireDateReducer';
import exceptionAxios from 'axios';

export const getLikes = createAsyncThunk(
  'likes/getLikes',
  async (_, { rejectWithValue }) => {
    try {
      const likes = await exceptionAxios.get('/likes');
      return likes.data.data;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);

export const addLikes = createAsyncThunk('likes/addLikes', async (data) => {
  const likedKeyboard = await exceptionAxios.post(`/likes/${data}`);
  return likedKeyboard.data.data;
});

export const deleteLikes = createAsyncThunk(
  'likes/deleteLikes',
  async (data) => {
    await exceptionAxios.delete(`/likes/${data}`);
    return data;
  }
);
