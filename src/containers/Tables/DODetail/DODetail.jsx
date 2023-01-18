import {
  Button,
  DatePicker,
  Radio,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import OrderDOApi from '../../../api/OrderDOApi';
import { useDebounce } from '../../../hook';
import useFormatDate from '../../../hook/useFormatDate';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import InputColumns from '../../../shared/components/InputColumns';
import ModalDetailDO2 from '../../../shared/components/ModalDetailDO2';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';

const DODetailTable = () => {
  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);

  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  const [TrangThai, setTrangThai] = useState(null);
  const [LoaiHinh, setLoaiHinh] = useState('-5');
  const [DODetail, setDODetail] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const cookies = new Cookies();
  let mapDODetail = [];

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

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);

  const showModalDetail = (data) => {
    setdatadetail(data);
    setopenModalDetail(true);
  };

  const changeValueTrangThai = (value) => {
    setTrangThai(value);
  };

  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromexport', dateString[0]);
    localStorage.setItem('datetoexport', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  const cancelModal = () => {
    setopenModalDetail(false);
  };

  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };

  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [numberAWB, setNumberAWB] = useState(null);
  const [nameProduct, setNameProduct] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedAWB = useDebounce(numberAWB, 500);
  const debouncedNameProduct = useDebounce(nameProduct, 500);

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchDODetailProduct = async () => {
      try {
        const data = {
          sortName: null,
          isAsc: false,
          page: page,
          pageCount: PageSize,
          date_From: localStorage.getItem('datefromexport')
            ? formatDateTime(localStorage.getItem('datefromexport'))
            : DateFrom,
          date_To: localStorage.getItem('datetoexport')
            ? formatDateTime(localStorage.getItem('datetoexport'))
            : DateTo,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
          trang_Thai_Xuat_Kho_ID: TrangThai ? [TrangThai] : null,
          xem_Type_ID: 1,
          loai_Hinh_Xuat_Kho_ID: LoaiHinh,
          sieu_Thi_ID: -5,
          idKeHoach: null,
          so_Phieu_Xuat_Kho: debouncedTicket || null,
          ten_San_Pham: debouncedNameProduct || null,
          so_AWB: debouncedAWB || null,
        };
        const response = await OrderDOApi.getDetail(data);
        if (response.result) {
          setDODetail(response.result);
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
      setDODetail([]);
      setTotal(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    debouncedTicket,
    debouncedNameProduct,
    debouncedAWB,
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
      width: 170,
      fixed: 'left',
      render: (text, record, index) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            const dataDetail = {
              so_Phieu_Xuat_Kho: record.so_Phieu_Xuat_Kho,
              document_No: record.document_No,
              nguoi_nhan_hang: record.nguoi_Nhan_Hang,
              ghi_Chu_Phieu_Xuat: record.ghi_Chu_Phieu_Xuat,
              loai_Hinh_Xuat_Kho_Text: record.loai_Hinh_Xuat_Kho_Text,
              ma_ncc: record.ten_NCC_6002,
              thoi_Gian_Tao: record.thoi_Gian_Tao,
              ngay_Xuat_Kho: record.ngay_Xuat_Kho,
              trang_Thai_Xuat_Kho_HTML: record.trang_Thai_Xuat_Kho_HTML,
              ma_San_Pham: record.ma_San_Pham,
              ten_San_Pham: record.ten_San_Pham,
              so_Kien_Xuat: record.so_Kien_Xuat,
              so_Luong_Xuat: record.so_Luong_Xuat,
              don_Gia_Xuat: record.don_Gia_Xuat,
              thoi_Diem_Ra_Khoi_Kho: record.thoi_Diem_Ra_Khoi_Kho,
              thoi_Diem_Auto_Pick_Hang: record.thoi_Diem_Auto_Pick_Hang,
              thoi_Diem_Xac_Nhan_Pick_Xong: record.thoi_Diem_Xac_Nhan_Pick_Xong,
            };
            return showModalDetail(dataDetail);
          }}
        >
          {record.so_Phieu_Xuat_Kho}
        </p>
      ),
    },
    {
      title: 'Ngày XK',
      dataIndex: 'ngay_Xuat_Kho',
    },
    {
      title: (
        <InputColumns
          fHandle={setNumberAWB}
          title="Số AWB"
          setpage={setpage}
        />
      ),
      dataIndex: 'so_AWB',
      width: 200,
      render: (so_AWB) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{so_AWB}</p>
      ),
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
      title: 'ĐVT',
      dataIndex: 'ten_Don_Vi_Tinh',
      width: 100,
    },
    {
      title: 'Đơn giá xuất',
      dataIndex: 'don_Gia_Xuat',
      render: (text, record) =>
        record.don_Gia_Xuat ? (
          <CurrencyFormat
            value={Number(record.don_Gia_Xuat)}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value) => (
              <span
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                }}
              >
                {value}
                {`đ`}
              </span>
            )}
          />
        ) : (
          ''
        ),
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
      title: 'Loại Hình',
      dataIndex: 'loai_Hinh_Xuat_Kho_Text',
      key: 'loai_Hinh_Xuat_Kho_Text',
    },
    {
      title: 'Giờ Tạo',
      dataIndex: 'thoi_Gian_Tao',
      key: 'thoi_Gian_Tao',
    },

    {
      title: 'Mã Loại Hàng',
      dataIndex: 'ma_Loai_San_Pham',
    },
    {
      title: 'Nơi xuất đến',
      dataIndex: 'ten_Sieu_Thi',
    },
  ];

  if (DODetail && DODetail.length !== 0) {
    mapDODetail = DODetail.map((item, index) => ({
      key: index,
      ...item,
      ngay_Xuat_Kho: item.ngay_Xuat_Kho
        ? formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10))
        : '',
      don_Gia_Xuat: item.don_Gia_Xuat ? item.don_Gia_Xuat : '',
      // eslint-disable-next-line max-len
      thoi_Diem_Ra_Khoi_Kho: item.thoi_Diem_Ra_Khoi_Kho
        ? `${formarDateTimeddmmyyy(item.thoi_Diem_Ra_Khoi_Kho.slice(0, 10))}
                                  ${item.thoi_Diem_Ra_Khoi_Kho.slice(11, 19)}`
        : '',
      thoi_Gian_Tao: item.thoi_Gian_Tao
        ? `${formarDateTimeddmmyyy(item.thoi_Gian_Tao.slice(0, 10))}
       ${item.thoi_Gian_Tao.slice(11, 19)}`
        : '',
    }));
  }

  return (
    <>
      <CustomTitleAndColor level={2}>Chi Tiết Hàng Xuất</CustomTitleAndColor>
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
                localStorage.getItem('datefromexport')
                  ? [
                      dayjs(localStorage.getItem('datefromexport'), dateFormat),
                      dayjs(localStorage.getItem('datetoexport'), dateFormat),
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
              defaultValue={null}
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
        // expandable={{
        //   rowExpandable: (record) => true,
        //   expandedRowRender: (record) => (
        //     <table>
        //       <thead className="ant-table-thead">
        //         <tr>
        //           <th className="ant-table-cell">KH Kiện</th>
        //           <th className="ant-table-cell">KH SL</th>
        //           <th className="ant-table-cell">ĐP Kiện</th>
        //           <th className="ant-table-cell">ĐP SL</th>
        //           <th className="ant-table-cell">PX Kiện</th>
        //           <th className="ant-table-cell">PX SL</th>
        //           <th className="ant-table-cell">HT Kiện</th>
        //           <th className="ant-table-cell">HT SL</th>
        //           <th className="ant-table-cell">Shipped Time</th>
        //         </tr>
        //       </thead>
        //       <tr className="ant-table-row">
        //         <td>{record.so_Kien_Xuat}</td>
        //         <td>{record.so_Luong_Xuat}</td>
        //         <td>{record.so_Kien_Cho_Pick}</td>
        //         <td>{record.so_Luong_Cho_Pick}</td>
        //         <td>{record.so_Kien_Pick_Xong}</td>
        //         <td>{record.so_Luong_Pick_Xong}</td>
        //         <td>{record.so_Kien_Ra_Khoi_Kho}</td>
        //         <td>{record.so_Luong_Ra_Khoi_Kho}</td>
        //         <td>{record.thoi_Diem_Ra_Khoi_Kho}</td>
        //       </tr>
        //     </table>
        //   ),
        // }}
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
      <ModalDetailDO2
        open={openModalDetail}
        title="Chi tiết phiếu nhập kho"
        datadetail={datadetail}
        callBackCanCel={cancelModal}
      />
    </>
  );
};
export default DODetailTable;
