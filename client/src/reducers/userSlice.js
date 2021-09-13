import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  logIn,
  logOut,
  signUp,
  updateUserInfo,
} from './api/userAPI';

// 회원가입, 로그인, 로그아웃, 유저정보조회(로그인하면 받아오기 때문에 필요 없다), 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버)
// 컴포넌트단에서 하기 -> 이메일 중복(유효성) 검사, 닉네임 중복 검사

const initialState = {
  data: null,
  // {
  //   id: 0,
  //   email: '',
  //   nickname: '',
  //   socialType: '',
  //   isAdmin: false,
  //   image: '',
  // },
  loading: false,
  error: null,
};

const isPendingAction = (prefix) => (action) =>
  action.type.startsWith(prefix) && action.type.endsWith('/pending');
const isRejectedAction = (prefix) => (action) =>
  action.type.startsWith(prefix) && action.type.endsWith('/rejected');

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addMatcher(isPendingAction('user/'), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction('user/'), (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addDefaultCase(() => {});
  },
});

export default userSlice.reducer;
