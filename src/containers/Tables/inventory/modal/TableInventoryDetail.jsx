import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import ContenNoData from '../../../../shared/components/ContenNoData';
import usePagination from '../../../../hook/usePagination';
import KhoApi from '../../../../api/KhoAPI';

const columns = [
  {
    title: 'ID',
    dataIndex: 'auto_ID',
    render: (value, record) => (
      <p style={{ color: '#ff4861', fontWeight: 'bold' }}>{record.auto_ID}</p>
    ),
  },
  {
    title: 'Mã Hàng',
    dataIndex: 'ma_San_Pham',
    render: (value, record) => (
      <p style={{ color: '#ff4861', fontWeight: 'bold' }}>
        {record.ma_San_Pham}
      </p>
    ),
  },
  {
    title: 'Tên Hàng',
    dataIndex: 'ten_San_Pham',
  },
  {
    title: 'Vị trí',
    dataIndex: 'ma_So_Vi_Tri',
  },
  {
    title: 'Khu vực',
    dataIndex: 'ten_Khu_Vuc_Kho_VT',
    render: (value, record) => (
      <p style={{ color: '#ff4861', fontWeight: 'bold' }}>
        {record.ten_Khu_Vuc_Kho_VT}
      </p>
    ),
  },
  {
    title: 'Số Batch',
    dataIndex: 'so_Batch',
  },
  {
    title: 'Ngày SX',
    dataIndex: 'ngay_San_Xuat',
  },
  {
    title: 'Kiện',
    dataIndex: 'so_Kien',
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
    title: 'SL',
    dataIndex: 'so_Luong',
    render(text, record) {
      return {
        props: {
          style: { background: 'rgba(255, 218, 121,0.3)' },
        },
        children: <div className="center-text">{record.so_Luong}</div>,
      };
    },
  },
  {
    title: 'Số kiện kiểm',
    dataIndex: 'so_Kien_Thuc_Te',
    render(text, record) {
      return {
        props: {
          style: { background: 'rgba(112, 111, 211,0.3)' },
        },
        children: <div className="center-text">{record.so_Kien_Thuc_Te}</div>,
      };
    },
  },
  {
    title: 'Số lượng kiểm',
    dataIndex: 'so_Luong_Thuc_Te',
    render(text, record) {
      return {
        props: {
          style: { background: 'rgba(112, 111, 211,0.3)' },
        },
        children: <div className="center-text">{record.so_Luong_Thuc_Te}</div>,
      };
    },
  },
];

const TableInventoryDetail = (props) => {
  //? state component
  const [detailInventory, setDetailInventory] = useState([]);

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

  //* Call API====================================================
  useEffect(() => {
    const fetchDetailInventory = async () => {
      if (props.dataDetail.auto_ID) {
        const data = {
          sortName: null,
          isAsc: true,
          page: page,
          pageCount: PageSize,
          date_From: props.datefrom,
          date_To: props.dateto,
          kiem_Kho_ID: props.dataDetail.auto_ID,
          xem_Type_ID: 1,
        };
        const response = await KhoApi.getDetailInventoryByID(data);
        if (response) {
          setTotal(response.total);
          setDetailInventory(response.result);
        }
      }
    };
    fetchDetailInventory();
    return () => {
      setTotal(0);
      setDetailInventory([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataDetail.auto_ID, page, PageSize]);

  return (
    <Modal
      title={props.title}
      onCancel={props.callBackOpen}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}
      open={props.open}
      className="custom-modal"
      footer={null}
    >
      <Table
        bordered
        width={1000}
        columns={columns}
        dataSource={detailInventory}
        pagination={{
          position: position,
          total: Total,
          pageSize: PageSize,
          onChange: getData,
          onShowSizeChange: getDataSize,
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
      />
    </Modal>
  );
};

export default TableInventoryDetail;
