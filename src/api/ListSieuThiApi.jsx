import { axiosPrivate } from '../common/axiosPrivate';

const ListSieuThiApi = {
    getAll: (data) => {
        const url = '/DanhMucSieuThi/GetListSieuThiByChuHang';
        return axiosPrivate.post(url, data);
    },
};

export default ListSieuThiApi;
