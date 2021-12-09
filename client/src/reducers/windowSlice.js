import { createSlice } from '@reduxjs/toolkit';

const windowSlice = createSlice({
  name: 'window',
  initialState: { width: window.innerWidth },
  reducers: {
    handleWidthSize(state, action) {
      state.width = action.payload;
    },
  },
});

export const { handleWidthSize } = windowSlice.actions;
export default windowSlice.reducer;
