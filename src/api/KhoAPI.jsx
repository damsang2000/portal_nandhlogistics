import { axiosPrivate } from '../common/axiosPrivate';

const KhoApi = {
  getAll: (data) => {
    const url = '/XuatNhapKhau/GetListKiemKho';
    return axiosPrivate.post(url, data);
  },
  getAllKhuVuc: (data) => {
    const url = '/DanhMucVitri/GetDanhMucViTriByKho';
    return axiosPrivate.post(url, data);
  },
  getDetailInventoryByID: (data) => {
    const url = '/XuatNhapKhau/GetListKiemKhoChiTietById';
    return axiosPrivate.post(url, data);
  },
  exportExcel: (data) => {
    const url = '/WarehouseReport/ExportPhieuKiemKho';
    return axiosPrivate.post(url, data);
  },
};

export default KhoApi;
