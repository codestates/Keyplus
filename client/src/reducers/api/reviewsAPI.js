import { createAsyncThunk } from '@reduxjs/toolkit';
import { logOutForce } from '../userSlice';
import { logOutMyLikes } from '../likesSlice';
import { logOutMyReviews } from '../reviewsSlice';
import { setExpireDate } from '../expireDateReducer';
import axios from '../../utils/customAxios';
import exceptionAxios from 'axios';

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const reviews = await exceptionAxios.get('/reviews');
      return reviews.data.data;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);

export const addReviews = createAsyncThunk(
  'reviews/addReviews',
  async ({ formData, data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/reviews/${data.keyboardId}`,
        formData
      );
      return response.data.data;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);

export const updateReviews = createAsyncThunk(
  'reviews/updateReviews',
  async ({ formData, data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/reviews/${data.keyboardId}`,
        formData
      );
      return response.data.data;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);

export const deleteReviews = createAsyncThunk(
  'reviews/deleteReviews',
  async ({ history, keyboardId, reviewId }, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/reviews/${keyboardId}`);
      history.replace(`/keyboards`);
      return reviewId;
    } catch (err) {
      dispatch(logOutForce());
      dispatch(logOutMyLikes());
      dispatch(logOutMyReviews());
      dispatch(setExpireDate(null));
      return rejectWithValue(err);
    }
  }
);
