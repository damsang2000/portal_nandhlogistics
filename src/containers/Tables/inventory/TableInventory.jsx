import { Table, Typography, Space, Button, DatePicker, Dropdown } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
// import { useDebounce } from '../../../../hook';
import ContenNoData from '../../../shared/components/ContenNoData';
// ? import component
// import ListItemApi from '../../../../api/ListItemApi';
// import usePagination from '../../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import KhoApi from '../../../api/KhoAPI';
import CustomLoading from '../../../shared/components/CustomLoading';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';
import usePagination from '../../../hook/usePagination';
import ComboboxColumn from '../../../shared/components/ComboboxColumn';
import DatePickerColumn from '../../../shared/components/DatePickerColumn';
import InputColumns from '../../../shared/components/InputColumns';
import useFormatDate from '../../../hook/useFormatDate';
import dayjs from 'dayjs';
import { useDebounce } from '../../../hook';
import TableInventoryDetail from './modal/TableInventoryDetail';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import { IconCustom } from '../../../shared/components/IconCustom';
import ExportExcel from '../../../shared/components/account/ExportExcel';

// import CustomLoading from '../../../../shared/components/CustomLoading';
// import InputColumns from '../../../../shared/components/InputColumns';
// import ModalTableProduct from './ModalTableProduct';
// import ContenNoData from '../../../../shared/components/ContenNoData';

const TableInventory = () => {
  //   // ? state extension
  const { Title } = Typography;
  const cookies = new Cookies();
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const idchuhang = useSelector((state) => state.idchuhang);
  const loading = useSelector((state) => state.loading);
  //   // ? state component
  //   // ! state product
  const [inventoryList, setInventoryList] = useState([]);
  //   const [dataDetail, setDataDetail] = useState({});
  let mapInventoryList = [];

  //? state component
  const [positionInventory, setPositionInventory] = useState(null);
  const [statusInventory, setStatusInventory] = useState('');
  const [isDateChange, setIsDateChange] = useState(false);

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

  //! state datetime
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  const [dateFilterInventory, setDateFilterInventory] = useState(null);
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  //! state debounced
  const debouncedStatusInventory = useDebounce(statusInventory, 500);

  // ? function handle
  //   // ! function handle change loading
  const handleChangeLoading = (check) => {
    dispatch(Changeloading({ loading: check }));
  };

  //! handle change value datetime
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefromInventory', dateString[0]);
    localStorage.setItem('datetoInventory', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };
  const searchFilter = () => {
    setIsDateChange(!isDateChange);
  };
  // const items = [
  //   {
  //     label: <ExportExcel />,
  //     key: '1',
  //     icon: <PlusCircleOutlined />,
  //   },
  // ];
  // const menuProps = {
  //   items,
  // };
  // * Call API =================================================================
  useEffect(() => {
    handleChangeLoading(true);

    if (cookies.get('idchuhang')) {
      const fetchCategoryProduct = async () => {
        try {
          const data = {
            chu_Hang_ID: cookies.get('idchuhang')
              ? cookies.get('idchuhang')
              : localStorage.getItem('idchuhang'),
            date_From: localStorage.getItem('datefromInventory')
              ? formatDateTime(localStorage.getItem('datefromInventory'))
              : DateFrom,
            date_To: localStorage.getItem('datetoInventory')
              ? formatDateTime(localStorage.getItem('datetoInventory'))
              : DateTo,
            kho_ID: 2631604,
            khu_Vuc_ID: positionInventory ? positionInventory : null,
            trang_Thai_Text: debouncedStatusInventory
              ? debouncedStatusInventory
              : null,
            ngay_Kiem_Kho: dateFilterInventory ? dateFilterInventory : null,
          };
          const response = await KhoApi.getAll(data);

          setInventoryList(response.result);
          handleChangeLoading(false);
          //   setTotal(response.total);
        } catch (error) {
          handleChangeLoading(false);
        }
      };
      fetchCategoryProduct();
    }
    return () => {
      setInventoryList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    positionInventory,
    isDateChange,
    debouncedStatusInventory,
    dateFilterInventory,
    // page,
    // PageSize,
    // debouncedProductName,
    // debouncedNumberProduct,
  ]);

  // * columns table and map data=============================
  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  const columns = [
    {
      title: 'Thao tác',
      width: 100,
      // eslint-disable-next-line react/button-has-type
      render: (value, record) => <ExportExcel idInventory={record.auto_ID} />,
    },
    {
      title: 'ID',
      dataIndex: 'auto_ID',
      key: 'ma_San_Pham',
      width: 100,
      fixed: 'left',
      render: (value, record) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            setOpen(true);
            setDataDetail(record);
          }}
        >
          {record.auto_ID}
        </p>
      ),
    },
    {
      title: (
        <ComboboxColumn
          title="Khu Vực"
          fHandle={setPositionInventory}
        />
      ),
      dataIndex: 'ten_Khu_Vuc_Kho',
      width: 150,
      //   render: (text, record) => (
      //     <span
      //       className="custom-color-hover-p"
      //       style={{ color: '#3742fa', cursor: 'pointer' }}
      //       onClick={() => {
      //         setOpenModalDetail(true);
      //         getValueColumn(record);
      //       }}
      //     >
      //       {record.ten_San_Pham}
      //     </span>
      //   ),
    },

    {
      title: 'Số Phiên Kiểm Kho',
      dataIndex: 'so_Phien_Kiem_Kho',
      width: 180,
    },
    {
      title: (
        <DatePickerColumn
          title="Ngày Kiểm Kho"
          fHandle={setDateFilterInventory}
        />
      ),
      dataIndex: 'ngay_Kiem_Kho',
      key: 'ngay_Kiem_Kho',
      width: 150,
    },
    {
      title: 'Kiện',
      dataIndex: 'so_Kien',
      key: 'ma_SP_NCC',
      width: 80,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <div className="center-text">{record.so_Kien}</div>,
        };
      },
    },
    {
      title: 'SL Lẻ',
      dataIndex: 'so_Luong_Le',
      key: 'sL_Cai_1_Thung',
      width: 70,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(255, 218, 121,0.3)' },
          },
          children: <div className="center-text">{record.so_Luong_Le}</div>,
        };
      },
      //   render(text, record) {
      //     return {
      //       props: {
      //         style: { background: 'rgba(112, 111, 211,0.3)' },
      //       },
      //       children: <div className="center-text">{record.sL_Cai_1_Thung}</div>,
      //     };
      //   },
    },
    {
      title: (
        <InputColumns
          fHandle={setStatusInventory}
          title="Trạng thái"
          setpage={setpage}
        />
      ),
      dataIndex: 'trang_Thai_HTML',
      key: 'trang_thai_quet_barcode',
      width: 120,
      // eslint-disable-next-line react/no-danger
      render: (trang_Thai_HTML) => (
        <div dangerouslySetInnerHTML={createMarkup(trang_Thai_HTML)} />
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghi_Chu',
      key: 'ghi_Chu',
      //   render(text, record) {
      //     return {
      //       props: {
      //         style: { background: 'rgba(255, 218, 121,0.3)' },
      //       },
      //       children: <div className="center-text">{record.gw}</div>,
      //     };
      //   },
    },
    // {
    //   title: 'NW',
    //   dataIndex: 'nw',
    //   key: 'nw',
    //   width: 80,
    //   render(text, record) {
    //     return {
    //       props: {
    //         style: { background: 'rgba(255, 218, 121,0.3)' },
    //       },
    //       children: <div className="center-text">{record.nw}</div>,
    //     };
    //   },
    // },
    // {
    //   title: 'CBM',
    //   dataIndex: 'cbm',
    //   key: 'cbm',
    //   width: 80,
    //   render(text, record) {
    //     return {
    //       props: {
    //         style: { background: 'rgba(255, 218, 121,0.3)' },
    //       },
    //       children: <div className="center-text">{record.cbm}</div>,
    //     };
    //   },
    // },
  ];

  //* map data===============================================
  if (inventoryList && inventoryList.length !== 0) {
    mapInventoryList = inventoryList.map((item, index) => ({
      key: index,
      ...item,
      ngay_Kiem_Kho: formarDateTimeddmmyyy(item.ngay_Kiem_Kho.slice(0, 10)),
    }));
  }

  // * render component
  return (
    <>
      <CustomTitleAndColor level={2}>Kiểm kho</CustomTitleAndColor>
      <Space direction="vertical">
        <CustomTitleAndColor level={5}>Ngày kiểm kho</CustomTitleAndColor>
        <Space
          direction="horizontal"
          style={{ marginBottom: '10px' }}
        >
          <RangePicker
            className="createDateRangePicker"
            dropdownClassName="createDateRangePicker"
            onChange={onChangeValue}
            defaultValue={
              localStorage.getItem('datefromInventory')
                ? [
                    dayjs(
                      localStorage.getItem('datefromInventory'),
                      dateFormat
                    ),
                    dayjs(localStorage.getItem('datetoInventory'), dateFormat),
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
        dataSource={mapInventoryList}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        footer={() => (
          <p
            style={{
              color: 'black',
            }}
          >{`Page ${1} of 1 (0 items)`}</p>
        )}
        pagination={{
          //   total: Total,
          //   onChange: getData,
          //   current: page,
          //   pageSize: PageSize,
          //   onShowSizeChange: getDataSize,
          position: position,
          //   pageSizeOptions: pageOption,
        }}
        // footer={() =>
        //   page && Total ? (
        //     <p
        //       style={{
        //         color: 'black',
        //       }}
        //     >{`Page ${page} of ${Math.ceil(
        //       Total / PageSize
        //     )} (${Total} items)`}</p>
        //   ) : null
        // }
      />
      {/* <ModalTableProduct
        open={openModalDetail}
        callBackCancel={() => setOpenModalDetail(false)}
        dataDetail={dataDetail}
      /> */}
      <TableInventoryDetail
        open={open}
        callBackOpen={() => setOpen(false)}
        dataDetail={dataDetail}
        title="Chi tiết kiểm kho"
        datefrom={
          localStorage.getItem('datefromInventory')
            ? formatDateTime(localStorage.getItem('datefromInventory'))
            : DateFrom
        }
        dateto={
          localStorage.getItem('datetoInventory')
            ? formatDateTime(localStorage.getItem('datetoInventory'))
            : DateTo
        }
      />
    </>
  );
};
export default TableInventory;
