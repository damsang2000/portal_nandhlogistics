import { axiosPrivate } from '../common/axiosPrivate';

const ListItemApi = {
  getAll: (data) => {
    const url = '/DanhMucSanPham/GetDanhMucSanPhamByChuHang';
    return axiosPrivate.post(url, data);
  },
  getChuHangUser: (data) => {
    const url = '/DanhMucChuHangUser/GetChuHangUserByMaDangNhap';
    return axiosPrivate.post(url, data);
  },
};
export default ListItemApi;
