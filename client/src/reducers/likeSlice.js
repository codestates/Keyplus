import { createSlice } from '@reduxjs/toolkit';
import { getMyLikes, logOutMyLikes } from './api/likeAPI';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const isPendingAction = (action) => action.type.endsWith('/pending');
const isRejectedAction = (action) => action.type.endsWith('/rejected');

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logOutMyLikes, (state) => {
        state.data = [];
      })
      .addCase(getMyLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addDefaultCase(() => {});
  },
});

export default likeSlice.reducer;
