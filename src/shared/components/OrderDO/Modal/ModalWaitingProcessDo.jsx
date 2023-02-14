import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

//? import component and helper
import OrderDOApi from '../../../../api/OrderDOApi';
import usePagination from '../../../../hook/usePagination';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../helpers';
import ModalDetailWaitingProcessDo from '../ModalDetail/ModalDetailWaitingProcessDo';
import ContenNoData from '../../ContenNoData';
import InputColumns from '../../InputColumns';
import { useDebounce } from '../../../../hook';

const ModalWaitingProcessDo = (props) => {
  // ? state extension
  const idchuhang = useSelector((state) => state.idchuhang);
  const cookies = new Cookies();

  // ? state component
  //! state do
  const [productDO, setProductDO] = useState([]);
  const [autoId, setautoId] = useState('');
  let mapProductDO = [];
  const [DataDetail, setDataDetail] = useState('');
  //! state modal
  const [open, setOpen] = useState(false);

  // ? state component
  const [numberTicket, setNumberTicket] = useState(null);
  const [numberAWB, setnumberAWB] = useState(null);
  const [maKet, setMaKet] = useState(null);
  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedAWB = useDebounce(numberAWB, 500);
  const debouncedMarket = useDebounce(maKet, 500);

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

  // ? funtion handle
  //! function handle modal
  const showModal = (data) => {
    setDataDetail(data);
    setautoId(data.id);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //! function handle render html while get data api
  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  // * Columns Table===============================================================
  const columns = [
    {
      title: (
        <InputColumns
          fHandle={setNumberTicket}
          title="Số Phiếu Xuất Kho"
          setpage={setpage}
        />
      ),
      dataIndex: 'so_Phieu_Xuat_Kho',
      key: 'so_Phieu_Xuat_Kho',
      width: 200,
      render: (text, record, index) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            const dataDetail = {
              so_phieu_xuat: record.so_Phieu_Xuat_Kho,
              document_no: record.document_No,
              nguoi_nhan_hang: record.nguoi_Nhan_Hang,
              ghi_chu: record.ghi_Chu,
              loai_hinh_xuat: record.loai_Hinh_Xuat_Kho_Text,
              ma_ncc: record.ma_NCC,
              thoi_gian_tao: record.created,
              ngay_xuat_kho: record.ngay_Xuat_Kho,
              trang_thai_xuat_kho: record.trang_Thai_Xuat_Kho_HTML,
              dia_chi_chi_tiet: record.dia_Chi_Chi_Tiet_Nguoi_Nhan_Hang,
              id: record.auto_ID,
            };
            return showModal(dataDetail);
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
      render: (so_AWB) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{so_AWB}</p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_Thai_Xuat_Kho_HTML',
      key: 'trang_thai_quet_barcode',
      render: (trang_Thai_Xuat_Kho_HTML) => (
        <div dangerouslySetInnerHTML={createMarkup(trang_Thai_Xuat_Kho_HTML)} />
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
    },
  ];
  //* Map data do render
  if (productDO && productDO.length !== 0) {
    mapProductDO = productDO.map((item, index) => ({
      key: index,
      ...item,
      created: item.created.slice(0, 10)
        ? `${formarDateTimeddmmyyy(item.created.slice(0, 10))} 
                                                 ${item.created.slice(11, 19)}`
        : '',
      ngay_Xuat_Kho: item.ngay_Xuat_Kho.slice(0, 10)
        ? formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10))
        : '',
      ngay_Gio_Dat_Hang: item.ngay_Gio_Dat_Hang
        ? formarDateTimeddmmyyy(item.ngay_Gio_Dat_Hang.slice(0, 10))
        : '',
    }));
  }

  // * Call API===================================================================
  useEffect(() => {
    if (cookies.get('idchuhang')) {
      const fetchDOProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: false,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromimportDashboard')
              ? formatDateTime(localStorage.getItem('datefromimportDashboard'))
              : props.datefrom,
            date_To: localStorage.getItem('datetoimportDashboard')
              ? formatDateTime(localStorage.getItem('datetoimportDashboard'))
              : props.dateto,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: 2631604,
            arrTrangThaiXuatKho: [...props.arrtrangthai],
            so_Phieu_Xuat_Kho: debouncedTicket ? debouncedTicket : null,
            so_AWB: debouncedAWB ? debouncedAWB : null,
            noiXuatDen: debouncedMarket ? debouncedMarket : null,
          };
          const response = await OrderDOApi.getAll(data);
          console.log(response);
          if (!response.result) {
            setpage(1);
          } else {
            setProductDO(response.result);
            setTotal(response.total);
          }
        } catch (error) {
          // console.log('fail to fetch list item', error);
          // dispatch(Changeloading({ loading: false }));
        }
      };
      fetchDOProduct();
    }
    return () => {
      setProductDO([]);
      setTotal(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    props.isrender,
    debouncedTicket,
    debouncedAWB,
    debouncedMarket,
  ]);

  //* Render component===============================================================
  return (
    <>
      <Modal
        open={props.open}
        onCancel={() => props.callBackCanCel(false)}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
        className="custom-modal"
        title={props.title}
        width={1000}
        footer={null}
      >
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
          locale={{
            emptyText: <ContenNoData desc="Không có dữ liệu" />,
          }}
          dataSource={mapProductDO}
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
      </Modal>
      <ModalDetailWaitingProcessDo
        open={open}
        callBackCanCel={handleCancel}
        datefrom={props.datefrom}
        dateto={props.dateto}
        title={props.titleDetail}
        id={autoId}
        arrTrangThai={props.arrtrangthai}
        datadetail={DataDetail}
      />
    </>
  );
};
export default ModalWaitingProcessDo;
