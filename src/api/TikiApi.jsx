import { axiosPrivate } from '../common/axiosPrivate';

const TikiApi = {
  getLink: () => {
    const url = '/Tiki/AcceptTikiUser';
    return axiosPrivate.get(url);
  },
};

export default TikiApi;
