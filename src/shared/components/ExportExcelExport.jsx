import React, { useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
const ExportExcelExport = (props) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const fetchCategoryProduct = async () => {
    try {
      const data = {
        sortName: null,
        isAsc: false,
        page: props.page,
        pageCount: props.pageCount,
        date_From: props.date_From,
        date_To: props.date_To,
        chu_Hang_ID: props.chu_Hang_ID,
        kho_ID: props.kho_ID,
        trang_Thai_Xuat_Kho_ID: props.trang_Thai_Xuat_Kho_ID
          ? [...props.trang_Thai_Xuat_Kho_ID]
          : props.trang_Thai_Xuat_Kho_ID,
        xem_Type_ID: props.xem_Type_ID,
        loai_Hinh_Xuat_Kho_ID: props.loai_Hinh_Xuat_Kho_ID,
        sieu_Thi_ID: props.sieu_Thi_ID,
        idKeHoach: null,
        so_Phieu_Xuat_Kho: props.so_Phieu_Xuat_Kho,
        ten_San_Pham: props.ten_San_Pham,
        so_AWB: props.so_AWB,
      };
      const response = await axios.post(
        'https://gateway-api.nandhlogistics.vn/api/WarehouseReport/ExportChiTietXuatKho',
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
      document.body.removeChild(link);
      setLoading(false);
      URL.revokeObjectURL(href);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCategoryProductAll = async () => {
    try {
      const data = {
        sortName: null,
        isAsc: false,
        page: props.page,
        pageCount: props.pageCount,
        date_From: props.date_From,
        date_To: props.date_To,
        chu_Hang_ID: props.chu_Hang_ID,
        kho_ID: props.kho_ID,
        trang_Thai_Xuat_Kho_ID: props.trang_Thai_Xuat_Kho_ID
          ? [...props.trang_Thai_Xuat_Kho_ID]
          : props.trang_Thai_Xuat_Kho_ID,
        xem_Type_ID: props.xem_Type_ID,
        loai_Hinh_Xuat_Kho_ID: props.loai_Hinh_Xuat_Kho_ID,
        sieu_Thi_ID: props.sieu_Thi_ID,
        idKeHoach: null,
        so_Phieu_Xuat_Kho: props.so_Phieu_Xuat_Kho,
        ten_San_Pham: props.ten_San_Pham,
        so_AWB: props.so_AWB,
      };
      const response = await axios.post(
        'https://gateway-api.nandhlogistics.vn/api/WarehouseReport/ExportTatCaChiTietXuatKho',
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

export default ExportExcelExport;
