import { createSlice } from '@reduxjs/toolkit';
import { getMyReviews } from './api/reviewAPI';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const isPendingAction = (prefix) => (action) =>
  action.type.startsWith(prefix) && action.type.endsWith('/pending');
const isRejectedAction = (prefix) => (action) =>
  action.type.startsWith(prefix) && action.type.endsWith('/rejected');

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    logOutMyReviews(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addMatcher(isPendingAction('review/'), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction('review/'), (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addDefaultCase(() => {});
  },
});

export const { logOutMyReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
