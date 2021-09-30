import { createAction, createReducer } from '@reduxjs/toolkit';

export const setExpireDate = createAction('expireDate/setExpireDate');

const initialState = null;

const expireDateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setExpireDate, (state, action) => {
      state = action.payload;
      return state;
    })
    .addDefaultCase((state) => {
      return state;
    });
});

export default expireDateReducer;
