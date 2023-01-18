/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable import/extensions */

import { 
Table,Tooltip,Modal,
} from 'antd';

import React from 'react';



const ModalSellingProduct = (props) => {

const columns = [
{
    title: 'STT',
    dataIndex: 'sttRow',
    key: 'sttRow',
    width: 150,
},
{
    title: 'Mã Sản Phẩm',
    dataIndex: 'ma_San_Pham',
    width: 150,
},
{
    title: 'Tên Sản Phẩm',
    dataIndex: 'ten_San_Pham',
    width: 500,
    ellipsis: {
        showTitle: false,
      },
      render: ten_San_Pham => (
        <Tooltip placement="topLeft" title={ten_San_Pham}>
          {ten_San_Pham}
        </Tooltip>
      ),
},
{
    title: 'SL tổng bán ra',
    dataIndex: 'tong',
},
];
return (
  <>
    <Modal
      open={props.open}
      onCancel={() => props.callBackCanCel(false)}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
      className="custom-modal"
      title="Sản phẩm bán chạy"
      width={1000}
      footer={null}
    >
    <Table
      columns={columns}
      bordered
      style={{ borderRadius: '20px' }}
      dataSource={props.data}
    />
    </Modal>
    
  </>
);
};
export default ModalSellingProduct;

