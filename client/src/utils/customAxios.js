import axios from 'axios';
import store from '../store';
import { isLoading, isNotLoading } from '../reducers/loadingSlice';

const instance = axios.create();

instance.defaults.baseURL = process.env.REACT_APP_API_URL;
instance.defaults.withCredentials = true;
instance.defaults.headers.common['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (configure) => {
    // ! 로딩 호출
    store.dispatch(isLoading());
    return configure;
  },
  (error) => {
    // ! 실패 시 로딩창 종료
    store.dispatch(isNotLoading());
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (configure) => {
    // ! 완료 시 로딩창 종료
    store.dispatch(isNotLoading());
    return configure;
  },
  (error) => {
    // ! 실패 시 로딩창 종료
    store.dispatch(isNotLoading());
    return Promise.reject(error);
  }
);

export default instance;
