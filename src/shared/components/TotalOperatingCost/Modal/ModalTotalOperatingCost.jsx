import React from 'react';
import { Table, Modal, Tabs } from 'antd';
import CurrencyFormat from 'react-currency-format';
import usePagination from '../../../../hook/usePagination';
import ContenNoData from '../../ContenNoData';
import TabCostTotal from '../Tabs/TabCostTotal';

const ModalTotalOperatingCost = (props) => {
  // ? column
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 100,
    },
    {
      title: 'Tên loại',
      dataIndex: 'tenLoai',
    },
    {
      title: 'Diễn giãi',
      dataIndex: 'dienGiai',
    },
    {
      title: 'ĐVT',
      dataIndex: 'dvt',
      width: 130,
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      width: 130,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
      key: 'donGia',
      render: (text, record) => (
        <CurrencyFormat
          value={Number(record.donGia)}
          displayType={'text'}
          thousandSeparator={true}
          renderText={(value) => (
            <span
              style={{
                color: 'red',
                fontWeight: 'bold',
              }}
            >
              {value}
            </span>
          )}
        />
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'thanhTien',
      key: 'thanhTien',
      render: (text, record) => (
        <CurrencyFormat
          value={Number(record.thanhTien)}
          displayType={'text'}
          thousandSeparator={true}
          renderText={(value) => (
            <span
              style={{
                color: 'red',
                fontWeight: 'bold',
              }}
            >
              {value}
            </span>
          )}
        />
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghiChu',
      key: 'ghiChu',
    },
  ];

  //? tab items
  // ? array tab item
  const items = [
    {
      label: (
        <p>
          Phí xử lý hàng hóa
          <CurrencyFormat
            value={Number(props.totalHanle ? props.totalHanle.toFixed(0) : 0)}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value) => <span>{`(${value})`}</span>}
          />
        </p>
      ),
      key: 1,
      children: <TabCostTotal datadetail={props.data ? props.data : null} />,
    },
    {
      label: (
        <p>
          Phí xử lý DC
          <CurrencyFormat
            value={Number(props.totalDC ? props.totalDC.toFixed(0) : 0)}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value) => <span>{`(${value})`}</span>}
          />
        </p>
      ),
      key: 2,
      children: (
        <TabCostTotal datadetail={props.dataDC ? props.dataDC : null} />
      ),
    },
    {
      label: (
        <p>
          Phí soạn hàng và đóng gói
          <CurrencyFormat
            value={Number(props.totalPack ? props.totalPack.toFixed(0) : 0)}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value) => <span>{`(${value})`}</span>}
          />
        </p>
      ),
      key: 3,
      children: (
        <TabCostTotal datadetail={props.dataPack ? props.dataPack : null} />
      ),
    },
  ];
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
  const TotalPage = props.data ? props.data.length : 0;
  return (
    <Modal
      title={props.title}
      onCancel={props.callBackCancel}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}
      open={props.open}
      className="custom-modal"
      footer={null}
    >
      {props.isTab ? (
        <Tabs
          type="card"
          items={items}
        />
      ) : (
        <Table
          bordered
          width={1000}
          columns={columns}
          dataSource={props.data}
          pagination={{
            position: position,
            total: props.data ? props.data.length : 0,
            pageSize: PageSize,
            onChange: getData,
            onShowSizeChange: getDataSize,
            pageSizeOptions: pageOption,
          }}
          locale={{
            emptyText: <ContenNoData desc="Không có dữ liệu" />,
          }}
          footer={() =>
            page && TotalPage !== 0 ? (
              <p
                style={{
                  color: 'black',
                }}
              >{`Page ${page} of ${Math.ceil(
                TotalPage / PageSize
              )} (${TotalPage} items)`}</p>
            ) : null
          }
        />
      )}
    </Modal>
  );
};

export default ModalTotalOperatingCost;
