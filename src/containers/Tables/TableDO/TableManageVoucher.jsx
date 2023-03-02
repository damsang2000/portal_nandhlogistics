/* eslint-disable react/jsx-indent-props */
/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { Table, Select, DatePicker, Space, Button, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import dayjs from 'dayjs';
import CustomLoading from '../../../shared/components/CustomLoading';
import { Changeloading } from '../../../redux/actions/loadingAction';
import { formatDateTime, formarDateTimeddmmyyy } from '../../../shared/helpers';
import OrderDOApi from '../../../api/OrderDOApi';
import ModalDetailDO3 from '../../../shared/components/ModalDetailDO3';
import { useDebounce } from '../../../hook';
import usePagination from '../../../hook/usePagination';
import useFormatDate from '../../../hook/useFormatDate';
import ShowMoreText from 'react-show-more-text';
import InputColumns from '../../../shared/components/InputColumns';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import ContenNoData from '../../../shared/components/ContenNoData';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';

const TableManageVoucher = () => {
  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  const [TrangThai, setTrangThai] = useState(null);
  const [LoaiHinh, setLoaiHinh] = useState('-5');
  const [DODetail, setDODetail] = useState([]);

  //? state extension
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const cookies = new Cookies();
  let mapDODetail = [];
  let detail = [];

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

  // ? state component
  const [dataDetail, setDataDetail] = useState([]);

  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [numberAWB, setNumberAWB] = useState(null);
  const [market, setMarket] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedAWB = useDebounce(numberAWB, 500);
  const debouncedMarket = useDebounce(market, 500);

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);

  // ? state component
  const [open, setOpen] = useState(false);
  // ? handle open
  const showModal = (data) => {
    setDataDetail(data);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const changeValueTrangThai = (value) => {
    setTrangThai(value);
  };

  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromexportmanage', dateString[0]);
    localStorage.setItem('datetoexportmanage', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchListPhieuXuatPickXong = async () => {
      try {
        const data = {
          date_From: localStorage.getItem('datefromexportmanage')
            ? formatDateTime(localStorage.getItem('datefromexportmanage'))
            : DateFrom,
          date_To: localStorage.getItem('datetoexportmanage')
            ? formatDateTime(localStorage.getItem('datetoexportmanage'))
            : DateTo,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: Number(localStorage.getItem('kho_id')),
          trang_Thai_ID: TrangThai,
          page: page,
          pageCount: PageSize,
          so_Phieu_Xuat_Kho: debouncedTicket || null,
          so_AWB: debouncedAWB || null,
          noiXuatDen: debouncedMarket || null,
        };
        const response = await OrderDOApi.getAllPickComplete(data);

        setDODetail(response.result);
        dispatch(Changeloading({ loading: false }));
        setTotal(response.total);
      } catch (error) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchListPhieuXuatPickXong();
    return () => {
      setDODetail([]);
      dispatch(Changeloading({ loading: false }));
      setTotal(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    idKho.idKho,
    page,
    PageSize,
    debouncedTicket,
    debouncedAWB,
    debouncedMarket,
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
      dataIndex: 'so_Phieu_Xuat_Kho',
      key: 'so_Phieu_Xuat_Kho',
      width: 160,
      fixed: 'left',
      render: (text, record) => (
        <p
          className="style-hover"
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => {
            showModal(record);
          }}
        >
          {record.so_Phieu_Xuat_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Xuat_Kho.includes(value),
    },
    {
      title: 'Ngày XK',
      dataIndex: 'ngay_Xuat_Kho',
      width: 120,
    },
    {
      title: (
        <InputColumns
          fHandle={setNumberAWB}
          title="Số AWB"
          setpage={setpage}
        />
      ),
      width: 150,
      dataIndex: 'so_AWB',
      render: (so_AWB) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{so_AWB}</p>
      ),
    },
    {
      title: 'Kế hoạch',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien_Pick',
          width: 70,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien_Pick} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong_Pick',
          width: 70,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong_Pick} />,
            };
          },
        },
      ],
    },
    {
      title: 'Thực xuất',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien_Xuat',
          width: 70,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien_Xuat} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong_Xuat',
          width: 70,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong_Xuat} />,
            };
          },
        },
      ],
    },
    {
      title: 'CBM',
      dataIndex: 'CBM',
      width: 70,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_Thai_Xuat_Kho_HTML',
      key: 'trang_thai_quet_barcode',
      // eslint-disable-next-line react/no-danger
      render: (trang_Thai_Xuat_Kho_HTML) => (
        <div dangerouslySetInnerHTML={createMarkup(trang_Thai_Xuat_Kho_HTML)} />
      ),
    },
    {
      title: (
        <InputColumns
          fHandle={setMarket}
          title="Nơi xuất đến"
          setpage={setpage}
        />
      ),
      width: 250,
      dataIndex: 'ten_Sieu_Thi_Full',
      render: (ten_Sieu_Thi_Full) => (
        <ShowMoreText
          lines={3}
          more=">>"
          less="Thu gọn"
        >
          <div dangerouslySetInnerHTML={createMarkup(ten_Sieu_Thi_Full)} />
        </ShowMoreText>
      ),
    },
    {
      title: 'Loại đơn',
      dataIndex: 'loai_Don_Text',
      width: 100,
    },
    {
      title: 'Khu vực',
      dataIndex: 'khu_Vuc_Text',
      width: 100,
    },
    {
      title: 'Nhóm hàng',
      dataIndex: 'loai_San_Pham_Text',
      render: (loai_San_Pham_Text) => (
        <div dangerouslySetInnerHTML={createMarkup(loai_San_Pham_Text)} />
      ),
    },

    {
      title: 'Loại',
      dataIndex: 'loai_Hinh_Xuat_Kho_Text',
      key: 'loai_Hinh_Xuat_Kho_Text',
    },
  ];

  if (DODetail && DODetail.length !== 0) {
    mapDODetail = DODetail.map((item, index) => ({
      key: index,
      ...item,
      ngay_Xuat_Kho: item.ngay_Xuat_Kho
        ? formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10))
        : '',
    }));
    detail = [...mapDODetail];
  }

  return (
    <>
      <CustomTitleAndColor level={2}>Quản lý phiếu xuất</CustomTitleAndColor>
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
              defaultValue={
                localStorage.getItem('datefromexportmanage')
                  ? [
                      dayjs(
                        localStorage.getItem('datefromexportmanage'),
                        dateFormat
                      ),
                      dayjs(
                        localStorage.getItem('datetoexportmanage'),
                        dateFormat
                      ),
                    ]
                  : [dayjs(todayformat, dateFormat), dayjs(date, dateFormat)]
              }
              format={dateFormat}
              onChange={onChangeValue}
            />
          </Space>
        </Space>
        <Space direction="vertical">
          <CustomTitleAndColor level={5}>Trạng Thái</CustomTitleAndColor>
          <Space
            direction="horizontal"
            style={{ marginBottom: '10px' }}
          >
            <Select
              className="select-custom"
              popupClassName="select-custom"
              defaultValue={TrangThai}
              onChange={changeValueTrangThai}
              style={{ width: 100 }}
            >
              <Option value={null}>Tất cả</Option>
              <Option value="1">New</Option>
              <Option value="2">Allocated</Option>
              <Option value="3">Picked</Option>
              <Option value="4">Shipped</Option>
            </Select>
          </Space>
        </Space>
        <Space>
          <Radio.Group
            style={{
              marginTop: '29px',
              border: '1px solid #d9d9d9',
              padding: '4px 5px',
              borderRadius: '6px',
              backgroundColor: 'white',
            }}
            defaultValue="1"
          >
            <Radio
              value="1"
              className="custom-radio"
            >
              Ngày xuất
            </Radio>
            <Radio
              value="2"
              className="custom-radio"
            >
              Ngày ra kho
            </Radio>
          </Radio.Group>
        </Space>
        <Space direction="vertical">
          <CustomTitleAndColor level={5}>Loại hình</CustomTitleAndColor>
          <Space
            direction="horizontal"
            style={{ marginBottom: '10px' }}
          >
            <Select
              className="select-custom"
              popupClassName="select-custom"
              defaultValue="-5"
              style={{ width: 130 }}
              onChange={(value) => setLoaiHinh(value)}
            >
              <Option value="-5">Tất cả</Option>
              <Option value="1">Xuất thường</Option>
              <Option value="2">Xuất trả NCC</Option>
              <Option value="3">Xuất nội bộ</Option>
              <Option value="4">Xuất kho VAS</Option>
            </Select>
          </Space>
        </Space>
        <Space direction="vertical">
          <CustomTitleAndColor level={5}>Nơi xuất đến</CustomTitleAndColor>
          <Space
            direction="horizontal"
            style={{ marginBottom: '10px' }}
          >
            <Select
              className="select-custom"
              popupClassName="select-custom"
              defaultValue="-5"
              style={{ width: 250 }}
            >
              <Option value="-5">Tất cả</Option>
              <Option value="1">CTY TNHH MTV DIRECT SERVICES</Option>
              <Option value="2">Viettel Post</Option>
              <Option value="3">GHN_GHN-Giao Hàng Nhanh</Option>
            </Select>
            <Button
              type="primary"
              danger
              className="custom-button1"
              onClick={searchFilter}
            >
              Tìm kiếm
            </Button>
          </Space>
        </Space>
      </Space>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        expandable={{
          rowExpandable: (record) => true,
          expandedRowRender: (record) => (
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th className="ant-table-cell">Thời gian tạo đơn</th>
                  <th className="ant-table-cell">Thời gian Auto Pick</th>
                  <th className="ant-table-cell">Thời gian pick xong</th>
                  <th className="ant-table-cell">Thời gian ra khỏi kho</th>
                </tr>
              </thead>
              <tr className="ant-table-row">
                <td>{record.created}</td>
                <td>{record.thoi_Diem_Auto_Pick_Hang}</td>
                <td>{record.thoi_Diem_Xac_Nhan_Pick_Xong}</td>
                <td>{record.thoi_Diem_Ra_Khoi_Kho}</td>
              </tr>
            </table>
          ),
        }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        dataSource={mapDODetail}
        scroll={{ x: 1600 }}
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
      <ModalDetailDO3
        open={open}
        callBackCanCel={handleCancel}
        datefrom={DateFrom}
        dateto={DateTo}
        title="Chi tiết đơn hàng chờ xử lý"
        id={dataDetail.auto_ID}
        arrTrangThai={TrangThai ? [TrangThai] : null}
        datadetail={dataDetail}
      />
    </>
  );
};
export default TableManageVoucher;
