import { axiosPrivate } from '../common/axiosPrivate';

const ThongKeApi = {
  // ? get thống kê kế hoạch nhập
  getAllThongKeNhap: (data) => {
    const url = '/HeThong/GetThongKeKeHoachNhapKho';
    return axiosPrivate.post(url, data);
  },
  // ? get thống kê kế hoạch xuất
  getAllThongKeXuat: (data) => {
    const url = '/HeThong/GetThongKeKeHoachXuatKho';
    return axiosPrivate.post(url, data);
  },
  // ? get thống kê top sản phẩm
  getAllThongKeTopSanPham: (data) => {
    const url = '/HeThong/GetTopThongKeSanPham';
    return axiosPrivate.post(url, data);
  },
  getAllChiPhiVanHanh: (data) => {
    const url = '/PhiDichVuKho/GetBangKeChiPhiVanHanh';
    return axiosPrivate.post(url, data);
  },
  getExportExcel: (data) => {
    const url = '/WarehouseReport/ExportBangKeChiPhiVanHanh';
    return axiosPrivate.post(url, data);
  },
};
export default ThongKeApi;
