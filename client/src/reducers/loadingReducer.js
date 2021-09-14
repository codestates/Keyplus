import { createAction, createReducer } from '@reduxjs/toolkit';

export const isLoading = createAction('loading/isLoading');
export const isNotLoading = createAction('loading/isNotLoading');

const initialState = false;

const loadingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(isLoading, (state) => {
      state = true;
      return state;
    })
    .addCase(isNotLoading, (state) => {
      state = false;
      return state;
    })
    .addDefaultCase((state) => {
      return state;
    });
});

export default loadingReducer;
