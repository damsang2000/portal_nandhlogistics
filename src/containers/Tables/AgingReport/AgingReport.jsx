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
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import TonKhoApi from '../../../api/TonKhoApi';
import { useDebounce } from '../../../hook';
import useFormatDate from '../../../hook/useFormatDate';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import InputColumns from '../../../shared/components/InputColumns';
import ListItem from '../../../shared/components/ListItem';
import { formatDateTime } from '../../../shared/helpers';

const AgingReport = () => {
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

  const [AgingReportProduct, setAgingReportProduct] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const loading = useSelector((state) => state.loading);
  const cookie = new Cookies();
  const { Title } = Typography;
  const dispatch = useDispatch();
  let mapAgingReport = [];

  // ? state component

  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  const [isChangeDate, setIsChangeDate] = useState(false);
  const [maHang, setMaHang] = useState('');

  // ? state extension
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const cookies = new Cookies();

  // ? onchange format date value
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);

    localStorage.setItem('datefromxuatnhapton', dateString[0]);
    localStorage.setItem('datetoxuatnhapton', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };
  //? state debounced
  // ! state debounced
  const [numberProduct, setNumberProduct] = useState(null);
  const [productName, setProductName] = useState(null);
  const debouncedNumberProduct = useDebounce(numberProduct, 500);
  const debouncedProductName = useDebounce(productName, 500);

  // ? search filter
  const searchFilter = () => {
    setpage(1);
    setIsChangeDate(!isChangeDate);
  };

  // call api
  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    if (cookie.get('idchuhang')) {
      const fetchAgingReport = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromxuatnhapton')
              ? formatDateTime(localStorage.getItem('datefromxuatnhapton'))
              : DateFrom,
            date_To: localStorage.getItem('datetoxuatnhapton')
              ? formatDateTime(localStorage.getItem('datetoxuatnhapton'))
              : DateTo,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: 2631604,
            san_Pham_ID: maHang || -5,
            xem_Type_ID: 1,
            ma_San_Pham: debouncedNumberProduct || null,
            ten_San_Pham: debouncedProductName || null,
          };
          const response = await TonKhoApi.getXuatNhapTon(data);
          setAgingReportProduct(response.result);
          dispatch(Changeloading({ loading: false }));
          setTotal(response.total);
        } catch (error) {
          dispatch(Changeloading({ loading: false }));
        }
      };
      fetchAgingReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    debouncedNumberProduct,
    debouncedProductName,
    isChangeDate,
  ]);

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
      title: 'Tên ĐVT',
      dataIndex: 'ten_Don_Vi_Tinh',
    },
    {
      title: 'Ctn',
      children: [
        {
          title: 'Đầu Kỳ',
          dataIndex: 'so_Kien_Dau_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Dau_Ky} />,
            };
          },
        },
        {
          title: 'Nhập',
          dataIndex: 'so_Kien_Nhap_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Nhap_Trong_Ky} />,
            };
          },
        },
        {
          title: 'Xuất',
          dataIndex: 'so_Kien_Xuat_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Xuat_Trong_Ky} />,
            };
          },
        },
        {
          title: 'DC Tồn',
          dataIndex: 'so_Kien_Dieu_Chinh_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: (
                <CustomQuantity value={record.so_Kien_Dieu_Chinh_Trong_Ky} />
              ),
            };
          },
        },
        {
          title: 'Cuối Kỳ',
          dataIndex: 'so_Kien_Cuoi_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Cuoi_Ky} />,
            };
          },
        },
      ],
    },
    {
      title: 'Qty',
      children: [
        {
          title: 'Đầu Kỳ',
          dataIndex: 'so_Luong_Dau_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.so_Luong_Dau_Ky} />,
            };
          },
        },
        {
          title: 'Nhập',
          dataIndex: 'so_Luong_Nhap_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <CustomQuantity value={record.so_Luong_Nhap_Trong_Ky} />
              ),
            };
          },
        },
        {
          title: 'Xuất',
          dataIndex: 'so_Luong_Xuat_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <CustomQuantity value={record.so_Luong_Xuat_Trong_Ky} />
              ),
            };
          },
        },
        {
          title: 'DC Tồn',
          dataIndex: 'so_Luong_Dieu_Chinh_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <CustomQuantity value={record.so_Luong_Dieu_Chinh_Trong_Ky} />
              ),
            };
          },
        },
        {
          title: 'Cuối Kỳ',
          dataIndex: 'so_Luong_Cuoi_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.so_Luong_Cuoi_Ky} />,
            };
          },
        },
      ],
    },
    {
      title: 'Amount',
      children: [
        {
          title: 'Đầu Kỳ',
          dataIndex: 'tri_Gia_Dau_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tri_Gia_Dau_Ky}</div>,
            };
          },
        },
        {
          title: 'Nhập',
          dataIndex: 'tri_Gia_Nhap_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tri_Gia_Nhap_Trong_Ky}</div>,
            };
          },
        },
        {
          title: 'Xuất',
          dataIndex: 'tri_Gia_Xuat_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tri_Gia_Xuat_Trong_Ky}</div>,
            };
          },
        },
        {
          title: 'DC Tồn',
          dataIndex: 'tri_Gia_Dieu_Chinh_Trong_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tri_Gia_Dieu_Chinh_Trong_Ky}</div>,
            };
          },
        },
        {
          title: 'Cuối Kỳ',
          dataIndex: 'tri_Gia_Cuoi_Ky',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tri_Gia_Cuoi_Ky}</div>,
            };
          },
        },
      ],
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'Trang_Thai_Xuat_Kho_HTML',
    //   key: 'trang_thai_quet_barcode',
    //   // eslint-disable-next-line react/no-danger
    //   render: Trang_Thai_Xuat_Kho_HTML => <div dangerouslySetInnerHTML={createMarkup(Trang_Thai_Xuat_Kho_HTML)} />,
    // },
  ];

  //  map data
  if (AgingReportProduct && AgingReportProduct.length !== 0) {
    mapAgingReport = AgingReportProduct.map((item, index) => ({
      key: index,
      ...item,
      ngay_Dieu_Chinh: item.ngay_Dieu_Chinh
        ? item.ngay_Dieu_Chinh.slice(0, 10)
        : '',
    }));
  }

  return (
    <>
      <Space direction="vertical">
        <CustomTitleAndColor level={2}>Xuất Nhập Tồn</CustomTitleAndColor>
        <Space direction="vertical">
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
                    localStorage.getItem('datefromxuatnhapton')
                      ? [
                          dayjs(
                            localStorage.getItem('datefromxuatnhapton'),
                            dateFormat
                          ),
                          dayjs(
                            localStorage.getItem('datetoxuatnhapton'),
                            dateFormat
                          ),
                        ]
                      : [
                          dayjs(todayformat, dateFormat),
                          dayjs(date, dateFormat),
                        ]
                  }
                  format={dateFormat}
                  onChange={onChangeValue}
                />
              </Space>
            </Space>
            <ListItem
              idchuhang={cookies.get('idchuhang')}
              handleMaHang={setMaHang}
            />
            <Space direction="horizontal">
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
              <Space direction="vertical">
                <div />
                <div />
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
          <Space direction="horizontal">
            <Space direction="vertical">
              <CustomTitleAndColor level={5}>ĐV Xem</CustomTitleAndColor>
              <Space
                direction="horizontal"
                style={{ marginBottom: '10px' }}
              >
                <Select
                  className="select-custom"
                  popupClassName="select-custom"
                  defaultValue="-5"
                  style={{ width: 130 }}
                  // onChange={value => setLoaiHinh(value)}
                >
                  <Option value="-5">Ctn</Option>
                  <Option value="1">Qty</Option>
                  <Option value="2">GW</Option>
                  <Option value="3">CBM</Option>
                </Select>
              </Space>
            </Space>
            <Space direction="vertical">
              <CustomTitleAndColor level={5}>Mẫu in</CustomTitleAndColor>
              <Space
                direction="horizontal"
                style={{ marginBottom: '10px' }}
              >
                <Select
                  className="select-custom"
                  popupClassName="select-custom"
                  defaultValue="1"
                  style={{ width: 150 }}
                >
                  <Option value="1">Theo SKU</Option>
                  <Option value="2">Theo ngày</Option>
                  <Option value="3">Theo lô</Option>
                </Select>
              </Space>
            </Space>
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
                  <th className="ant-table-cell">GW</th>
                  <th className="ant-table-cell">NW</th>
                  <th className="ant-table-cell">CBM</th>
                  <th className="ant-table-cell">Mã Loại Hàng</th>
                </tr>
              </thead>
              <tr className="ant-table-row">
                <td>{record.gW_Cuoi_Ky}</td>
                <td>{record.nW_Cuoi_Ky}</td>
                <td>{record.cBM_Cuoi_Ky}</td>
                <td>{record.ma_Loai_San_Pham}</td>
              </tr>
            </table>
          ),
        }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        dataSource={mapAgingReport}
        scroll={{ x: 1700 }}
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
export default AgingReport;
