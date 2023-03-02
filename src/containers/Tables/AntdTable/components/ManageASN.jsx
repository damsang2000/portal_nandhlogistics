/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePicker, Select, Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

// ? import helper funtion
import {
  formarDateTimeddmmyyy,
  formatDateTime,
} from '../../../../shared/helpers';

// ? import component
import OrderASNApi from '../../../../api/OrderASNApi';
import { useDebounce } from '../../../../hook';
import useFormatDate from '../../../../hook/useFormatDate';
import usePagination from '../../../../hook/usePagination';
import { Changeloading } from '../../../../redux/actions/loadingAction';
import CustomLoading from '../../../../shared/components/CustomLoading';
import InputColumns from '../../../../shared/components/InputColumns';
import ModalDetailAsn from '../../../../shared/components/ModalDetailAsn';
import CustomQuantity from '../../../../shared/components/CustomQuantity';
import ContenNoData from '../../../../shared/components/ContenNoData';
import { CustomTitleAndColor } from '../../../../shared/components/CustomTitle';
const ManageASN = () => {
  // ? state component
  //! state asn manage
  const [manageNhapKho, setManageNhapKho] = useState([]);
  const [dataDetail, setdataDetail] = useState([]);
  // ! state loading
  const loading = useSelector((state) => state.loading);

  // ! state modal
  const [openModalDetail, setopenModalDetail] = useState(false);

  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);
  // ! state datetime

  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);

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
  // ! state status
  const [Status, setStatus] = useState(null);

  //! state debounced
  const [numberTicket, setNumberTicket] = useState(null);
  const [market, setMarket] = useState(null);
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedMarket = useDebounce(market, 500);
  // ? state extension
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);

  // ? funtion handle
  // ! function handle change value datetime
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);

    localStorage.setItem('datefromimportmanage', dateString[0]);
    localStorage.setItem('datetoimportmanage', dateString[1]);

    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };
  //! handle modal
  const cancelModal = () => {
    setopenModalDetail(false);
  };
  // ! function handle search datetime
  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };
  // ! function handle change status(Trạng thái)
  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  // ! function
  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  //! handle data detail
  const handleDetail = (data) => {
    setdataDetail(data);
    setopenModalDetail(true);
  };

  // * Call api get manage asn
  useEffect(() => {
    const fetchListPhieuXuatPickXong = async () => {
      dispatch(Changeloading({ loading: true }));
      try {
        const data = {
          sortName: null,
          isAsc: true,
          date_From: localStorage.getItem('datefromimportmanage')
            ? formatDateTime(localStorage.getItem('datefromimportmanage'))
            : DateFrom,
          date_To: localStorage.getItem('datetoimportmanage')
            ? formatDateTime(localStorage.getItem('datetoimportmanage'))
            : DateTo,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: Number(localStorage.getItem('kho_id')),
          page: page,
          pageCount: PageSize,
          so_Phieu_Nhap_Kho: debouncedTicket || null,
          ma_NCC: null,
          ten_Sieu_Thi: debouncedMarket || null,
          trang_Thai_Nhap_Kho_ID: Status || null,
        };
        const response = await OrderASNApi.getAllManage(data);
        console.log(response);
        setManageNhapKho(response.result);
        dispatch(Changeloading({ loading: false }));
        setTotal(response.total);
      } catch (error) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchListPhieuXuatPickXong();
  }, [
    idchuhang.idchuhang,
    idKho.idKho,
    isSearchDate,
    debouncedTicket,
    debouncedMarket,
  ]);

  // ? Column Tables
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
      width: 190,
      fixed: 'left',
      // ...getColumnSearchProps('Số Phiếu'),
      render: (value, record) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            handleDetail(record);
          }}
        >
          {record.so_Phieu_Nhap_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Nhap_Kho.includes(value),
    },
    {
      title: 'Ngày NK',
      dataIndex: 'ngay_Nhap_Kho',
      width: 120,
      render: (ngay_Nhap_Kho) => (
        <p style={{ textAlign: 'center', color: 'black' }}>
          {formarDateTimeddmmyyy(ngay_Nhap_Kho.slice(0, 10))}{' '}
          {ngay_Nhap_Kho.slice(11, 19)}
        </p>
      ),
      key: 'ngay_Nhap_Kho',
    },
    {
      title: 'Chứng từ',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien',
          render(text, record) {
            return {
              props: {
                style: {
                  background: 'rgba(112, 111, 211,0.3)',
                },
              },
              children: <CustomQuantity value={record.tong_So_Kien} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong} />,
            };
          },
        },
      ],
    },
    {
      title: 'Thực Nhận',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien_Receive} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong_Receive} />,
            };
          },
        },
      ],
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_Thai_Nhap_Kho_HTML',
      key: 'trang_thai_quet_barcode',
      width: 130,
      // eslint-disable-next-line react/no-danger
      render: (trang_Thai_Nhap_Kho_HTML) => (
        <div dangerouslySetInnerHTML={createMarkup(trang_Thai_Nhap_Kho_HTML)} />
      ),
    },
    {
      title: 'GW',
      dataIndex: 'tong_GW',
      key: 'tong_GW',
      width: 100,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <CustomQuantity value={record.tong_GW} />,
        };
      },
    },
    {
      title: 'NW',
      dataIndex: 'tong_NW',
      key: 'tong_NW',
      width: 100,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <CustomQuantity value={record.tong_NW} />,
        };
      },
    },
    {
      title: 'CBM',
      dataIndex: 'tong_CBM',
      key: 'tong_CBM',
      width: 100,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <CustomQuantity value={record.tong_CBM} />,
        };
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'created_By',
      key: 'created_By',
      width: 100,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created',
      key: 'created',
      width: 120,
      render: (created) => (
        <p>
          {formarDateTimeddmmyyy(created.slice(0, 10))} {created.slice(11, 19)}
        </p>
      ),
    },
    {
      title: 'Tên NCC',
      dataIndex: 'ma_NCC',
      key: 'ma_NCC',
      width: 130,
    },
    {
      title: 'Loại Hình',
      dataIndex: 'loai_Hinh_Nhap_Kho_Text',
      key: 'loai_Hinh_Nhap_Kho_Text',
      width: 130,
    },
    {
      title: (
        <InputColumns
          fHandle={setMarket}
          title="Nơi xuất đến"
          setpage={setpage}
        />
      ),
      dataIndex: 'ten_Sieu_Thi_Full',
      key: 'ten_Sieu_Thi_Full',
      width: 130,
    },
  ];

  return (
    <>
      <CustomTitleAndColor level={2}>Quản lý nhập kho</CustomTitleAndColor>
      <Space direction="horizontal">
        <Space direction="vertical">
          <CustomTitleAndColor level={5}>Ngày nhập hàng</CustomTitleAndColor>
          <Space
            direction="horizontal"
            style={{ marginBottom: '10px' }}
          >
            <RangePicker
              className="createDateRangePicker"
              dropdownClassName="createDateRangePicker"
              onChange={onChangeValue}
              defaultValue={
                localStorage.getItem('datefromimportmanage')
                  ? [
                      dayjs(
                        localStorage.getItem('datefromimportmanage'),
                        dateFormat
                      ),
                      dayjs(
                        localStorage.getItem('datetoimportmanage'),
                        dateFormat
                      ),
                    ]
                  : [dayjs(todayformat, dateFormat), dayjs(date, dateFormat)]
              }
              format={dateFormat}
            />

            {/* <CSVLink
          data={mapImportProduct}
          headers={headers}
          onClick={() => {
            console.log('clicked');
          }}
        >
          <Button
            type="primary"
            danger
          >
            Export CSV
          </Button>
        </CSVLink> */}
          </Space>
        </Space>
        <Space direction="vertical">
          <CustomTitleAndColor
            level={5}
            style={{ marginBottom: '0px' }}
          >
            Trạng Thái
          </CustomTitleAndColor>
          <Space direction="horizontal">
            <Select
              className="select-custom"
              popupClassName="select-custom"
              defaultValue={Status}
              style={{ width: 110 }}
              onChange={handleChangeStatus}
            >
              <Option value={null}>Tất cả</Option>
              <Option value="4">New</Option>
              <Option value="1">Recieved</Option>
              <Option value="3">Complete</Option>
            </Select>
            <Button
              type="primary"
              danger
              onClick={searchFilter}
            >
              Tìm kiếm
            </Button>
          </Space>
        </Space>

        {/* <SearchCustom title="Số phiếu,ncc,nơi xuất đến" onchange={setTextSeach} /> */}
      </Space>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        scroll={{ x: 1600 }}
        dataSource={manageNhapKho}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          position: position,
          pageSizeOptions: pageOption,
        }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
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
      <ModalDetailAsn
        open={openModalDetail}
        id={dataDetail.auto_ID}
        datefrom={
          localStorage.getItem('datefromimportmanage')
            ? formatDateTime(localStorage.getItem('datefromimportmanage'))
            : DateFrom
        }
        dateto={
          localStorage.getItem('datetoimportmanage')
            ? formatDateTime(localStorage.getItem('datetoimportmanage'))
            : DateTo
        }
        arrTrangThai={[1, 3]}
        title="Chi tiết phiếu nhập kho"
        datadetail={dataDetail}
        callBackCanCel={cancelModal}
      />
    </>
  );
};

export default ManageASN;
