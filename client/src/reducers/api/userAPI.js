import { createAsyncThunk } from '@reduxjs/toolkit';

const delay = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

export const logIn = createAsyncThunk('user/logIn', async (data, thunkAPI) => {
  // data = {email, password}
  // const response = await logInAPI.post(URL, data);
  // return response.data.data;
  console.log('2초 기다리기를 시작합니다.');
  const resolvedData = await delay(data);
  // throw new Error('error다!');
  console.log('2초 기다리기를 끝냅니다.');
  console.log('data : ', resolvedData);

  return {
    id: 1,
    email: 'kimcoding@github.com',
    nickname: '김코딩',
    socialType: 'local',
    isAdmin: false,
    image: '/profile/kimcoding.jpg',
  };
});
