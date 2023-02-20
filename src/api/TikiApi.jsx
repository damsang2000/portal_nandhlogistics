import { axiosPrivate } from '../common/axiosPrivate';

const TikiApi = {
  getLink: (id_chuhang) => {
    const url = '/Tiki/AcceptTikiUser';
    return axiosPrivate.get(url, {
      params: {
        Chu_Hang_Id: id_chuhang,
      },
    });
  },
  getOrder: (data) => {
    const url = '/Tiki/GetListOrder';
    return axiosPrivate.post(url, data);
  },
  getStoreTikiInfo: (id_chuhang) => {
    const url = '/Tiki/GetTikiSellerInfo';
    return axiosPrivate.get(url, {
      params: {
        Chu_Hang_Id: id_chuhang,
      },
    });
  },
  getListKho: (id_chuhang) => {
    const url = '/Tiki/GetListSalerWarehouseTiki';
    return axiosPrivate.get(url, {
      params: {
        IdChuHang: id_chuhang,
      },
    });
  },
  getAsyncListKho: (id_chuhang) => {
    const url = '/Tiki/TikiWarehouseSync';
    return axiosPrivate.get(url, {
      params: {
        IdChuHang: id_chuhang,
      },
    });
  },
  updateKhoTiki: (data) => {
    const url = '/Tiki/TikiWarehouseUpdateList';
    return axiosPrivate.post(url, data);
  },
};

export default TikiApi;
