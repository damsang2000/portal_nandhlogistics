/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
import { Select, Space } from 'antd';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { marginLeft, right, left } from '@/utils/directions';
import { changeDataChuHang } from '../../../../redux/actions/ChuHangAction';
import { changeDataNameChuHang } from '../../../../redux/actions/tenChuHangAction';
import { changeDataArrChuHang } from '../../../../redux/actions/arrChuHangAction';
import { Changeloading } from '../../../../redux/actions/loadingAction';
import { getIDFirst } from '../../../../redux/actions/getIDFirstAction';
import ModalChuHang from '../../../../shared/components/ModalChuHang';
import ChuHangApi from '../../../../api/ChuHangApi';
import { CustomSpan } from '../../../../shared/components/CustomSpan';
import { changeDataArrCost } from '../../../../redux/actions/arrCostActions';

const App = ({ refCurrent }) => {
  const { Option } = Select;
  const [filterChuHang, setFilterChuHang] = useState([]);
  const idfirst = useSelector((state) => state.idfirst);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  // if (!cookies.get('idfirst')) {
  //   cookies.set('idfirst', arrChuHang.arrChuHang[0].Chu_Hang_ID);
  // }

  // ? state redux
  const arrChuHang = useSelector((state) => state.arrChuHang);
  if (
    cookies.get('idchuhang') &&
    arrChuHang.arrChuHang &&
    arrChuHang.arrChuHang.length !== 0
  ) {
    if (!localStorage.getItem('checkcontain')) {
      const checkChuHang = arrChuHang.arrChuHang.filter(
        (item) =>
          item.chuHangId ===
          parseInt(
            cookies.get('idchuhang')
              ? cookies.get('idchuhang')
              : localStorage.getItem('idchuhang'),
            10
          )
      );
      if (checkChuHang.length === 0) {
        localStorage.setItem('checkcontain', '-1');
      } else {
        localStorage.setItem('checkcontain', '1');
      }
    }
  }

  if (arrChuHang.arrChuHang && arrChuHang.arrChuHang.length === 1) {
    if (filterChuHang.length !== 0) {
      // dispatch(changeDataChuHang({ idchuhang: filterChuHang[0].value }));
      cookies.set('idchuhang', filterChuHang[0].value, { path: '/' });
      localStorage.setItem('idchuhang', filterChuHang[0].value, { path: '/' });
      cookies.set('owner_code', filterChuHang[0].key, { path: '/' });
      localStorage.setItem('checkcontain', '1');
    }
  }

  // const data = {
  //   maDangNhap: cookies.get('ma_dang_nhap'),
  // };
  const handleChange = async (value, key) => {
    dispatch(changeDataChuHang({ idchuhang: value }));
    cookies.set('idchuhang', value, { path: '/' });
    localStorage.setItem('idchuhang', value);
    cookies.set('owner_code', key.key, { path: '/' });
    localStorage.setItem('owner_code', key.key);
    dispatch(Changeloading({ loading: true }));
    dispatch(changeDataArrCost({ arrCost: [] }));
  };

  useEffect(() => {
    // fetch('http://api-stg.nandhlogistics.vn:2530/api/DanhMucChuHangUser/GetChuHangUserByMaDangNhap', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // })
    //   .then(res => res.json())
    //   // eslint-disable-next-line no-shadow
    //   .then((data) => {
    //     // dispatch(getIDFirst({
    //     //   idfirst: data[0][0].Chu_Hang_ID,
    //     //   tenVietTat: data[0][0].Ten_Viet_Tat,
    //     //   tenChuHang: data[0][0].Ten_Chu_Hang,
    //     // }));
    //     // eslint-disable-next-line array-callback-return
    //     const mapDataChuHang = data.result.map(item => ({
    //           label: `${item.tenVietTat} - ${item.tenChuHang}`,
    //           value: item.chuHangId,
    //           key: item.tenVietTat,
    //         }));
    //     setFilterChuHang(mapDataChuHang);
    //     dispatch(changeDataArrChuHang({ arrChuHang: data.result }));
    //   });

    const fetchChuHangList = async () => {
      try {
        const data = {
          maDangNhap: cookies.get('ma_dang_nhap')
            ? cookies.get('ma_dang_nhap')
            : localStorage.getItem('ma_dang_nhap'),
        };
        const response = await ChuHangApi.getAll(data);
        const getAll = {
          label: 'Tất cả',
          value: null,
        };
        const mapDataChuHang = response.result.map((item) => ({
          label: `${item.tenVietTat} - ${item.tenChuHang}`,
          value: item.chuHangId,
          key: item.tenVietTat,
        }));
        setFilterChuHang(mapDataChuHang);
        cookies.set('idchuhang', localStorage.getItem('idchuhang'), {
          path: '/',
        });
        dispatch(changeDataChuHang({ idchuhang: cookies.get('idchuhang') }));
        dispatch(changeDataArrChuHang({ arrChuHang: response.result }));
      } catch (error) {
        return error;
      }
    };
    fetchChuHangList();
  }, []);

  return (
    <>
      {(!cookies.get('idchuhang') && !localStorage.getItem('idchuhang')) ||
      localStorage.getItem('checkcontain') === '-1' ? (
        <ModalChuHang openModal />
      ) : null}
      <Space>
        <CustomSpan>Chủ hàng</CustomSpan>
        <Select
          showSearch
          popupClassName="select-custom"
          ref={refCurrent}
          // eslint-disable-next-line no-mixed-operators
          value={
            (filterChuHang.length !== 0 &&
              localStorage.getItem('checkcontain') === '1') ||
            (filterChuHang.length === 1 &&
              localStorage.getItem('checkcontain') === '-1')
              ? parseInt(
                  cookies.get('idchuhang')
                    ? cookies.get('idchuhang')
                    : localStorage.getItem('idchuhang'),
                  10
                )
              : ''
          }
          className="select-custom custom_768 custom_412 custom_375 custom_320"
          placeholder="Chọn Chủ Hàng"
          defaultActiveFirstOption
          style={{
            width: 350,
            marginRight: '10px',
          }}
          onChange={handleChange}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={filterChuHang}
        />
      </Space>
    </>
  );
};

export default App;

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
