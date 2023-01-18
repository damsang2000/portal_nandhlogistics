import { Table } from 'ant-table-extensions';
import { Button, DatePicker, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
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
import ModalDetailSystemImport from './ModalDetailSystemImport';

const SystemImportTable = () => {
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

  const [systemImportTable, setSystemImportTable] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const loading = useSelector((state) => state.loading);
  const [datadetail, setdatadetail] = useState('');
  const { Title } = Typography;

  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);

  //

  // ? system state
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let mapSysTemportTable = [];
  //

  // ? extension
  const { RangePicker } = DatePicker;
  //

  // ? onchange datetime value function
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);

    localStorage.setItem('datefromsystemimport', dateString[0]);
    localStorage.setItem('datetosystemimport', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  // ? state page component
  const [openModalDetail, setopenModalDetail] = useState(false);

  // ! state check search datetime
  const [isSearchDate, setIsSearchDate] = useState(false);
  // ? search filter function

  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
    setpage(1);
  };

  // ? handle modal
  const showModalDetail = (data) => {
    setdatadetail(data);
    setopenModalDetail(true);
  };
  const cancelModal = () => {
    setopenModalDetail(false);
  };

  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [maNCC, setMaNCC] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedNCC = useDebounce(maNCC, 500);

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchSystemImport = async () => {
      try {
        const data = {
          sortName: null,
          isAsc: true,
          page: page,
          pageCount: PageSize,
          date_From: localStorage.getItem('datefromsystemimport')
            ? formatDateTime(localStorage.getItem('datefromsystemimport'))
            : DateFrom,
          date_To: localStorage.getItem('datetosystemimport')
            ? formatDateTime(localStorage.getItem('datetosystemimport'))
            : DateTo,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
          ma_NCC: debouncedNCC,
          so_Phieu_Nhap_Kho: debouncedTicket,
        };
        const response = await SystemApi.getSystemNhapKho(data);
        if (response.result) {
          setSystemImportTable(response.result);
          setTotal(response.total);
          dispatch(Changeloading({ loading: false }));
        } else {
          dispatch(Changeloading({ loading: false }));
        }
      } catch (error) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchSystemImport();
    return () => {
      setSystemImportTable([]);
      setTotal(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    debouncedNCC,
    debouncedTicket,
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
      dataIndex: 'so_Phieu_Nhap_Kho',
      key: 'so_Phieu_Nhap_Kho',
      width: 200,
      render: (text, record) => (
        <p
          className="style-hover"
          onClick={() => {
            showModalDetail(record);
          }}
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {record.so_Phieu_Nhap_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Nhap_Kho.includes(value),
    },
    {
      title: 'Ngày NK',
      dataIndex: 'ngay_Nhap_Kho',
      width: 150,
    },

    {
      title: 'Chứng Từ',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien',
          width: 100,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong',
          width: 100,
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
          width: 100,
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
          width: 100,
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
      title: (
        <InputColumns
          fHandle={setMaNCC}
          title="Tên NCC"
          setpage={setpage}
        />
      ),
      dataIndex: 'ma_NCC',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_Thai_Nhap_Kho_Text',
      key: 'trang_thai_quet_barcode',
      // eslint-disable-next-line react/no-danger, consistent-return
      render: (trang_Thai_Nhap_Kho_Text) => {
        if (trang_Thai_Nhap_Kho_Text === 'Received') {
          return (
            <span className="label label-primary">
              {trang_Thai_Nhap_Kho_Text}
            </span>
          );
        }
        if (trang_Thai_Nhap_Kho_Text === 'Complete') {
          return (
            <span className="label label-success">
              {trang_Thai_Nhap_Kho_Text}
            </span>
          );
        }
      },
    },
  ];

  if (systemImportTable && systemImportTable.length !== 0) {
    mapSysTemportTable = systemImportTable.map((item, index) => ({
      key: index,
      ...item,
      ngay_Nhap_Kho: item.ngay_Nhap_Kho
        ? formarDateTimeddmmyyy(item.ngay_Nhap_Kho.slice(0, 10))
        : '',
    }));
  }

  // ? custom field table
  const fields = {
    so_Phieu_Nhap_Kho: {
      header: 'Số Phiếu Nhập Kho',
      formatter: (_fieldValue, record) => `${record?.so_Phieu_Nhap_Kho}`,
    },
    ngay_Nhap_Kho: {
      header: 'Ngày nhập kho',
      formatter: (_fieldValue, record) => `${record?.ngay_Nhap_Kho}`,
    },
    kien_chung_nhan: {
      header: 'Kiện chứng nhận',
      formatter: (_fieldValue, record) => `${record?.tong_So_Kien}`,
    },
    tong_So_Luong: {
      header: 'Số Lượng chứng nhận',
      formatter: (_fieldValue, record) => `${record?.tong_So_Luong}`,
    },
    // Country column will get 'Your Country' as header
  };

  const headers = [
    { label: 'Số Phiếu Nhập', key: 'so_Phieu_Nhap_Kho' },
    { label: 'Ngày nhập kho', key: 'ngay_Nhap_Kho' },
    { label: 'Kiện chứng từ', key: 'tong_So_Kien' },
    { label: 'Sl chứng từ', key: 'tong_So_Luong' },
    { label: 'Kiện thực nhận', key: 'tong_So_Kien_Receive' },
    { label: 'Sl thực nhận', key: 'tong_So_Luong_Receive' },
    { label: 'Mã ncc', key: 'ma_NCC' },
    { label: 'trạng thái', key: 'trang_Thai_Nhap_Kho_Text' },
  ];

  return (
    <>
      <CustomTitleAndColor level={2}>Nhập Kho</CustomTitleAndColor>
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
                localStorage.getItem('datefromsystemimport')
                  ? [
                      dayjs(
                        localStorage.getItem('datefromsystemimport'),
                        dateFormat
                      ),
                      dayjs(
                        localStorage.getItem('datetosystemimport'),
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
            <CSVLink
              data={mapSysTemportTable}
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
            </CSVLink>
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
                </tr>
              </thead>
              <tr className="ant-table-row">
                <td>{record.tong_GW}</td>
                <td>{record.tong_NW}</td>
                <td>{record.tong_CBM}</td>
              </tr>
            </table>
          ),
        }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        dataSource={mapSysTemportTable}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          position: position,
          pageOption: pageOption,
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
      <ModalDetailSystemImport
        open={openModalDetail}
        id={datadetail.auto_ID}
        datefrom={DateFrom}
        dateto={DateTo}
        title="Chi tiết phiếu nhập kho"
        datadetail={datadetail}
        callBackCanCel={cancelModal}
      />
    </>
  );
};
export default SystemImportTable;
