import { createAction, createReducer } from '@reduxjs/toolkit';
export const isError = createAction('error/isError');
export const isNotError = createAction('error/isNotError');
const initialState = null;
const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(isError, (state, action) => {
      state = action.payload;
      return state;
    })
    .addCase(isNotError, (state) => {
      state = null;
      return state;
    })
    .addDefaultCase((state) => {
      return state;
    });
});

export default errorReducer;
