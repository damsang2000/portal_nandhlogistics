import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import KhoApi from '../../api/KhoAPI';

const ComboboxColumn = ({ fHandle, title, children, setpage }) => {
  const { Option } = Select;
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);

  //? state component
  const [dmKhuVuc, setDMKhuVuc] = useState([]);
  const mapDMPosition = [];

  // * Call API =================================================================
  useEffect(() => {
    if (cookies.get('idchuhang')) {
      const fetchCategoryProduct = async () => {
        try {
          const data = {
            kho_ID: 2631604,
          };
          const response = await KhoApi.getAllKhuVuc(data);
          const all = {
            khu_Vuc_Kho_ID: null,
            ten_Khu_Vuc_Kho: 'Tất cả',
          };
          response.result.unshift(all);
          setDMKhuVuc(response.result);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCategoryProduct();
    }
    return () => {
      setDMKhuVuc([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchuhang.idchuhang]);

  return (
    <>
      {children}
      {title}
      <Select
        size="small"
        className="select-custom"
        popupClassName="select-custom"
        onChange={(value) => fHandle(value)}
        //   defaultValue={Status}
        style={{ width: '100%' }}
        //   onChange={handleChangeStatus}
      >
        {dmKhuVuc.length !== 0
          ? dmKhuVuc.map((item, index) => (
              <Option
                value={item.khu_Vuc_Kho_ID}
                key={index}
              >
                {item.ten_Khu_Vuc_Kho}
              </Option>
            ))
          : ''}
      </Select>
    </>
  );
};

export default ComboboxColumn;
