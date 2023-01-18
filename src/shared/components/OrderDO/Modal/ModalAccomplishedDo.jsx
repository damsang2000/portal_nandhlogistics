import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

//? import component and helper function
import OrderDOApi from '../../../../api/OrderDOApi';
import usePagination from '../../../../hook/usePagination';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../helpers';
import ContenNoData from '../../ContenNoData';
import ModalDetailWaitingProcessDo from '../ModalDetail/ModalDetailWaitingProcessDo';

const ModalAccomplishedDo = (props) => {
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

  //? function handle
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

  //! handle open and close modal
  const showModal = (data) => {
    setDataDetail(data);
    setautoId(data.id);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //! handle render html while get data api
  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }

  //* Columns Table
  const columns = [
    {
      title: 'Số Phiếu',
      dataIndex: 'so_Phieu_Xuat_Kho',
      key: 'so_Phieu_Xuat_Kho',
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
      title: 'Số AWB',
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
      title: 'Nơi Xuất Đến',
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
  //* Map data DO render
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

  //* CALL API===========================================================================
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
            arrTrangThaiXuatKho: [4],
          };
          const response = await OrderDOApi.getAll(data);
          if (!response.result) {
            setpage(1);
          } else {
            setProductDO(response.result);
            setTotal(response.total);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDOProduct();
    }
    return () => {
      setProductDO([]);
      setTotal(0);
    };
  }, [idchuhang.idchuhang, page, PageSize, props.isrender]);

  //* RENDER COMPONENT=================================================================================
  return (
    <>
      <Modal
        open={props.open}
        onCancel={() => props.callBackCanCel(false)}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
        className="custom-modal"
        title="Đơn hàng đã hoàn thành"
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
        />
      </Modal>
      <ModalDetailWaitingProcessDo
        open={open}
        callBackCanCel={handleCancel}
        datefrom={props.datefrom}
        dateto={props.dateto}
        title="Chi tiết đơn hàng đã hoàn thành"
        id={autoId}
        arrTrangThai={[4]}
        datadetail={DataDetail}
      />
    </>
  );
};
export default ModalAccomplishedDo;
