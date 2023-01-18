/* eslint-disable quotes */
import { axiosPrivate } from "../common/axiosPrivate";

const ChuHangApi = {
    getAll: (data) => {
        const url = '/DanhMucChuHangUser/GetChuHangUserByMaDangNhap';
        return axiosPrivate.post(url, data);
    },
};

export default ChuHangApi;
