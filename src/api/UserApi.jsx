import { axiosPrivate } from '../common/axiosPrivate';

const UserApi = {
  login: (data) => {
    const url = '/Users/loginTKS';
    return axiosPrivate.post(url, data);
  },
};
export default UserApi;
