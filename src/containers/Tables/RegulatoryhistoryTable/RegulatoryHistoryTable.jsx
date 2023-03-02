/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePicker, Space, Table, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import TonKhoApi from '../../../api/TonKhoApi';
import { useDebounce } from '../../../hook';
import useFormatDate from '../../../hook/useFormatDate';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import CustomLoading from '../../../shared/components/CustomLoading';
import InputColumns from '../../../shared/components/InputColumns';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';
import ContenNoData from '../../../shared/components/ContenNoData';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';

const RegulatoryHistoryTable = () => {
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

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);

  const [regulatoryHistory, setRegulatoryHistory] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const cookies = new Cookies();
  const { RangePicker } = DatePicker;
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  let mapAdjustmentHistory = [];

  // date
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);

  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromhistory', dateString[0]);
    localStorage.setItem('datetohistory', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [nameProduct, setNameProduct] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  //  const debouncedAWB = useDebounce(numberAWB, 500);
  const debouncedNameProduct = useDebounce(nameProduct, 500);

  // ? function handle filter
  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };
  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchDODetailProduct = async () => {
      try {
        const data = {
          sortName: null,
          isAsc: true,
          page: page,
          pageCount: PageSize,
          date_From: localStorage.getItem('datefromhistory')
            ? formatDateTime(localStorage.getItem('datefromhistory'))
            : DateFrom,
          date_To: localStorage.getItem('datetohistory')
            ? formatDateTime(localStorage.getItem('datetohistory'))
            : DateTo,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: Number(localStorage.getItem('kho_id')),
          so_Phieu_Nhap_Kho: debouncedTicket || null,
          ten_San_Pham: debouncedNameProduct || null,
        };
        const response = await TonKhoApi.getHistoryTable(data);
        if (response.result) {
          setRegulatoryHistory(response.result);
          dispatch(Changeloading({ loading: false }));
          setTotal(response.total);
        } else {
          dispatch(Changeloading({ loading: false }));
        }
      } catch (error) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchDODetailProduct();
    return () => {
      setRegulatoryHistory([]);
      setTotal(0);
    };
  }, [
    idchuhang.idchuhang,
    idKho.idKho,
    page,
    PageSize,
    debouncedTicket,
    debouncedNameProduct,
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
      width: 150,
      render: (so_Phieu_Nhap_Kho) => (
        <p style={{ color: '#ff4861', fontWeight: 'bold' }}>
          {so_Phieu_Nhap_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Nhap_Kho.includes(value),
    },
    {
      title: 'Ngày DC',
      dataIndex: 'ngay_Dieu_Chinh',
      width: 80,
    },
    {
      title: (
        <InputColumns
          fHandle={setNameProduct}
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
      width: 200,
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
      title: 'Vị Trí',
      dataIndex: 'ma_So_Vi_Tri',
      width: 80,
      render: (ma_So_Vi_Tri) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{ma_So_Vi_Tri}</p>
      ),
    },
    {
      title: 'Cũ',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien_Cu',
          width: 50,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Cu} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong_Cu',
          width: 50,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Luong_Cu} />,
            };
          },
        },
      ],
    },
    {
      title: 'Mới',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien_Moi',
          width: 50,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Moi} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong_Moi',
          width: 50,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.so_Luong_Moi} />,
            };
          },
        },
      ],
    },
    {
      title: 'Người Tạo',
      dataIndex: 'created_By',
      width: 70,
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'ghi_Chu',
      width: 100,
    },
  ];

  if (regulatoryHistory && regulatoryHistory.length !== 0) {
    mapAdjustmentHistory = regulatoryHistory.map((item, index) => ({
      key: index,
      ...item,
      ngay_Dieu_Chinh: item.ngay_Dieu_Chinh
        ? `${formarDateTimeddmmyyy(
            item.ngay_Dieu_Chinh.slice(0, 10)
          )} ${formarDateTimeddmmyyy(item.ngay_Dieu_Chinh.slice(11, 19))}`
        : '',
    }));
  }

  return (
    <>
      <CustomTitleAndColor level={2}>
        Lịch sử điều chỉnh tồn
      </CustomTitleAndColor>
      <Space direction="horizontal">
        <Space direction="vertical">
          <CustomTitleAndColor level={5}>Ngày</CustomTitleAndColor>
          <Space
            direction="horizontal"
            style={{ marginBottom: '10px' }}
          >
            <RangePicker
              className="createDateRangePicker"
              popupClassName="createDateRangePicker"
              onChange={onChangeValue}
              defaultValue={
                localStorage.getItem('datefromhistory')
                  ? [
                      dayjs(
                        localStorage.getItem('datefromhistory'),
                        dateFormat
                      ),
                      dayjs(localStorage.getItem('datetohistory'), dateFormat),
                    ]
                  : [dayjs(todayformat, dateFormat), dayjs(date, dateFormat)]
              }
              format={dateFormat}
            />
            <Button
              type="primary"
              danger
              onClick={searchFilter}
            >
              Tìm Kiếm
            </Button>
          </Space>
        </Space>
      </Space>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        dataSource={mapAdjustmentHistory}
        scroll={{ x: 1200 }}
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
    </>
  );
};
export default RegulatoryHistoryTable;
