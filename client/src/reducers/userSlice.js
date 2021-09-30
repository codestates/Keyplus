import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  logIn,
  logOut,
  signUp,
  socialLogIn,
  updateUserInfo,
  validateNickname,
  validateEmail,
} from './api/userAPI';

// 회원가입, 로그인, 로그아웃, 유저정보조회(로그인하면 받아오기 때문에 필요 없다), 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버)
// 컴포넌트단에서 하기 -> 이메일 중복(유효성) 검사, 닉네임 중복 검사

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
      // .addCase(validateNickname.fulfilled, (state, action) => {
      //   state = action.payload;
      //   console.log('내가 스테이트', state);
      //   return state;
      // })
      // .addCase(validateEmail.fulfilled, (state, action) => {
      //   state = action.payload;
      //   console.log('내가 스테이트', state);
      //   return state;
      // })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { logOutForce } = userSlice.actions;
export default userSlice.reducer;
