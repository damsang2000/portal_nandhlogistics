/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import {
  DownOutlined,
  PlusCircleOutlined,
  FormOutlined,
} from '@ant-design/icons';
import {
  Table,
  Tag,
  Tooltip,
  Dropdown,
  DatePicker,
  Space,
  Typography,
  Button,
  Select,
  Modal,
  Descriptions,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import Cookies from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { formatDateTime, formarDateTimeddmmyyy } from '../helpers';
import usePagination from '../../hook/usePagination';
import ContenNoData from './ContenNoData';

const ModalDetailASN2 = (props) => {
  const [ASNDetail, setASNDetail] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);

  const cookies = new Cookies();

  let mapASNDetail = [];
  let detailDataASN = {};

  // ? state component
  const [TotalPage, setTotalPage] = useState(1);
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

  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  const columns = [
    {
      title: 'Mã hàng',
      dataIndex: 'ma_San_Pham',
      key: 'ma_San_Pham',
      width: 100,
    },
    // {
    //     title: 'Mã Loại Hàng',
    //     dataIndex: 'Ma_Loai_San_Pham',
    // },
    {
      title: 'Tên Hàng',
      dataIndex: 'ten_San_Pham',
      width: 200,
      render: (ten_San_Pham) => (
        <p style={{ color: 'rgba(71, 71, 135,1.0)', fontWeight: 'bold' }}>
          {ten_San_Pham}
        </p>
      ),
    },
    {
      title: 'Số Batch',
      dataIndex: 'so_Batch',
      width: 100,
    },
    {
      title: 'Ngày SX',
      dataIndex: 'ngay_San_Xuat',
      key: 'Ngay_Ke_Hoach',
      width: 100,
    },
    {
      title: 'Ngày Hết Hạn',
      dataIndex: 'ngay_Het_Han',
      key: 'Ref_No',
      width: 100,
    },
    {
      title: 'Life(%)',
      dataIndex: 'life',
      width: 100,
    },
    {
      title: 'Chứng Từ',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.so_Kien}</div>,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.so_Luong}</div>,
            };
          },
        },
        {
          title: 'GW',
          dataIndex: 'tong_GW',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tong_GW}</div>,
            };
          },
        },
        {
          title: 'NW',
          dataIndex: 'tong_NW',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tong_NW}</div>,
            };
          },
        },
        {
          title: 'CBM',
          dataIndex: 'tong_CBM',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tong_CBM}</div>,
            };
          },
        },
      ],
    },
    {
      title: 'Thực Nhận',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.so_Kien_Receive}</div>,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.so_Kien_Receive}</div>,
            };
          },
        },
        {
          title: 'GW',
          dataIndex: 'tong_GW_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_GW_Receive}</div>,
            };
          },
        },
        {
          title: 'NW',
          dataIndex: 'tong_NW_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_NW_Receive}</div>,
            };
          },
        },
        {
          title: 'CBM',
          dataIndex: 'tong_CBM_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_CBM_Receive}</div>,
            };
          },
        },
      ],
    },
  ];
  detailDataASN = [
    {
      ...props.datadetail,
      ngay_Nhap_Kho: props.datadetail.ngay_Nhap_Kho
        ? formarDateTimeddmmyyy(props.datadetail.ngay_Nhap_Kho.slice(0, 10))
        : '',
      ngay_San_Xuat: props.datadetail.ngay_San_Xuat
        ? formarDateTimeddmmyyy(props.datadetail.ngay_San_Xuat.slice(0, 10))
        : '',
      ngay_Het_Han: props.datadetail.ngay_Het_Han
        ? formarDateTimeddmmyyy(props.datadetail.ngay_Het_Han.slice(0, 10))
        : '',
    },
  ];
  return (
    <>
      <Modal
        open={props.open}
        onCancel={props.callBackCanCel}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
        className="custom-modal"
        title={props.title}
        width={1000}
        footer={null}
      >
        <Row>
          <Col span={12}>
            <Descriptions
              bordered
              style={{ marginBottom: '10px', width: '95%' }}
              size="small"
            >
              <Descriptions.Item
                label="Số phiếu"
                span={4}
              >
                <p style={{ fontWeight: 'bolder', color: 'red' }}>
                  {props.datadetail.so_Phieu_Nhap_Kho
                    ? props.datadetail.so_Phieu_Nhap_Kho
                    : ''}
                </p>
              </Descriptions.Item>
              <Descriptions.Item
                label="Alt No"
                span={4}
              >
                {props.datadetail.Alt_no_1 || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Người nhận hàng"
                span={4}
              >
                {props.datadetail.nguoi_nhan || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Ngày giờ nhận hàng"
                span={4}
              >
                {props.datadetail.ngay_gio_nhan || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Ghi chú"
                span={4}
              >
                {props.datadetail.ghi_chu || ''}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions
              bordered
              style={{ marginBottom: '10px' }}
              size="small"
            >
              <Descriptions.Item
                label="Ngày nhập kho"
                span={3}
              >
                {props.datadetail.ngay_Nhap_Kho || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Loại hình nhập"
                span={3}
              >
                {props.datadetail.loai_Hinh_Nhap_Kho_Text || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Nhà cung cấp"
                span={3}
              >
                {props.datadetail.ten_NCC || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Trạng thái nhập kho"
                span={3}
              >
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    props.datadetail.trang_thai_nhap_kho
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item
                label="Tổng mã hàng"
                span={3}
              >
                1
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Table
          columns={columns}
          bordered
          style={{ borderRadius: '20px' }}
          dataSource={detailDataASN}
          pagination={{
            total: TotalPage,
            position: position,
          }}
          footer={() =>
            TotalPage ? (
              <p
                style={{
                  color: 'black',
                }}
              >{`Page ${page} of ${Math.ceil(
                TotalPage / 1
              )} (${TotalPage} items)`}</p>
            ) : null
          }
          locale={{
            emptyText: <ContenNoData desc="Không có dữ liệu" />,
          }}
        />
      </Modal>
    </>
  );
};
export default ModalDetailASN2;
