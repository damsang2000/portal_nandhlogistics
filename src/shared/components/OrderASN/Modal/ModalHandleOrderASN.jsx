import { Table, Modal } from 'antd';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

//? import component
import { formatDateTime, formarDateTimeddmmyyy } from '../../../helpers';
import ModalDetailASN from '../ModalDetail/ModalDetailASN';
import OrderASNApi from '../../../../api/OrderASNApi';
import usePagination from '../../../../hook/usePagination';
import ContenNoData from '../../ContenNoData';
import { useDebounce } from '../../../../hook';
import InputColumns from '../../InputColumns';

const ModalHandleOrderASN = (props) => {
  // ? state extension
  const idchuhang = useSelector((state) => state.idchuhang);
  const cookies = new Cookies();
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
  //! state asn
  const [ASNDetail, setASNDetail] = useState([]);
  const [importProduct, setImportProduct] = useState([]);
  let mapImportProduct = [];
  const [autoId, setautoId] = useState('');
  const [DataDetail, setDataDetail] = useState('');

  //! state debounced
  const [textSearch, setTextSeach] = useState(null);
  const [Market, setMarket] = useState(null);
  const [MaNCC, setMaNCC] = useState(null);
  const debounced = useDebounce(textSearch, 500);
  const debouncedNCC = useDebounce(MaNCC, 500);
  const debouncedMarket = useDebounce(Market, 500);

  //! state modal
  const [open, setOpen] = useState(false);

  //? function handle
  //! handle open
  const showModal = (data) => {
    setautoId(data.id);
    setDataDetail(data);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  //! function handle render html while get data api
  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }

  //* Columns Table===============================================
  const columns = [
    {
      title: (
        <InputColumns
          fHandle={setTextSeach}
          title="Số phiếu"
          setpage={setpage}
        />
      ),
      dataIndex: 'so_Phieu_Nhap_Kho',
      key: 'so_Phieu_Nhap_Kho',
      width: 150,
      render: (text, record, index) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            const dataDetail = {
              so_phieu_nhap: record.so_Phieu_Nhap_Kho,
              altNo: record.so_Alt_1,
              so_xe: record.so_Xe,
              ghi_chu: record.ghi_Chu,
              loai_hinh_nhap: record.loai_Hinh_Nhap_Kho_Text,
              ten_sieu_thi: record.ten_Sieu_Thi_Full,
              ma_ncc: record.ten_NCC,
              trang_thai_nhap_kho: record.trang_Thai_Nhap_Kho_HTML,
              id: record.auto_ID,
            };
            return showModal(dataDetail);
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
        <span
          color="#00b894"
          key={trang_Thai_Quet_Barcode_Text}
          className="label label-primary-code"
        >
          {trang_Thai_Quet_Barcode_Text}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_Thai_Nhap_Kho_HTML',
      key: 'trang_thai_quet_barcode',
      width: 120,
      render: (trang_Thai_Nhap_Kho_HTML) => (
        <div dangerouslySetInnerHTML={createMarkup(trang_Thai_Nhap_Kho_HTML)} />
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
      width: 200,
      dataIndex: 'ten_NCC',
      key: 'ten_NCC',
    },
    {
      title: (
        <InputColumns
          fHandle={setMarket}
          title="Nơi xuất đến"
          setpage={setpage}
        />
      ),
      width: 200,
      dataIndex: 'ten_Sieu_Thi_Full',
      key: 'ten_Sieu_Thi_Full',
    },
    {
      title: 'Ref No',
      dataIndex: 'ref_No',
      key: 'ref_No',
      width: 100,
      render: (ref_No) => (
        <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{ref_No}</p>
      ),
    },
  ];
  //* Map data asn render
  if (importProduct && importProduct.length !== 0) {
    mapImportProduct = importProduct.map((item, index) => ({
      key: index,
      ...item,
      ten_NCC: item.ten_NCC ? item.ten_NCC : '',
      ngay_Ke_Hoach: formarDateTimeddmmyyy(item.ngay_Ke_Hoach.slice(0, 10)),
    }));
  }

  // * CALL API=======================================================
  useEffect(() => {
    setASNDetail([]);
    if (cookies.get('idchuhang')) {
      const fetchASNProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: false,
            page: page,
            pageCount: PageSize,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: 2631604,
            arrTrangThaiNhap: [...props.arrtrangthai],
            date_From: localStorage.getItem('datefromimportDashboard')
              ? formatDateTime(localStorage.getItem('datefromimportDashboard'))
              : props.datefrom,
            date_To: localStorage.getItem('datetoimportDashboard')
              ? formatDateTime(localStorage.getItem('datetoimportDashboard'))
              : props.dateto,
            so_Phieu_Nhap_Kho: debounced ? debounced : null,
            ten_NCC: debouncedNCC ? debouncedNCC : null,
            ten_Sieu_Thi_Full: debouncedMarket ? debouncedMarket : null,
            xem_Type_ID: 1,
          };
          const response = await OrderASNApi.getAll(data);
          if (!response.result) {
            setpage(1);
          } else {
            setImportProduct(response.result);
            setTotal(response.total);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchASNProduct();
    }
    return () => {
      setImportProduct([]);
      setTotal(0);
    };
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    props.isrender,
    debounced,
    debouncedNCC,
    debouncedMarket,
  ]);

  // * RENDER COMPONENT
  return (
    <>
      <Modal
        open={props.open}
        onCancel={() => props.callBackCanCel(false)}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
        className="custom-modal"
        title={props.titleModal}
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
                    <th className="ant-table-cell">GW</th>
                    <th className="ant-table-cell">NW</th>
                    <th className="ant-table-cell">CBM</th>
                  </tr>
                </thead>
                <tr className="ant-table-row">
                  <td>{record.tong_So_Kien}</td>
                  <td>{record.tong_So_Luong}</td>
                  <td>{record.tong_GW}</td>
                  <td>{record.tong_NW}</td>
                  <td>{record.tong_NW}</td>
                </tr>
              </table>
            ),
          }}
          dataSource={mapImportProduct}
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
      <ModalDetailASN
        open={open}
        callBackCanCel={handleCancel}
        datefrom={props.datefrom}
        dateto={props.dateto}
        id={autoId}
        arrTrangThai={props.arrtrangthai}
        inputType={1}
        datadetail={DataDetail}
        title={props.titleModalDetail}
      />
    </>
  );
};
export default ModalHandleOrderASN;
