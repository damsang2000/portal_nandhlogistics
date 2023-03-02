import { Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { useDebounce } from '../../../../hook';
import { colorText } from '@/utils/palette';
// ? import component
import ListItemApi from '../../../../api/ListItemApi';
import usePagination from '../../../../hook/usePagination';
import { Changeloading } from '../../../../redux/actions/loadingAction';
import CustomLoading from '../../../../shared/components/CustomLoading';
import InputColumns from '../../../../shared/components/InputColumns';
import ModalTableProduct from './ModalTableProduct';
import ContenNoData from '../../../../shared/components/ContenNoData';

const TableProduct = () => {
  // ? state extension
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const loading = useSelector((state) => state.loading);
  // ? state component
  // ! state product
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  let mapCategoryProduct = [];
  // ! state modal
  const [openModalDetail, setOpenModalDetail] = useState(false);

  // ! state debounced
  const [numberProduct, setNumberProduct] = useState(null);
  const [productName, setProductName] = useState(null);
  const debouncedNumberProduct = useDebounce(numberProduct, 500);
  const debouncedProductName = useDebounce(productName, 500);

  // ! hook custom pagination
  const [
    Total,
    setTotal,
    page,
    PageSize,
    getData,
    getDataSize,
    pageOption,
    position,
    setpage,
  ] = usePagination();

  // ? function handle
  // ! function handle change loading
  const handleChangeLoading = (check) => {
    dispatch(Changeloading({ loading: check }));
  };

  // ! function get value record column
  const getValueColumn = (record) => {
    setDataDetail(record);
  };

  // * Call API =================================================================
  useEffect(() => {
    handleChangeLoading(true);

    if (cookies.get('idchuhang')) {
      const fetchCategoryProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: page,
            pageCount: PageSize,
            chu_Hang_ID: cookies.get('idchuhang'),
            is_Closed: false,
            ten_San_Pham: debouncedProductName || null,
            ma_San_Pham: debouncedNumberProduct || null,
          };
          const response = await ListItemApi.getAll(data);

          setCategoryProduct(response.result);
          handleChangeLoading(false);
          setTotal(response.total);
        } catch (error) {
          handleChangeLoading(false);
        }
      };
      fetchCategoryProduct();
    }
    return () => {
      setCategoryProduct([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    idKho.idKho,
    page,
    PageSize,
    debouncedProductName,
    debouncedNumberProduct,
  ]);

  // * columns table and map data=============================
  const columns = [
    {
      title: (
        <InputColumns
          fHandle={setNumberProduct}
          title="Mã Hàng"
          setpage={setpage}
        />
      ),
      dataIndex: 'ma_San_Pham',
      key: 'ma_San_Pham',
      width: 150,
      fixed: 'left',
      render: (ma_San_Pham) => (
        <p style={{ color: '#ff4861', fontWeight: 'bold' }}>{ma_San_Pham}</p>
      ),
    },
    {
      title: (
        <InputColumns
          fHandle={setProductName}
          setpage={setpage}
        >
          <p
            style={{
              color: 'rgba(0, 0, 0, 0.88)',
              fontWeight: '600',
            }}
          >
            Tên Hàng
          </p>
        </InputColumns>
      ),
      dataIndex: 'ten_San_Pham',
      key: 'ten_San_Pham',
      width: 350,
      render: (text, record) => (
        <span
          className="custom-color-hover-p"
          style={{ color: '#3742fa', cursor: 'pointer' }}
          onClick={() => {
            setOpenModalDetail(true);
            getValueColumn(record);
          }}
        >
          {record.ten_San_Pham}
        </span>
      ),
    },

    {
      title: 'ĐVT',
      dataIndex: 'ten_Don_Vi_Tinh',
      key: 'ten_Don_Vi_Tinh',
      width: 70,
    },
    {
      title: 'Loại Hàng',
      dataIndex: 'ten_Loai_San_Pham',

      key: 'ten_Loai_San_Pham',
    },
    {
      title: 'Mã SP NCC',
      dataIndex: 'ma_SP_NCC',
      key: 'ma_SP_NCC',
    },
    {
      title: 'QC Thùng',
      dataIndex: 'sL_Cai_1_Thung',
      key: 'sL_Cai_1_Thung',
      width: 100,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <div className="center-text">{record.sL_Cai_1_Thung}</div>,
        };
      },
    },
    {
      title: 'QC Paller',
      dataIndex: 'sL_Thung_1_Pallet',
      width: 100,
      key: 'sL_Thung_1_Pallet',
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: (
            <div className="center-text">{record.sL_Thung_1_Pallet}</div>
          ),
        };
      },
    },
    {
      title: 'GW',
      dataIndex: 'gw',
      key: 'gw',
      width: 80,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <div className="center-text">{record.gw}</div>,
        };
      },
    },
    {
      title: 'NW',
      dataIndex: 'nw',
      key: 'nw',
      width: 80,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <div className="center-text">{record.nw}</div>,
        };
      },
    },
    {
      title: 'CBM',
      dataIndex: 'cbm',
      key: 'cbm',
      width: 80,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <div className="center-text">{record.cbm}</div>,
        };
      },
    },
  ];

  //* map data===============================================
  if (categoryProduct && categoryProduct.length !== 0) {
    mapCategoryProduct = categoryProduct.map((item, index) => ({
      key: index,
      ...item,
    }));
  }

  // * render component
  return (
    <>
      <CustomTitle level={2}>Danh mục sản phẩm</CustomTitle>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        dataSource={mapCategoryProduct}
        scroll={{ x: 1300 }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          position: position,
          pageSizeOptions: pageOption,
        }}
        footer={() =>
          page && Total ? (
            <p
              style={{
                color: 'black',
              }}
            >{`Page ${page} of ${Math.ceil(
              Total / PageSize
            )} (${Total} items)`}</p>
          ) : null
        }
      />
      <ModalTableProduct
        open={openModalDetail}
        callBackCancel={() => setOpenModalDetail(false)}
        dataDetail={dataDetail}
      />
    </>
  );
};
export default TableProduct;

const CustomTitle = styled(Typography.Title)`
  color: ${colorText} !important;
`;
