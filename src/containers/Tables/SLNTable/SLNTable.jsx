import { Button, DatePicker, Space, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import MasterApi from '../../../api/MasterApi';
import { useDebounce } from '../../../hook';
import useFormatDate from '../../../hook/useFormatDate';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import InputColumns from '../../../shared/components/InputColumns';
import {
  formatDateTime,
  formatDateTimeddmmyyyy1,
} from '../../../shared/helpers';

const SLNTable = () => {
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

  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);

  const [SLNProduct, setSLNProduct] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let mapSLNProduct = [];

  // ? state extension

  const { RangePicker } = DatePicker;

  // ? state date
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);

  // ? onchange value format
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromsln', dateString[0]);
    localStorage.setItem('datetosln', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  // ! state debounced
  const [numberTicket, setNumberTicket] = useState(null);
  const [itemCode, setItemCode] = useState(null);
  const [itemName, setItemName] = useState(null);
  const debouncedNumberTicket = useDebounce(numberTicket, 500);
  const debouncedItemCode = useDebounce(itemCode, 500);
  const debouncedItemName = useDebounce(itemName, 500);

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);
  // ? search filter function
  const seachFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    if (cookies.get('idchuhang')) {
      const fetchSLN = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromsln')
              ? formatDateTime(localStorage.getItem('datefromsln'))
              : DateFrom,
            date_To: localStorage.getItem('datetosln')
              ? formatDateTime(localStorage.getItem('datetosln'))
              : DateTo,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: Number(localStorage.getItem('kho_id')),
            so_Phieu_Nhap_Kho: debouncedNumberTicket || null,
            ma_San_Pham: debouncedItemCode || null,
            ten_San_Pham: debouncedItemName || null,
          };
          const response = await MasterApi.getSLN(data);
          setSLNProduct(response.result);
          dispatch(Changeloading({ loading: false }));
          setTotal(response.total);
        } catch (error) {
          dispatch(Changeloading({ loading: false }));
        }
      };
      fetchSLN();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    idKho.idKho,
    page,
    PageSize,
    debouncedNumberTicket,
    debouncedItemCode,
    debouncedItemName,
    isSearchDate,
  ]);

  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  const columns = [
    {
      title: (
        <InputColumns
          fHandle={setNumberTicket}
          title="Số Phiếu"
          setpage={setpage}
        />
      ),
      dataIndex: 'so_Phieu_Nhap_Kho',
      key: 'so_Phieu_Nhap_Kho',
      width: 120,
      render: (so_Phieu_Nhap_Kho) => (
        <p style={{ color: '#ff4861', fontWeight: 'bold' }}>
          {so_Phieu_Nhap_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Nhap_Kho.includes(value),
    },
    {
      title: (
        <InputColumns
          fHandle={setItemCode}
          title="Mã Hàng"
          setpage={setpage}
        />
      ),
      dataIndex: 'ma_San_Pham',
      width: 70,
    },
    {
      title: (
        <InputColumns
          fHandle={setItemName}
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
      width: 160,
      ellipsis: {
        showTitle: false,
      },
      render: (ten_San_Pham) => (
        <Tooltip
          placement="topLeft"
          title={ten_San_Pham}
        >
          {ten_San_Pham}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày Nhập Kho',
      dataIndex: 'ngay_Nhap_Kho',
      width: 70,
    },
    {
      title: 'SL Cái Trên Thùng',
      dataIndex: 'sL_Cai_1_Thung',
      width: 60,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.sL_Cai_1_Thung} />,
        };
      },
    },
    {
      title: 'Số Kiện Nhập',
      dataIndex: 'so_Kien_Nhap',
      key: 'so_Kien_Nhap',
      width: 50,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.so_Kien_Nhap} />,
        };
      },
    },
    {
      title: 'SL Nhập',
      dataIndex: 'so_Luong_Nhap',
      key: 'sL_Pallet',
      width: 50,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.so_Luong_Nhap} />,
        };
      },
    },
    {
      title: 'SL Pallet',
      dataIndex: 'sL_Pallet',
      key: 'sL_Pallet',
      width: 50,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.sL_Pallet} />,
        };
      },
    },
  ];

  if (SLNProduct && SLNProduct.length !== 0) {
    mapSLNProduct = SLNProduct.map((item, index) => ({
      key: index,
      ...item,
      ngay_Nhap_Kho: item.ngay_Nhap_Kho
        ? formatDateTimeddmmyyyy1(item.ngay_Nhap_Kho)
        : '',
    }));
  }

  return (
    <>
      <CustomTitleAndColor level={2}>Sản Lượng Nhập</CustomTitleAndColor>
      <Space direction="vertical">
        <CustomTitleAndColor level={5}>Ngày</CustomTitleAndColor>
        <Space
          direction="horizontal"
          style={{ marginBottom: '10px' }}
        >
          <RangePicker
            className="createDateRangePicker"
            dropdownClassName="createDateRangePicker"
            onChange={onChangeValue}
            defaultValue={
              localStorage.getItem('datefromsln')
                ? [
                    dayjs(localStorage.getItem('datefromsln'), dateFormat),
                    dayjs(localStorage.getItem('datetosln'), dateFormat),
                  ]
                : [dayjs(todayformat, dateFormat), dayjs(date, dateFormat)]
            }
            format={dateFormat}
          />
          <Button
            type="primary"
            danger
            onClick={seachFilter}
          >
            Tìm kiếm
          </Button>
        </Space>
      </Space>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        expandable={{
          rowExpandable: (record) => true,
          expandedRowRender: (record) => (
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th className="ant-table-cell">Năm</th>
                  <th className="ant-table-cell">Tháng</th>
                  <th className="ant-table-cell">Quý</th>
                  <th className="ant-table-cell">Mã NCC</th>
                  <th className="ant-table-cell">Tên NCC</th>
                  <th className="ant-table-cell">Tên Kho</th>
                </tr>
              </thead>
              <tr className="ant-table-row">
                <td>{record.nam}</td>
                <td>{record.thang}</td>
                <td>{record.quy}</td>
                <td>{record.ma_NCC}</td>
                <td>{record.ten_Viet_Tat}</td>
                <td>{record.ten_Kho}</td>
              </tr>
            </table>
          ),
        }}
        dataSource={mapSLNProduct}
        scroll={{ x: 1200 }}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          pageSizeOptions: pageOption,
          position: position,
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
    </>
  );
};
export default SLNTable;
