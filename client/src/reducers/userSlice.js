import { createSlice } from '@reduxjs/toolkit';

// 회원가입, 로그인, 로그아웃,

const initialState = {
  data: {
    id: 0,
    email: '',
    nickname: '',
    socialType: '',
    isAdmin: false,
    image: '',
  },
  loading: false,
  error: false,
};

const handleLoading =
  (action,
  (state) => {
    state.loading = action.type.endsWith('/pending'); // or smth similar
  });

const handleError =
  (action,
  (state) => {
    state.error = action.type.endsWith('/rejected'); // or smth similar
    state.loading = false;
  });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addMatcher(handleLoading)
      .addMatcher(handleError);
  },
  // 로그인
  // 로그아웃
  // 회원가입
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
