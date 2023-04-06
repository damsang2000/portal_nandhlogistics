import React, { useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
const ExportExcelInventory = (props) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const fetchCategoryProduct = async () => {
    try {
      const data = {
        sortName: null,
        isAsc: true,
        page: props.page,
        pageCount: props.pageCount,
        chu_Hang_ID: props.chu_Hang_ID,
        kho_ID: props.kho_ID,
        ma_San_Pham: props.ma_San_Pham,
        ten_San_Pham: props.ten_San_Pham,
      };
      const response = await axios.post(
        'https://gateway-api.nandhlogistics.vn/api/WarehouseReport/ExportTonKhoHienTai',
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
        isAsc: true,
        page: props.page,
        pageCount: props.pageCount,
        chu_Hang_ID: props.chu_Hang_ID,
        kho_ID: props.kho_ID,
        ma_San_Pham: props.ma_San_Pham,
        ten_San_Pham: props.ten_San_Pham,
      };
      const response = await axios.post(
        'https://gateway-api.nandhlogistics.vn/api/WarehouseReport/ExportTatCaTonKhoHienTai',
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

export default ExportExcelInventory;
