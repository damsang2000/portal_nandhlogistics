import React, { useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
const ExportExcelImport = (props) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const fetchCategoryProduct = async () => {
    try {
      const data = {
        sortName: null,
        isAsc: true,
        page: props.page,
        pageCount: props.pageCount,
        idKeHoach: null,
        date_From: props.dateFrom,
        date_To: props.dateTo,
        chu_Hang_ID: props.chuHangID,
        kho_ID: props.khoID,
        keyWordFilter: null,
        so_Phieu_Nhap_Kho: props.soPhieuNhapKho,
        ten_San_Pham: props.tenSanPham,
        ten_NCC: props.tenNCC,
        loai_Hinh_Nhap_Kho_ID: props.loaiHinhNhap,
        trang_Thai_Nhap_Kho_ID: props.trangThaiNhapKho
          ? [...props.trangThaiNhapKho]
          : props.trangThaiNhapKho,
      };
      const response = await axios.post(
        'https://gateway-api.nandhlogistics.vn/api/WarehouseReport/ExportChiTietNhapKho',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );
      const href = URL.createObjectURL(response);

      const link = document.createElement('a');
      link.href = href;

      link.setAttribute('download', `${props.filename}.xls`); //or any other extension
      document.body.appendChild(link);
      link.click();
      setLoading(false);
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCategoryProductAll = async () => {
    try {
      const data = {
        sortName: null,
        isAsc: true,
        page: props.page,
        pageCount: props.pageCount,
        idKeHoach: null,
        date_From: props.dateFrom,
        date_To: props.dateTo,
        chu_Hang_ID: props.chuHangID,
        kho_ID: props.khoID,
        keyWordFilter: null,
        so_Phieu_Nhap_Kho: props.soPhieuNhapKho,
        ten_San_Pham: props.tenSanPham,
        ten_NCC: props.tenNCC,
        loai_Hinh_Nhap_Kho_ID: props.loaiHinhNhap,
        trang_Thai_Nhap_Kho_ID: props.trangThaiNhapKho
          ? [...props.trangThaiNhapKho]
          : props.trangThaiNhapKho,
      };
      const response = await axios.post(
        'https://gateway-api.nandhlogistics.vn/api/WarehouseReport/ExportTatCaChiTietNhapKho',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );
      const href = URL.createObjectURL(response);

      const link = document.createElement('a');
      link.href = href;

      link.setAttribute('download', `${props.filename}.rar`); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(false);
      URL.revokeObjectURL(href);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeValue = (value) => {
    if (value === '1') {
      setLoading(true);
      fetchCategoryProduct();
    } else {
      setLoading(true);
      fetchCategoryProductAll();
    }
  };
  return (
    <Select
      className="select-custom"
      popupClassName="select-custom"
      defaultValue={null}
      loading={loading}
      onChange={handleChangeValue}
      style={{ width: 165 }}
    >
      <Option value="1">Xuất theo chủ hàng</Option>
      <Option value="2">Xuất tất cả</Option>
    </Select>
  );
};

export default ExportExcelImport;
