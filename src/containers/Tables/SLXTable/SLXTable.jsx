/* eslint-disable object-shorthand */
/* eslint-disable semi */
/* eslint-disable arrow-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable react/jsx-indent */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import {
  Space,
  Table,
  Tooltip,
  Typography,
  DatePicker,
  Button,
  Input,
} from 'antd';
import dayjs from 'dayjs';
import Cookies from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import CustomLoading from '../../../shared/components/CustomLoading';
import { Changeloading } from '../../../redux/actions/loadingAction';
import {
  formatDateTime,
  formatDateTimeddmmyyyy1,
} from '../../../shared/helpers';
import MasterApi from '../../../api/MasterApi';
import { useDebounce } from '../../../hook';
import usePagination from '../../../hook/usePagination';
import useFormatDate from '../../../hook/useFormatDate';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import ContenNoData from '../../../shared/components/ContenNoData';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';

const SLXTable = () => {
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

  const [SLXProduct, setSLXProduct] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let mapSLXProduct = [];

  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);

  // ? state extension

  const { RangePicker } = DatePicker;

  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);

  // ? onchange value format
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromslx', dateString[0]);
    localStorage.setItem('datetoslx', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);

  // ? searchFilter
  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };

  // ! state debounced
  const [numberTicket, setNumberTicket] = useState(null);
  const [itemCode, setItemCode] = useState(null);
  const [itemName, setItemName] = useState(null);
  const debouncedNumberTicket = useDebounce(numberTicket, 500);
  const debouncedItemCode = useDebounce(itemCode, 500);
  const debouncedItemName = useDebounce(itemName, 500);

  // ! handle change value debounced (item_code and item_name)
  const handleChangeDebounced = (e, fHandle) => {
    fHandle(e.target.value);
    setpage(1);
  };

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    if (cookies.get('idchuhang')) {
      const fetchSLX = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromslx')
              ? formatDateTime(localStorage.getItem('datefromslx'))
              : DateFrom,
            date_To: localStorage.getItem('datetoslx')
              ? formatDateTime(localStorage.getItem('datetoslx'))
              : DateTo,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: Number(localStorage.getItem('kho_id')),
            loai_Hinh_Nhap_Kho_ID: -5,
            trang_Thai_Nhap_Kho_ID: -5,
            so_Phieu_Xuat_Kho: debouncedNumberTicket || null,
            ma_San_Pham: debouncedItemCode || null,
            ten_San_Pham: debouncedItemName || null,
          };
          const response = await MasterApi.getSLX(data);
          setSLXProduct(response.result);
          dispatch(Changeloading({ loading: false }));
          setTotal(response.total);
        } catch (error) {
          dispatch(Changeloading({ loading: false }));
        }
      };
      fetchSLX();
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
      title: () => (
        <>
          Số Phiếu
          <Input
            className="custom-input"
            size="small"
            onChange={(e) => handleChangeDebounced(e, setNumberTicket)}
          />
        </>
      ),
      dataIndex: 'so_Phieu_Xuat_Kho',
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
      title: () => (
        <>
          Mã Sản Phẩm
          <Input
            className="custom-input"
            size="small"
            onChange={(e) => handleChangeDebounced(e, setItemCode)}
          />
        </>
      ),
      dataIndex: 'ma_San_Pham',
      width: 120,
    },
    {
      title: () => (
        <>
          <p
            style={{
              color: 'rgba(0, 0, 0, 0.88)',
              fontWeight: '600',
            }}
          >
            Tên Hàng
          </p>
          <Input
            className="custom-input"
            size="small"
            onChange={(e) => handleChangeDebounced(e, setItemName)}
          />
        </>
      ),
      dataIndex: 'ten_San_Pham',
      width: 250,
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
      title: 'Ngày Xuất Kho',
      dataIndex: 'ngay_Xuat_Kho',
      width: 120,
    },
    {
      title: 'SL Cái Trên Thùng',
      dataIndex: 'sL_Cai_1_Thung',
      width: 105,
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
      title: 'Số Kiện Xuất',
      dataIndex: 'so_Kien_Xuat',
      key: 'so_Kien_Xuat',
      width: 105,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.so_Kien_Xuat} />,
        };
      },
    },
    {
      title: 'SL Xuất',
      dataIndex: 'so_Luong_Xuat',
      key: 'so_Luong_Xuat',
      width: 105,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.so_Luong_Xuat} />,
        };
      },
    },
    {
      title: 'SL Pallet',
      dataIndex: 'sL_Pallet',
      key: 'sL_Pallet',
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

  if (SLXProduct && SLXProduct.length !== 0) {
    mapSLXProduct = SLXProduct.map((item, index) => ({
      key: index,
      ...item,
      ngay_Xuat_Kho: item.ngay_Xuat_Kho
        ? formatDateTimeddmmyyyy1(item.ngay_Xuat_Kho)
        : '',
    }));
  }

  return (
    <>
      <CustomTitleAndColor level={2}>Sản Lượng Xuất</CustomTitleAndColor>
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
              localStorage.getItem('datefromslx')
                ? [
                    dayjs(localStorage.getItem('datefromslx'), dateFormat),
                    dayjs(localStorage.getItem('datetoslx'), dateFormat),
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
                  <th className="ant-table-cell">Tên Siêu Thị</th>
                  <th className="ant-table-cell">Mã NCC</th>
                  <th className="ant-table-cell">Tên NCC</th>
                  <th className="ant-table-cell">Tên Kho</th>
                </tr>
              </thead>
              <tr className="ant-table-row">
                <td>{record.nam}</td>
                <td>{record.thang}</td>
                <td>{record.quy}</td>
                <td>{record.ten_Sieu_Thi}</td>
                <td>{record.ma_NCC}</td>
                <td>{record.ten_Viet_Tat}</td>
                <td>{record.ten_Kho}</td>
              </tr>
            </table>
          ),
        }}
        dataSource={mapSLXProduct}
        scroll={{ x: 1150 }}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          pageSizeOptions: pageOption,
          position,
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
export default SLXTable;
