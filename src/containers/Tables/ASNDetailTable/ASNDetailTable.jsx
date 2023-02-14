/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  Checkbox,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import OrderASNApi from '../../../api/OrderASNApi';
import { useDebounce } from '../../../hook';
import useFormatDate from '../../../hook/useFormatDate';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import InputColumns from '../../../shared/components/InputColumns';
import ModalDetailASN2 from '../../../shared/components/ModalDetailASN2';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';

const ASNDetailTable = () => {
  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  const [ASNDetail, setASNDetail] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const loading = useSelector((state) => state.loading);
  const [Status, setStatus] = useState(null);
  const [InputType, setInputType] = useState('-5');
  const [all, setAll] = useState(false);

  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  let mapASNDetail = [];

  // ? state component
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

  const [datadetail, setdatadetail] = useState('');
  const [openModalDetail, setopenModalDetail] = useState(false);
  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [nameProduct, setNameProduct] = useState(null);
  const [tenNCC, setTenNCC] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedProduct = useDebounce(nameProduct, 500);
  const debouncedNCC = useDebounce(tenNCC, 500);

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);

  // ?
  const showModalDetail = (data) => {
    // setautoId(data.id);
    setdatadetail(data);
    setopenModalDetail(true);
  };

  const cancelModal = () => {
    setopenModalDetail(false);
  };

  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromimportdetail', dateString[0]);
    localStorage.setItem('datetoimportdetail', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  const items = [
    {
      label: 'Sửa Phiếu Nhập',
      key: '1',
      icon: <PlusCircleOutlined />,
    },
    {
      label: 'Nhận Hàng',
      key: '2',
      icon: <FormOutlined />,
    },
  ];
  const menuProps = {
    items,
  };
  const handleChangeStatus = (value) => {
    setStatus(value);
  };

  const handleChangeInputType = (value) => {
    setInputType(value);
  };
  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };
  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    if (cookies.get('idchuhang')) {
      const fetchASNDetailProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromimportdetail')
              ? formatDateTime(localStorage.getItem('datefromimportdetail'))
              : DateFrom,
            date_To: localStorage.getItem('datetoimportdetail')
              ? formatDateTime(localStorage.getItem('datetoimportdetail'))
              : DateTo,
            chu_Hang_ID: all ? null : cookies.get('idchuhang'),
            kho_ID: 2631604,
            loai_Hinh_Nhap_Kho_ID: InputType,
            idKeHoach: null,
            trang_Thai_Nhap_Kho_ID: Status ? [Status] : null,
            so_Phieu_Nhap_Kho: debouncedTicket ? debouncedTicket : null,
            ten_San_Pham: debouncedProduct ? debouncedProduct : null,
            ten_NCC: debouncedNCC ? debouncedNCC : null,
          };
          const response = await OrderASNApi.getDetail(data);
          if (response.result) {
            setASNDetail(response.result);
            dispatch(Changeloading({ loading: false }));
            setTotal(response.total);
          } else {
            dispatch(Changeloading({ loading: false }));
          }
        } catch (error) {
          dispatch(Changeloading({ loading: false }));
        }
      };
      fetchASNDetailProduct();
    }
    return () => {
      setASNDetail([]);
      dispatch(Changeloading({ loading: false }));
      setTotal(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    debouncedTicket,
    debouncedProduct,
    debouncedNCC,
    isSearchDate,
    all,
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
      fixed: 'left',
      width: 200,
      render: (value, record) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            const dataDetail = {
              so_Phieu_Nhap_Kho: record.so_Phieu_Nhap_Kho,
              ngay_Nhap_Kho: record.ngay_Nhap_Kho,
              ma_San_Pham: record.ma_San_Pham,
              ten_San_Pham: record.ten_San_Pham,
              so_Xe_Nhap_Hang: record.so_Xe_Nhap_Hang,
              ghi_Chu: record.ghi_Chu,
              loai_Hinh_Nhap_Kho_Text: record.loai_Hinh_Nhap_Kho_Text,
              ten_sieu_thi: record.ten_Sieu_Thi_6001,
              ten_NCC: record.ten_NCC,
              trang_thai_nhap_kho: record.trang_Thai_Nhap_Kho_HTML,
              so_Kien: record.so_Kien,
              so_Luong: record.so_Luong,
              so_Kien_Receive: record.so_Kien_Receive,
              so_Luong_Receive: record.so_Luong_Receive,
              so_Batch: record.so_batch,
              ngay_San_Xuat: record.ngay_San_Xuat,
              ngay_Het_Han: record.ngay_Het_Han,
              life: record.life,
              tong_GW: record.tong_GW,
              tong_NW: record.tong_NW,
              tong_CBM: record.tong_CBM,
              tong_GW_Receive: record.tong_GW_Receive,
              tong_NW_Receive: record.tong_NW_Receive,
              tong_CBM_Receive: record.tong_CBM_Receive,
            };

            return showModalDetail(dataDetail);
          }}
        >
          {record.so_Phieu_Nhap_Kho}
        </p>
      ),
    },
    {
      title: 'Ngày NK',
      dataIndex: 'ngay_Nhap_Kho',
      width: 110,
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
      width: 220,
      ellipsis: {
        showTitle: true,
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
      title: 'Tên ĐVT',
      dataIndex: 'ten_Don_Vi_Tinh',
      width: 80,
    },
    {
      title: (
        <InputColumns
          fHandle={setTenNCC}
          title="Tên NCC"
          setpage={setpage}
        />
      ),
      dataIndex: 'ma_NCC',
      key: 'ma_NCC',
    },
    {
      title: 'Loại Hình',
      dataIndex: 'loai_Hinh_Nhap_Kho_Text',
      key: 'Ma_NCC',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_Thai_Nhap_Kho_HTML',
      key: 'trang_thai_quet_barcode',
      width: 120,
      // eslint-disable-next-line react/no-danger
      render: (trang_Thai_Nhap_Kho_HTML) => (
        <div dangerouslySetInnerHTML={createMarkup(trang_Thai_Nhap_Kho_HTML)} />
      ),
    },
    {
      title: 'Ngày SX',
      dataIndex: 'ngay_San_Xuat',
      key: 'Ngay_Ke_Hoach',
    },
    {
      title: 'Ngày Hết Hạn',
      dataIndex: 'ngay_Het_Han',
      key: 'Ref_No',
    },
    {
      title: 'Life(%)',
      dataIndex: 'life',
      key: 'Ma_NCC',
    },
  ];

  if (ASNDetail && ASNDetail.length !== 0) {
    mapASNDetail = ASNDetail.map((item, index) => ({
      key: index,
      ...item,
      ngay_Nhap_Kho: item.ngay_Nhap_Kho
        ? formarDateTimeddmmyyy(item.ngay_Nhap_Kho.slice(0, 10))
        : '',
      ngay_San_Xuat: item.ngay_San_Xuat
        ? formarDateTimeddmmyyy(item.ngay_San_Xuat.slice(0, 10))
        : '',
      ngay_Het_Han: item.ngay_Het_Han
        ? formarDateTimeddmmyyy(item.ngay_Het_Han.slice(0, 10))
        : '',
    }));
  }

  return (
    <>
      <CustomTitleAndColor level={2}>Chi Tiết Hàng Nhập</CustomTitleAndColor>
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
                localStorage.getItem('datefromimportdetail')
                  ? [
                      dayjs(
                        localStorage.getItem('datefromimportdetail'),
                        dateFormat
                      ),
                      dayjs(
                        localStorage.getItem('datetoimportdetail'),
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
          <CustomTitleAndColor level={5}>Loại hình nhập</CustomTitleAndColor>
          <Space
            direction="horizontal"
            style={{ marginBottom: '10px' }}
          >
            <Select
              className="select-custom"
              popupClassName="select-custom"
              defaultValue={InputType}
              style={{ width: 160 }}
              onChange={handleChangeInputType}
            >
              <Option value="-5">Tất cả</Option>
              <Option value="1">Nhập từ NCC</Option>
              <Option value="2">Nhập Trả Hàng</Option>
              <Option value="3">Nhập Nội Bộ</Option>
              <Option value="4">Nhập Hủy Pick Xong</Option>
            </Select>
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
              defaultValue={Status}
              style={{ width: 100 }}
              onChange={handleChangeStatus}
            >
              <Option value={null}>Tất cả</Option>
              <Option value="4">New</Option>
              <Option value="1">Recieved</Option>
              <Option value="3">Complete</Option>
            </Select>
            <Checkbox
              className="custom-checkbox"
              onChange={() => setAll(!all)}
            >
              Tất cả chủ hàng
            </Checkbox>
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
        // expandable={{
        //   rowExpandable: (record) => true,
        //   expandedRowRender: (record) => (
        //     <table>
        //       <thead className="ant-table-thead">
        //         <tr>
        //           <th className="ant-table-cell">CT Kiện</th>
        //           <th className="ant-table-cell">CT SL</th>
        //           <th className="ant-table-cell">CT NW</th>
        //           <th className="ant-table-cell">CT GW</th>
        //           <th className="ant-table-cell">TT CBM</th>
        //           <th className="ant-table-cell">TT Kiện</th>
        //           <th className="ant-table-cell">TT SL</th>
        //           <th className="ant-table-cell">TT NW</th>
        //           <th className="ant-table-cell">TT GW</th>
        //           <th className="ant-table-cell">TT CBM</th>
        //         </tr>
        //       </thead>
        //       <tr className="ant-table-row">
        //         <td>{record.so_Kien}</td>
        //         <td>{record.so_Luong}</td>
        //         <td>{record.tong_GW}</td>
        //         <td>{record.tong_NW}</td>
        //         <td>{record.tong_CBM}</td>
        //         <td>{record.so_Kien_Receive}</td>
        //         <td>{record.so_Luong_Receive}</td>
        //         <td>{record.tong_GW_Receive}</td>
        //         <td>{record.tong_NW_Receive}</td>
        //         <td>{record.tong_CBM_Receive}</td>
        //       </tr>
        //     </table>
        //   ),
        // }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        dataSource={mapASNDetail}
        scroll={{ x: 1500 }}
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
      <ModalDetailASN2
        open={openModalDetail}
        title="Chi tiết phiếu nhập kho"
        datadetail={datadetail}
        callBackCanCel={cancelModal}
      />
    </>
  );
};
export default ASNDetailTable;
