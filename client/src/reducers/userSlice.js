import { createSlice } from '@reduxjs/toolkit';
import { logIn, signUp } from './api/userAPI';

// 회원가입, 로그인, 로그아웃, 유저정보조회, 회원정보변경, 회원탈퇴, 소셜로그인(구글,카카오,네이버), 이메일 중복(유효성) 검사, 닉네임 중복 검사

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

const isPendingAction = (action) => action.type.endsWith('/pending');
const isRejectedAction = (action) => action.type.endsWith('/rejected');

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

export default userSlice.reducer;
