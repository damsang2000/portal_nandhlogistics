import { axiosPrivate } from '../common/axiosPrivate';

const MasterApi = {
    getSLN: (data) => {
        const url = '/XuatNhapKhau/GetListSanLuongNhap';
        return axiosPrivate.post(url, data);
    },
    getSLX: (data) => {
        const url = '/XuatNhapKhau/GetListSanLuongXuat';
        return axiosPrivate.post(url, data);
    },
};
export default MasterApi;
