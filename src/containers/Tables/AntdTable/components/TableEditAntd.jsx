import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  notification,
  Space,
  Table,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import OrderASNApi from '../../../../api/OrderASNApi';
import { useDebounce } from '../../../../hook';
import useFormatDate from '../../../../hook/useFormatDate';
import usePagination from '../../../../hook/usePagination';
import { Changeloading } from '../../../../redux/actions/loadingAction';
import ContenNoData from '../../../../shared/components/ContenNoData';
import CustomLoading from '../../../../shared/components/CustomLoading';
import { CustomTitleAndColor } from '../../../../shared/components/CustomTitle';
import InputColumns from '../../../../shared/components/InputColumns';
import ModalASN from '../../../../shared/components/modal/ModalASN';
import ModalDetailAsn from '../../../../shared/components/ModalDetailAsn';
import {
  formarDateTimeddmmyyy,
  formatDateTime,
} from '../../../../shared/helpers';

const TableASN = () => {
  //? State extension
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { RangePicker } = DatePicker;
  const [api, contextHolder] = notification.useNotification();

  //? state component
  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);
  //! state datetime
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  //! state product
  const [importProduct, setImportProduct] = useState([]);
  const [datadetail, setdatadetail] = useState('');
  let mapImportProduct = [];
  //! state modal
  const [open, setOpen] = useState(false);
  const [openModalDetail, setopenModalDetail] = useState(false);
  //! state debounced
  const [textSearch, setTextSeach] = useState(null);
  const [Market, setMarket] = useState(null);
  const [MaNCC, setMaNCC] = useState(null);
  const debounced = useDebounce(textSearch, 500);
  const debouncedNCC = useDebounce(MaNCC, 500);
  const debouncedMarket = useDebounce(Market, 500);
  //! state check search date
  const [isSearchDate, setIsSearchDate] = useState(false);
  //! state check filter
  const [Check, setCheck] = useState(false);

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

  // ? handle function
  //! handle modal
  const handleCancel = (cancel) => {
    setOpen(false);
    setCheck(!Check);
  };
  const showModalDetail = (data) => {
    setdatadetail(data);
    setopenModalDetail(true);
  };
  const cancelModal = () => {
    setopenModalDetail(false);
  };
  //! handle filter
  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
  };

  //! handle change value datetime
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);
    localStorage.setItem('datefrom', dateString[0]);
    localStorage.setItem('dateto', dateString[1]);
    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };
  const items = [
    {
      label: 'Sửa Phiếu Nhập',
      key: '1',
      icon: <PlusCircleOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: () => setOpen(true),
  };

  //* CALL API
  useEffect(() => {
    setImportProduct([]);
    dispatch(Changeloading({ loading: true }));
    if (cookies.get('idchuhang')) {
      const fetchASNProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: false,
            page: page,
            pageCount: PageSize,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: Number(localStorage.getItem('kho_id')),
            arrTrangThaiNhap: [4],
            date_From: localStorage.getItem('datefrom')
              ? formatDateTime(localStorage.getItem('datefrom'))
              : DateFrom,
            date_To: localStorage.getItem('dateto')
              ? formatDateTime(localStorage.getItem('dateto'))
              : DateTo,
            so_Phieu_Nhap_Kho: debounced ? debounced : null,
            ten_NCC: debouncedNCC ? debouncedNCC : null,
            ten_Sieu_Thi_Full: debouncedMarket ? debouncedMarket : null,
            xem_Type_ID: null,
          };
          const response = await OrderASNApi.getAll(data);
          if (response.result) {
            setImportProduct(response.result);
            dispatch(Changeloading({ loading: false }));
            setTotal(response.total);
          } else {
            dispatch(Changeloading({ loading: false }));
          }
        } catch (error) {
          dispatch(Changeloading({ loading: false }));
        }
      };
      fetchASNProduct();
    }
    return () => {
      setImportProduct([]);
      setTotal(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    idKho.idKho,
    page,
    PageSize,
    debounced,
    debouncedMarket,
    debouncedNCC,
    isSearchDate,
  ]);
  //* Colunns Tables
  const columns = [
    {
      title: (
        <InputColumns
          fHandle={setTextSeach}
          title="Số Phiếu"
          setpage={setpage}
        />
      ),
      dataIndex: 'so_Phieu_Nhap_Kho',
      key: 'so_Phieu_Nhap_Kho',
      width: 150,
      render: (value, record) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            return showModalDetail(record);
          }}
        >
          {record.so_Phieu_Nhap_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Nhap_Kho.includes(value),
    },
    {
      title: 'Ngày Kế Hoạch',
      dataIndex: 'ngay_Ke_Hoach',
      width: 150,
      render: (ngay_Ke_Hoach) => (
        <p style={{ textAlign: 'center', color: 'black' }}>{ngay_Ke_Hoach}</p>
      ),
      key: 'ngay_Ke_Hoach',
    },
    {
      title: 'Loại Hình',
      dataIndex: 'loai_Hinh_Nhap_Kho_Text',
      key: 'loai_Hinh_Nhap_Kho_Text',
      width: 130,
    },

    {
      title: 'Trạng thái quét barcode',
      dataIndex: 'trang_Thai_Quet_Barcode_Text',
      key: 'trang_thai_quet_barcode',
      width: 150,
      render: (trang_Thai_Quet_Barcode_Text) => (
        <span className="label label-primary">
          {trang_Thai_Quet_Barcode_Text}
        </span>
      ),
    },
    {
      title: (
        <InputColumns
          fHandle={setMaNCC}
          title="Mã NCC"
          setpage={setpage}
        />
      ),
      dataIndex: 'ten_NCC',
      key: 'ten_NCC',
      width: 150,
    },
    {
      title: (
        <InputColumns
          fHandle={setMarket}
          title="Nơi xuất đến"
          setpage={setpage}
        />
      ),
      width: 180,
      dataIndex: 'ten_Sieu_Thi_Full',
      key: 'ten_Sieu_Thi_Full',
    },
    {
      title: 'Ref No',
      dataIndex: 'ref_No',
      key: 'ref_No',
      width: 180,
      render: (ref_No) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{ref_No}</p>
      ),
    },
  ];
  if (importProduct && importProduct.length !== 0) {
    mapImportProduct = importProduct.map((item, index) => ({
      key: index,
      ...item,
      ten_NCC: item.ten_NCC ? item.ten_NCC : '',
      ngay_Ke_Hoach: formarDateTimeddmmyyy(item.ngay_Ke_Hoach.slice(0, 10)),
    }));
  }
  //* header export excel
  const headers = [
    { label: 'Số Phiếu Nhập', key: 'so_Phieu_Nhap_Kho' },
    { label: 'Ngày kế hoạch', key: 'ngay_Ke_Hoach' },
    { label: 'Loại hình nhập', key: 'loai_Hinh_Nhap_Kho_Text' },
    { label: 'Trạng thái quét barcode', key: 'trang_Thai_Quet_Barcode_Text' },
    { label: 'Tên nhà cung cấp', key: 'ten_NCC' },
    { label: 'Nơi xuất đến', key: 'ten_Sieu_Thi_Full' },
    { label: 'Ref No', key: 'ref_No' },
  ];

  //* RENDER COMPONENT
  return (
    <>
      {contextHolder}
      <CustomTitleAndColor level={2}>Kế Hoạch Nhập (ASN)</CustomTitleAndColor>
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
              localStorage.getItem('datefrom')
                ? [
                    dayjs(localStorage.getItem('datefrom'), dateFormat),
                    dayjs(localStorage.getItem('dateto'), dateFormat),
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
          <Button
            className="custom-button1"
            icon={<PlusCircleOutlined />}
            type="primary"
            danger
            onClick={() => setOpen(true)}
          >
            Thêm Kế Hoạch Nhập Kho
          </Button>
          <CSVLink
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
          </CSVLink>
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
        //           <th className="ant-table-cell">Kiện</th>
        //           <th className="ant-table-cell">SL</th>
        //           <th className="ant-table-cell">GW</th>
        //           <th className="ant-table-cell">NW</th>
        //           <th className="ant-table-cell">CBM</th>
        //         </tr>
        //       </thead>
        //       <tr className="ant-table-row">
        //         <td>{record.tong_So_Kien}</td>
        //         <td>{record.tong_So_Luong}</td>
        //         <td>{record.tong_GW}</td>
        //         <td>{record.tong_NW}</td>
        //         <td>{record.tong_NW}</td>
        //       </tr>
        //     </table>
        //   ),
        // }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        dataSource={mapImportProduct}
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
      <ModalASN
        open={open}
        callBackCanCel={handleCancel}
        refreshdata={searchFilter}
        check={Check}
      />
      <ModalDetailAsn
        open={openModalDetail}
        id={datadetail.auto_ID}
        datefrom={
          localStorage.getItem('datefrom')
            ? formatDateTime(localStorage.getItem('datefrom'))
            : DateFrom
        }
        dateto={
          localStorage.getItem('dateto')
            ? formatDateTime(localStorage.getItem('dateto'))
            : DateTo
        }
        arrTrangThai={[4]}
        title="Chi tiết phiếu nhập kho"
        datadetail={datadetail}
        callBackCanCel={cancelModal}
      />
    </>
  );
};
export default TableASN;
