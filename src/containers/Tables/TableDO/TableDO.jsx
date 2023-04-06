import { FormOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import OrderDOApi from '../../../api/OrderDOApi';
import { useDebounce } from '../../../hook';
import useFormatDate from '../../../hook/useFormatDate';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import InputColumns from '../../../shared/components/InputColumns';
import ModalDO from '../../../shared/components/modal/ModalDO';
import ModalDo from '../../../shared/components/ModalDo';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';

const TableDO = () => {
  const [productDO, setProductDO] = useState([]);
  let mapProductDO = [];
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const cookies = new Cookies();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [open, setOpen] = useState(false);
  const [openmodal, setopenmodal] = useState(false);
  const [datadetail, setdatadetail] = useState('');
  const [autoId, setautoId] = useState('');

  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);

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

  // ? FORMAT DATE
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);

  // ? state component
  const [numberTicket, setNumberTicket] = useState(null);
  const [numberAWB, setnumberAWB] = useState(null);
  const [maKet, setMaKet] = useState(null);
  const [isSearchDate, setIsSearchDate] = useState(false);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedAWB = useDebounce(numberAWB, 500);
  const debouncedMarket = useDebounce(maKet, 500);

  // ? handle function
  const onChangeValue = (value, dateString) => {
    const dateFromFormat = formatDateTime(dateString[0]);
    const dateToFormat = formatDateTime(dateString[1]);

    localStorage.setItem('datefromexport1', dateString[0]);
    localStorage.setItem('datetoexport1', dateString[1]);

    setDateFrom(dateFromFormat);
    setDateTo(dateToFormat);
  };

  const handleCancel = (cancel) => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };
  const showModalDetail = (data) => {
    setdatadetail(data);
    setautoId(data.id);
    setopenmodal(true);
  };
  const cancelModalDetail = () => {
    setopenmodal(false);
  };
  // ? handle function filter
  const searchFilter = () => {
    setIsSearchDate(!isSearchDate);
  };

  const items = [
    {
      label: 'Hiệu Chỉnh',
      key: '1',
      icon: <PlusCircleOutlined />,
    },
    {
      label: 'In KH Xuất',
      key: '2',
      icon: <FormOutlined />,
    },
  ];
  const menuProps = {
    items,
  };

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    if (cookies.get('idchuhang')) {
      const fetchDOProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: false,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromexport1')
              ? formatDateTime(localStorage.getItem('datefromexport1'))
              : DateFrom,
            date_To: localStorage.getItem('datetoexport1')
              ? formatDateTime(localStorage.getItem('datetoexport1'))
              : DateTo,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: Number(localStorage.getItem('kho_id')),
            so_Phieu_Xuat_Kho: debouncedTicket ? debouncedTicket : null,
            so_AWB: debouncedAWB ? debouncedAWB : null,
            noiXuatDen: debouncedMarket ? debouncedMarket : null,
            arrTrangThaiXuatKho: [1],
          };
          const response = await OrderDOApi.getAll(data);
          setProductDO(response.result);
          dispatch(Changeloading({ loading: false }));
          setTotal(response.total);
        } catch (error) {
          dispatch(Changeloading({ loading: false }));
        }
      };
      fetchDOProduct();
    }
    return () => {
      setProductDO([]);
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
      width: 170,
      render: (text, record, index) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            const dataDetail = {
              so_phieu_xuat: record.so_Phieu_Xuat_Kho,
              document_no: record.document_No,
              nguoi_nhan_hang: record.nguoi_Nhan_Hang_Full,
              ghi_chu: record.ghi_Chu,
              loai_hinh_xuat: record.loai_Hinh_Xuat_Kho_Text,
              dia_chi_chi_tiet: record.dia_Chi_Chi_Tiet_Nguoi_Nhan_Hang,
              ma_ncc: record.ma_NCC,
              thoi_gian_tao: record.created,
              ngay_xuat_kho: record.ngay_Xuat_Kho,
              trang_thai_xuat_kho: record.trang_Thai_Xuat_Kho_HTML,
              id: record.auto_ID,
            };
            return showModalDetail(dataDetail);
          }}
        >
          {record.so_Phieu_Xuat_Kho}
        </p>
      ),
    },
    {
      title: 'Ngày Tạo Phiếu',
      dataIndex: 'created',
      key: 'created',
      width: 150,
    },
    {
      title: 'Ngày Xuất',
      dataIndex: 'ngay_Xuat_Kho',
      key: 'ngay_Xuat_Kho',
    },
    {
      title: (
        <InputColumns
          fHandle={setnumberAWB}
          title="Số AWB"
          setpage={setpage}
        />
      ),
      dataIndex: 'so_AWB',
      key: 'so_AWB',
      width: 170,
      render: (so_AWB) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{so_AWB}</p>
      ),
    },
    {
      title: 'Ngày Đặt Hàng',
      dataIndex: 'ngay_Gio_Dat_Hang',
      key: 'ngay_Gio_Dat_Hang',
    },
    {
      title: (
        <InputColumns
          fHandle={setMaKet}
          title="Nơi xuất đến"
          setpage={setpage}
        />
      ),
      width: 150,
      dataIndex: 'nguoi_Nhan_Hang_Full',
      key: 'nguoi_Nhan_Hang_Full',
      render: (nguoi_Nhan_Hang_Full) => (
        <div dangerouslySetInnerHTML={createMarkup(nguoi_Nhan_Hang_Full)} />
      ),
    },
    {
      title: 'Ngành Hàng',
      dataIndex: 'loai_San_Pham_Text',
      key: 'loai_San_Pham_Text',
      render: (loai_San_Pham_Text) => (
        <div dangerouslySetInnerHTML={createMarkup(loai_San_Pham_Text)} />
      ),
    },
  ];
  if (productDO && productDO.length !== 0) {
    mapProductDO = productDO.map((item, index) => ({
      key: index,
      ...item,
      created: item.created.slice(0, 10)
        ? `${formarDateTimeddmmyyy(item.created.slice(0, 10))} 
                                                       ${item.created.slice(
                                                         11,
                                                         19
                                                       )}`
        : '',
      ngay_Xuat_Kho: item.ngay_Xuat_Kho.slice(0, 10)
        ? formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10))
        : '',
      ngay_Gio_Dat_Hang: item.ngay_Gio_Dat_Hang
        ? formarDateTimeddmmyyy(item.ngay_Gio_Dat_Hang.slice(0, 10))
        : '',
    }));
  }
  return (
    <>
      <CustomTitleAndColor level={2}>Kế hoạch xuất kho</CustomTitleAndColor>
      <Space direction="vertical">
        <CustomTitleAndColor level={5}>Ngày Xuất Hàng</CustomTitleAndColor>
        <Space
          direction="horizontal"
          style={{ marginBottom: '10px' }}
        >
          <RangePicker
            className="createDateRangePicker"
            dropdownClassName="createDateRangePicker"
            defaultValue={
              localStorage.getItem('datefromexport1')
                ? [
                    dayjs(localStorage.getItem('datefromexport1'), dateFormat),
                    dayjs(localStorage.getItem('datetoexport1'), dateFormat),
                  ]
                : [dayjs(todayformat, dateFormat), dayjs(date, dateFormat)]
            }
            format={dateFormat}
            onChange={onChangeValue}
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
            onClick={showModal}
          >
            Thêm Kế Hoạch Xuất Kho
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
                  <th className="ant-table-cell">Kiện</th>
                  <th className="ant-table-cell">SL</th>
                  {/* <th className="ant-table-cell">Loại VC</th> */}
                  <th className="ant-table-cell">Loại Đơn</th>
                  <th className="ant-table-cell">Loại Hình</th>
                </tr>
              </thead>
              <tr className="ant-table-row">
                <td>{record.tong_So_Kien_Xuat}</td>
                <td>{record.tong_So_Luong_Xuat}</td>
                <td>{record.loai_Don_Text}</td>
                <td>{record.loai_Hinh_Xuat_Kho_Text}</td>
              </tr>
            </table>
          ),
        }}
        dataSource={mapProductDO}
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
      <ModalDO
        open={open}
        callBackCanCel={handleCancel}
        refreshdata={searchFilter}
      />
      <ModalDo
        open={openmodal}
        callBackCanCel={cancelModalDetail}
        datefrom={
          localStorage.getItem('datefromexport1')
            ? formatDateTime(localStorage.getItem('datefromexport1'))
            : DateFrom
        }
        dateto={
          localStorage.getItem('datetoexport1')
            ? formatDateTime(localStorage.getItem('datetoexport1'))
            : DateTo
        }
        title="Chi tiết phiếu xuất kho"
        id={autoId}
        arrTrangThai={[1]}
        datadetail={datadetail}
      />
    </>
  );
};
export default TableDO;
