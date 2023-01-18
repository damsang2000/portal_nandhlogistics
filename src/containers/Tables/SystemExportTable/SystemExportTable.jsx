import { Button, DatePicker, Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import SystemApi from '../../../api/SystemApi';
import { useDebounce } from '../../../hook';
import useFormatDate from '../../../hook/useFormatDate';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import InputColumns from '../../../shared/components/InputColumns';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';
import ModalDetailSystemExport from './ModalDetailSystemExport';

const SystemExportTable = () => {
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

  const [systemExportTable, setSystemExportTable] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const loading = useSelector((state) => state.loading);
  const { Title } = Typography;
  let mapSystemExportTable = [];

  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  const [openmodal, setopenmodal] = useState(false);
  const [datadetail, setdatadetail] = useState('');

  //

  // ? system state
  const dispatch = useDispatch();
  const cookies = new Cookies();
  //

  // ? extension
  const { RangePicker } = DatePicker;
  //

  // ? onchange datetime value function
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromsystemexport', dateString[0]);
    localStorage.setItem('datetosystemexport', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  const showModalDetail = (data) => {
    setdatadetail(data);
    setopenmodal(true);
  };
  const cancelModalDetail = () => {
    setopenmodal(false);
  };

  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [numberAWB, setNumberAWB] = useState(null);
  const [market, setMarket] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedAWB = useDebounce(numberAWB, 500);
  const debouncedMarket = useDebounce(market, 500);

  // ? function handle filter
  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchCategoryProduct = async () => {
      try {
        const data = {
          sortName: null,
          isAsc: true,
          page: page,
          pageCount: PageSize,
          date_From: localStorage.getItem('datefromsystemexport')
            ? formatDateTime(localStorage.getItem('datefromsystemexport'))
            : DateFrom,
          date_To: localStorage.getItem('datetosystemexport')
            ? formatDateTime(localStorage.getItem('datetosystemexport'))
            : DateTo,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
          xem_Type_ID: 1,
          trang_Thai_ID: -5,
          so_Phieu_Xuat_Kho: debouncedTicket || null,
          so_AWB: debouncedAWB || null,
          ten_Sieu_Thi_Full: debouncedMarket || null,
        };
        const response = await SystemApi.getSystemXuatKho(data);
        if (response.result) {
          setTotal(response.total);
          setSystemExportTable(response.result);
          dispatch(Changeloading({ loading: false }));
        } else {
          dispatch(Changeloading({ loading: false }));
        }
      } catch (error) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchCategoryProduct();
    return () => {
      setTotal(0);
      setSystemExportTable([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    debouncedTicket,
    debouncedAWB,
    debouncedMarket,
    isSearchDate,
  ]);
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
      width: 150,
      fixed: 'left',
      render: (text, record) => (
        <p
          className="style-hover"
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => {
            showModalDetail(record);
          }}
        >
          {record.so_Phieu_Xuat_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Xuat_Kho.includes(value),
    },
    {
      title: 'Ngày Xuất',
      dataIndex: 'ngay_Xuat_Kho',
      width: 110,
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
      render: (so_AWB) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{so_AWB}</p>
      ),
      width: 200,
    },
    {
      title: 'Kế Hoạch',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien_Xuat_1',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien_Xuat_1} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong_Xuat_1',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong_Xuat_1} />,
            };
          },
        },
      ],
    },
    {
      title: 'Đã Pick',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien_Pick',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien_Pick} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong_Pick',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong_Pick} />,
            };
          },
        },
      ],
    },
    {
      title: 'Ngày Đặt Hàng',
      dataIndex: 'ngay_Gio_Dat_Hang',
      width: 120,
    },
    {
      title: 'TG Auto Pick',
      dataIndex: 'thoi_Diem_Auto_Pick_Hang',
      width: 120,
    },
    {
      title: 'TG Pick Xong',
      dataIndex: 'thoi_Diem_Xac_Nhan_Pick_Xong',
      width: 120,
    },
    {
      title: 'TG Ra Kho',
      dataIndex: 'thoi_Diem_Ra_Khoi_Kho',
      width: 120,
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
      width: 120,
    },
  ];

  if (systemExportTable && systemExportTable.length !== 0) {
    mapSystemExportTable = systemExportTable.map((item, index) => ({
      key: index,
      ...item,
      ngay_Xuat_Kho: item.ngay_Xuat_Kho
        ? formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10))
        : '',
      ngay_Gio_Dat_Hang: item.ngay_Gio_Dat_Hang
        ? `${formarDateTimeddmmyyy(item.ngay_Gio_Dat_Hang.slice(0, 10))}
       ${item.ngay_Gio_Dat_Hang.slice(11, 19)}`
        : '',
      // eslint-disable-next-line max-len
      thoi_Diem_Auto_Pick_Hang: item.thoi_Diem_Auto_Pick_Hang
        ? `${formarDateTimeddmmyyy(item.thoi_Diem_Auto_Pick_Hang.slice(0, 10))}
       ${item.thoi_Diem_Auto_Pick_Hang.slice(11, 19)}`
        : '',
      thoi_Diem_Xac_Nhan_Pick_Xong: item.thoi_Diem_Xac_Nhan_Pick_Xong
        ? `${formarDateTimeddmmyyy(
            item.thoi_Diem_Xac_Nhan_Pick_Xong.slice(0, 10)
          )}
                                     ${item.thoi_Diem_Xac_Nhan_Pick_Xong.slice(
                                       11,
                                       19
                                     )}`
        : '',
      thoi_Diem_Ra_Khoi_Kho: item.thoi_Diem_Ra_Khoi_Kho
        ? `${formarDateTimeddmmyyy(item.thoi_Diem_Ra_Khoi_Kho.slice(0, 10))}
                                     ${item.thoi_Diem_Ra_Khoi_Kho.slice(
                                       11,
                                       19
                                     )}`
        : '',
    }));
  }

  return (
    <>
      <CustomTitleAndColor level={2}>Xuất Kho</CustomTitleAndColor>
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
                localStorage.getItem('datefromsystemexport')
                  ? [
                      dayjs(
                        localStorage.getItem('datefromsystemexport'),
                        dateFormat
                      ),
                      dayjs(
                        localStorage.getItem('datetosystemexport'),
                        dateFormat
                      ),
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
        scroll={{ x: 1400 }}
        // expandable={{
        //   rowExpandable: (record) => true,
        //   expandedRowRender: (record) => (
        //     <table>
        //       <thead className="ant-table-thead">
        //         <tr>
        //           <th className="ant-table-cell">TG Auto Pick</th>
        //           <th className="ant-table-cell">TG Pick Xong</th>
        //           <th className="ant-table-cell">TG Ra Kho</th>
        //           <th className="ant-table-cell">Ngày Đặt Hàng</th>
        //           <th className="ant-table-cell">Nơi Xuất Đến</th>
        //         </tr>
        //       </thead>
        //       <tr className="ant-table-row">
        //         <td>{record.thoi_Diem_Auto_Pick_Hang}</td>
        //         <td>{record.thoi_Diem_Xac_Nhan_Pick_Xong}</td>
        //         <td>{record.thoi_Diem_Ra_Khoi_Kho}</td>
        //         <td>{record.ngay_Gio_Dat_Hang}</td>
        //         <td>{record.ten_Sieu_Thi_Full}</td>
        //       </tr>
        //     </table>
        //   ),
        // }}
        dataSource={mapSystemExportTable}
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
        //   scroll={{ x: 1000 }}
      />
      <ModalDetailSystemExport
        open={openmodal}
        callBackCanCel={cancelModalDetail}
        datefrom={
          localStorage.getItem('datefromsystemexport')
            ? formatDateTime(localStorage.getItem('datefromsystemexport'))
            : DateFrom
        }
        dateto={
          localStorage.getItem('datetosystemexport')
            ? formatDateTime(localStorage.getItem('datetosystemexport'))
            : DateTo
        }
        title="Chi tiết phiếu xuất kho"
        id={datadetail.auto_ID}
        arrTrangThai={-5}
        datadetail={datadetail}
      />
    </>
  );
};
export default SystemExportTable;
