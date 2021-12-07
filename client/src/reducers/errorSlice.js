import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    isError(state, action) {
      state = action.payload;
      return state;
    },
    isNotError(state) {
      state = null;
      return state;
    },
  },
});

export const { isError, isNotError } = errorSlice.actions;
export default errorSlice.reducer;
