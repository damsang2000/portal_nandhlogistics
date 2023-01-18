import { axiosPrivate } from '../common/axiosPrivate';

const NhaNCCApi = {
    getAll: (data) => {
        const url = '/DanhMucNhaCungCap/GetDanhMucNhaCungCap';
        return axiosPrivate.post(url, data);
    },
};

export default NhaNCCApi;
