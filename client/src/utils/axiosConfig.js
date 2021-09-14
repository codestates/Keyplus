import axios from 'axios';

const axiosConfig = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export default axiosConfig;
