import { createSlice } from '@reduxjs/toolkit';
import {
  getReviews,
  addReviews,
  updateReviews,
  deleteReviews,
} from './api/reviewsAPI';

const initialState = [];

// const isPendingAction = (prefix) => (action) =>
//   action.type.startsWith(prefix) && action.type.endsWith('/pending');
// const isRejectedAction = (prefix) => (action) =>
//   action.type.startsWith(prefix) && action.type.endsWith('/rejected');

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
        if (action.payload) {
          state.push(action.payload);
        }
      })
      .addCase(updateReviews.fulfilled, (state, action) => {
        //인덱스를 찾아서 덮어씌운다
        const idx = state.findIndex((cur) => cur.id === action.payload.id);
        state[idx] = action.payload;
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
