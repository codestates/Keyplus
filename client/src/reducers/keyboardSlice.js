//처음에 키보드정보, 유저, 리뷰, 라이크 다 들고 있는다
//사실상 서버에 요청 보내서 뭔가를 하는건 딜리트와 업데이트 아닌가요
//크리에이트
import { createSlice } from '@reduxjs/toolkit';
import { logIn } from './api/userAPI';

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {},
});

export default keyboardSlice.reducer;
