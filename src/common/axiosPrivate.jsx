import axios from 'axios';
import memoizedRefreshToken from './refreshToken';

axios.defaults.baseURL = 'http://api-stg.nandhlogistics.vn:2530/api';
axios.defaults.headers = {
  'Content-Type': 'application/json',
};

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const accessToken = await memoizedRefreshToken();

      if (accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${accessToken}`,
        };
      }
      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
