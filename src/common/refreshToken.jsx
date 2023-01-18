import Cookies from 'universal-cookie';
import mem from 'mem';
import { axiosPrivate } from './axiosPrivate';

const refreshTokenFn = async () => {
  const cookies = new Cookies();
  const refreshtoken = localStorage.getItem('refreshToken');
  try {
    const response = await axiosPrivate.post('/Users/refresh_token', {
      userId: cookies.get('userId'),
      refreshToken: refreshtoken,
    });
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshtoken);
    return response.accessToken;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

const maxAge = 10000;

const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
export default memoizedRefreshToken;
