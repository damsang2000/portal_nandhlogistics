import { axiosPrivate } from '../common/axiosPrivate';

const SystemApi = {
    // ? get list nhập kho
    getSystemNhapKho: (data) => {
        const url = '/XuatNhapKhau/GetListNhapKho';
        return axiosPrivate.post(url, data);
    },
    // ? get list xuất kho
    getSystemXuatKho: (data) => {
        const url = '/XuatNhapKhau/GetListPhieuXuat';
        return axiosPrivate.post(url, data);
    },
     // ? get list nhập trong ngày
     getSystemNhapInDay: (data) => {
        const url = '/XuatNhapKhau/GetListNhapKhoTrongNgay';
        return axiosPrivate.post(url, data);
    },
    // ? get list xuất trong ngày
     getSystemXuatInDay: (data) => {
            const url = '/XuatNhapKhau/GetListPhieuXuatTrongNgay';
            return axiosPrivate.post(url, data);
        },
};
export default SystemApi;
