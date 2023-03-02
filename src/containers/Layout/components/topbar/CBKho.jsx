import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import KhoApi from '../../../../api/KhoAPI';

const CBKho = () => {
  const { Option } = Select;
  const username = localStorage.getItem('ma_dang_nhap');
  const [listKho, setListKho] = useState([]);

  //? handle change value
  const handleChangeValue = (value) => {
    localStorage.setItem('kho_id_update', value);
  };

  //? fetch api
  const fetchListKho = async () => {
    const response = await KhoApi.getListKhoByUser(username);
    if (response.length !== 0) {
      const mapListKho = response.map((item) => {
        return {
          lable: item.tenKho,
          value: item.khoId,
        };
      });
      setListKho(mapListKho);
    }
  };

  useEffect(() => {
    fetchListKho();
  }, []);

  return (
    <Select
      style={{
        width: 200,
        marginRight: '10px',
      }}
      className="select-custom"
      popupClassName="select-custom"
      onChange={handleChangeValue}
    >
      {listKho.map((item) => (
        <Option value={item.value}>{item.lable}</Option>
      ))}
    </Select>
  );
};

export default CBKho;
