import axios from 'axios';

export default function axiosInterceptor() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  axios.interceptors.request.use(
    (configure) => {
      // 로딩 호출
      // setIsLoading(true);
      // dispatch({
      //   type: GLOBAL_LOADING,
      // });
      return configure;
    },
    (error) => {
      // 실패 시 로딩창 종료
      // setIsLoading(false);
      // dispatch({
      //   type: GLOBAL_LOADED,
      // });
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (configure) => {
      // 완료 시 로딩창 종료
      // setIsLoading(false);
      // dispatch({
      //   type: GLOBAL_LOADED,
      // });

      // 로그인 안 돼있을 때 처리...?
      return configure;
    },
    (error) => {
      // 실패 시 로딩창 종료
      // setIsLoading(false);
      // dispatch({
      //   type: GLOBAL_LOADED,
      // });
      return Promise.reject(error);
    }
  );
}
