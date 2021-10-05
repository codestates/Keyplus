import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  logIn,
  logOut,
  signUp,
  socialLogIn,
  updateUserInfo,
  fakeLogIn,
} from './api/userAPI';
const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutForce(state) {
      state = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, () => {})
      .addCase(logIn.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(fakeLogIn.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(socialLogIn.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(logOut.fulfilled, (state) => {
        state = null;
        return state;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state = null;
        return state;
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { logOutForce } = userSlice.actions;
export default userSlice.reducer;
