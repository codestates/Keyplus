//처음에 유저를 들고올 때 유저의 좋아요와 리뷰를 다 들고옴 --> initial state
//reviewSlice에 있는 initialState는 리뷰를 업데이트 하기 위한 리뷰인풋 null -> string
//지우면 리뷰인풋 null
//업데이트하면 null

//getreviews by keyboard id 리뷰가 키보드 아이디에 의해서 보여야함 -> 리뷰 조인 배열로

import { createSlice } from '@reduxjs/toolkit';
import {
  addReview,
  getReview,
  deleteReview,
  updateReview,
} from './api/reviewAPI';

const initialState = {
  data: {
    title: '',
    content: '',
    media: null,
  },
  loading: false,
  error: null,
};

const isPendingAction = (action) => action.type.endsWith('/pending');
const isRejectedAction = (action) => action.type.endsWith('/rejected');

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(review.fulfilled, (state, action) => {
        '/keyboards/:id';
        state.loading = false; //이행된 상태
        state.data = action.payload; //업데이트 된 것들을 스테이트에 저장
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addDefaultCase((state, action) => {});
  },
});

export default reviewSlice.reducer;
