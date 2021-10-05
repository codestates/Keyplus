import { createSlice } from '@reduxjs/toolkit';
import {
  getReviews,
  addReviews,
  updateReviews,
  deleteReviews,
} from './api/reviewsAPI';
const initialState = [];

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    logOutMyReviews(state) {
      state = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addReviews.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateReviews.fulfilled, (state, action) => {
        const idx = state.findIndex(
          (cur) => cur.keyboardId == action.payload.keyboardId
        );
        if (action.payload.image1) {
          state[idx].image1 = action.payload.image1;
        }
        if (action.payload.image2) {
          state[idx].image2 = action.payload.image2;
        }
        if (action.payload.image3) {
          state[idx].image3 = action.payload.image3;
        }
        if (action.payload.video) {
          state[idx].video = action.payload.video;
        }
        state[idx].content = action.payload.content;
        state[idx].rating = action.payload.rating;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state = state.filter((cur) => cur.id !== action.payload);
        return state;
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { logOutMyReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
