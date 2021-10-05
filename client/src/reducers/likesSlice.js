import { createSlice } from '@reduxjs/toolkit';
import { getLikes, addLikes, deleteLikes } from './api/likesAPI';
const initialState = [];

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
      .addCase(getLikes.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(addLikes.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        }
      })
      .addCase(deleteLikes.fulfilled, (state, action) => {
        state = state.filter((cur) => cur.id !== action.payload);
        return state;
      })

      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { logOutMyLikes } = likesSlice.actions;
export default likesSlice.reducer;
