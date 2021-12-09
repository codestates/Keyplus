import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    isLoading(state) {
      state = true;
      return state;
    },
    isNotLoading(state) {
      state = false;
      return state;
    },
  },
});

export const { isLoading, isNotLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
