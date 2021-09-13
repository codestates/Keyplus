import { createSlice } from '@reduxjs/toolkit';
import { getMyLikes } from './api/likeAPI';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const isPendingAction = (prefix) => (action) =>
  action.type.startsWith(prefix) && action.type.endsWith('/pending');
const isRejectedAction = (prefix) => (action) =>
  action.type.startsWith(prefix) && action.type.endsWith('/rejected');

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    logOutMyLikes(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addMatcher(isPendingAction('like/'), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction('like/'), (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addDefaultCase(() => {});
  },
});

export const { logOutMyLikes } = likeSlice.actions;
export default likeSlice.reducer;
