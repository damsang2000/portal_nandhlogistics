import { axiosPrivate } from '../common/axiosPrivate';

const OrderDOApi = {
  // ? lấy tất cả kế hoạch xuất kho
  getAll: (data) => {
    const url = '/XuatNhapKhau/GetListKeHoachXuatKho';
    return axiosPrivate.post(url, data);
  },
  // ? lấy chi tiết kế hoạch xuất kho
  getDetail: (data) => {
    const url = '/XuatNhapKhau/GetListChiTietHangXuat';
    return axiosPrivate.post(url, data);
  },
  // ? lấy phiếu xuất kho đã pick xong
  getAllPickComplete: (data) => {
    const url = '/XuatNhapKhau/GetListPhieuXuatDaPickXong';
    return axiosPrivate.post(url, data);
  },
  getAllCountByMonth: (data) => {
    const url = '/XuatNhapKhau/ThongKeDonBanTheoThang';
    return axiosPrivate.post(url, data);
  },
};
export default OrderDOApi;
