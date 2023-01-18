import { axiosPrivate } from '../common/axiosPrivate';

const OrderASNApi = {
  // ? lấy tất cả kế hoạch nhập kho
  getAll: (data) => {
    const url = '/XuatNhapKhau/GetListKeHoachNhapKho';
    return axiosPrivate.post(url, data);
  },
  // ? lấy chi tiết kế hoạch nhập kho
  getDetail: (data) => {
    const url = '/XuatNhapKhau/GetListChiTietHangNhap';
    return axiosPrivate.post(url, data);
  },
  getAllRefund: (data) => {
    const url = '/XuatNhapKhau/GetListKeHoachNhapKho';
    return axiosPrivate.post(url, data);
  },
  getAllManage: (data) => {
    const url = '/XuatNhapKhau/GetListQuanLyNhapKho';
    return axiosPrivate.post(url, data);
  },
};
export default OrderASNApi;
