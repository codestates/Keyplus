import { createSlice } from '@reduxjs/toolkit';
import { getMyReviews } from './api/reviewsAPI';

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
      .addCase(getMyReviews.fulfilled, (state, action) => {
        // state.loading = false;
        state = action.payload;
        return state;
      })
      // .addMatcher(isPendingAction('review/'), (state) => {
      //   state.loading = true;
      // })
      // .addMatcher(isRejectedAction('review/'), (state, action) => {
      //   state.loading = false;
      //   state.error = action.error;
      // })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { logOutMyReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
