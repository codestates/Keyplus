import { createSlice } from '@reduxjs/toolkit';
import { getMyLikes } from './api/likesAPI';

const initialState = [];

// const isPendingAction = (prefix) => (action) =>
//   action.type.startsWith(prefix) && action.type.endsWith('/pending');
// const isRejectedAction = (prefix) => (action) =>
//   action.type.startsWith(prefix) && action.type.endsWith('/rejected');

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    logOutMyLikes(state) {
      state = [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyLikes.fulfilled, (state, action) => {
        // state.loading = false;
        state = action.payload;
        return state;
      })
      // .addMatcher(isPendingAction('like/'), (state) => {
      //   state.loading = true;
      // })
      // .addMatcher(isRejectedAction('like/'), (state, action) => {
      //   state.loading = false;
      //   state.error = action.error;
      // })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { logOutMyLikes } = likesSlice.actions;
export default likesSlice.reducer;
