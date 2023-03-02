/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { marginLeft } from '@/utils/directions';
import { CustomSpan } from '../../../../shared/components/CustomSpan';
import KhoApi from '../../../../api/KhoAPI';
import { useDispatch } from 'react-redux';
import { changeDataArrKho } from '../../../../redux/actions/arrKhoAction';

const TopbarKho = ({ refCurrent }) => {
  const { Option } = Select;
  const [listKho, setListKho] = useState([]);
  const username = localStorage.getItem('ma_dang_nhap');
  const dispatch = useDispatch();

  const handleChange = (value) => {
    localStorage.setItem('kho_id', value);
    dispatch(changeDataArrKho({ idKho: value }));
  };

  const fetchApiListKho = async () => {
    const response = await KhoApi.getListKhoByUser(username);
    if (response.length !== 0) {
      dispatch(changeDataArrKho({ idKho: response[0].khoId }));
      const mapListKho = response.map((item) => {
        return {
          lable: item.tenKho,
          value: item.khoId,
        };
      });
      if (!localStorage.getItem('kho_id')) {
        localStorage.setItem('kho_id', mapListKho[0].value);
      } else {
        const checkKho = response.find(
          (item) => item.khoId === Number(localStorage.getItem('kho_id'))
        );
        if (checkKho.length === 0) {
          localStorage.setItem('kho_id', mapListKho[0].value);
        }
      }
      setListKho(mapListKho);
    }
  };

  useEffect(() => {
    fetchApiListKho();
  }, []);
  return (
    <Space>
      <CustomSpan>Kho</CustomSpan>
      <Select
        style={{
          width: 200,
          marginRight: '10px',
        }}
        className="select-custom"
        popupClassName="select-custom"
        onChange={handleChange}
        value={
          listKho.length !== 0
            ? localStorage.getItem('kho_id')
              ? Number(localStorage.getItem('kho_id'))
              : listKho.length !== 0 && listKho[0].value
            : undefined
        }
      >
        {listKho.map((item) => (
          <Option value={item.value}>{item.lable}</Option>
        ))}
      </Select>
    </Space>
  );
};

export default TopbarKho;

export const TopbarProfileWrap = styled.div`
  position: relative;
  margin-bottom: 0;
  ${marginLeft}: 0;

  @media screen and (max-width: 576px) {
    margin: inherit;
  }

  @media screen and (max-width: 320px) {
    margin: auto 0;
  }
`;
