import { axiosPrivate } from '../common/axiosPrivate';


const TonKhoApi = {
    getHistoryTable: (data) => {
        const url = '/XuatNhapKhau/GetListLichSuDieuChinhTon';
        return axiosPrivate.post(url, data);
    },
    getXuatNhapTon: (data) => {
        const url = '/XuatNhapKhau/GetListXuatNhapTonKho';
        return axiosPrivate.post(url, data);
    },
    getTonKhoHienTai: (data) => {
        const url = '/XuatNhapKhau/GetListTonKhoHienTai';
        return axiosPrivate.post(url, data);
    },
};
export default TonKhoApi;
