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
        state.push(action.payload);
      })
      .addCase(updateReviews.fulfilled, (state, action) => {
        //인덱스를 찾아서 덮어씌운다
        console.log('나 스테이트 ', state);
        console.log('나 페이로드 ', action.payload);
        console.log(action.payload.keyboardId);
        const idx = state.findIndex(
          (cur) => cur.keyboardId == action.payload.keyboardId
        );
        console.log('idx', idx);
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
