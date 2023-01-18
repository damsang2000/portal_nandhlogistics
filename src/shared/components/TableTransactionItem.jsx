/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable camelcase */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable arrow-body-style */
import React from 'react';
import { 
    LoadingOutlined,
    PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { 
    Table, Tag, Tooltip, Select, Spin, Dropdown, Modal, Typography, 
} from 'antd';
import { IconCustom } from './IconCustom';




const items = [
    {
      label: 'Thêm',
      key: '1',
      icon: <PlusCircleOutlined />,
    },
    {
      label: 'Sửa',
      key: '2',
      icon: <FormOutlined />,
    },
    {
      label: 'Xóa',
      key: '3',
      icon: <DeleteOutlined />,
    },
  ];
  const menuProps = {
    items,
  };


const columns = [
    {
      title: 'Thao tác',
      width: 100,
      // eslint-disable-next-line react/button-has-type
      render: text => (
        <Dropdown placement="bottomLeft" menu={menuProps}>
          <IconCustom />
        </Dropdown>
      ),
    },

      {
          title: 'Mã Hàng',
          dataIndex: 'ma_San_Pham',
          key: 'ma_San_Pham',
          width: 150,
          render: ma_San_Pham => <p style={{ color: '#ff4861', fontWeight: 'bold' }}>{ma_San_Pham}</p>,
          onFilter: (value, record) => record.ma_San_Pham.includes(value),
      },
  
      {
          title: 'Tên Hàng',
          dataIndex: 'ten_San_Pham',
          key: 'ten_San_Pham',
          width: 300,
          ellipsis: {
              showTitle: false,
            },
            render: ten_San_Pham => (
              <Tooltip placement="topLeft" title={ten_San_Pham}>
                <p
                  style={{ color: '#3742fa', cursor: 'pointer' }}
                >
                  {ten_San_Pham}
                </p>
              </Tooltip>
            ),
      },

      {
          title: 'ĐVT',
          dataIndex: 'ten_Don_Vi_Tinh',
          key: 'ten_Don_Vi_Tinh',
      },
    
      {
          title: 'ĐVT Thùng',
          dataIndex: 'ten_Don_Vi_Tinh_Thung',
          key: 'ten_Don_Vi_Tinh_Thung',
      },
      {
        title: 'Loại Hàng',
        dataIndex: 'ten_Loai_San_Pham',
      
        key: 'ten_Loai_San_Pham',
      },
      {
        title: 'Mã SP NCC',
        dataIndex: 'ma_SP_NCC',
        key: 'ma_SP_NCC',
      },

      // {
      // title: 'Trạng thái quét barcode',
      // dataIndex: 'Trang_Thai_Quet_Barcode_Text',
      // key: 'trang_thai_quet_barcode',
      // render: Trang_Thai_Quet_Barcode_Text => (
      //   <Tag color="#00b894" key={Trang_Thai_Quet_Barcode_Text}>
      //     { Trang_Thai_Quet_Barcode_Text}
      //   </Tag>
      // ),
      // },

      ];

const TableTransactionItem = () => {
  return (
    <Table
      columns={columns}
      bordered
      // eslint-disable-next-line react/jsx-closing-bracket-location
      style={{ borderRadius: '20px' }} 
      expandable={{
      rowExpandable: record => true,
      expandedRowRender: record => (
        <table>
          <thead className="ant-table-thead">
            <tr>
              <th className="ant-table-cell">TG Auto Pick</th>
              <th className="ant-table-cell">TG Pick Xong</th>
              <th className="ant-table-cell">TG Ra Kho</th>
              <th className="ant-table-cell">Ngày Đặt Hàng</th>
              <th className="ant-table-cell">Nơi Xuất Đến</th>
            </tr>
          </thead>
          <tr className="ant-table-row">
            {/* <td>{record.thoi_Diem_Auto_Pick_Hang}</td>
            <td>{record.thoi_Diem_Xac_Nhan_Pick_Xong}</td>
            <td>{record.thoi_Diem_Ra_Khoi_Kho}</td>
            <td>{record.ngay_Gio_Dat_Hang}</td>
            <td>{record.ten_Sieu_Thi_Full}</td> */}
          </tr>
        </table> 
        ),
        }}
      />
  )
}

export default TableTransactionItem;