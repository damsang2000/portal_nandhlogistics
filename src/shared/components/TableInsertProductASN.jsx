/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable arrow-body-style */
import React, { useState, useLayoutEffect } from 'react';
import {
  Modal,
  Space,
  Select,
  DatePicker,
  Typography,
  Button,
  Input,
  Table,
  Col,
  Row,
  Form,
  Dropdown,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import moment from 'moment';
import dayjs from 'dayjs';
import {
  formatDateTimeddmmyyyy1,
  formatDateTimemmddyyyy,
  formarDateTimeddmmyyy,
} from '../helpers';

// ? import component
import ListItem from './ListItem';
import { IconCustom } from './IconCustom';

const TableInsertProductASN = (props) => {
  // ? state component
  const [open, setOpen] = useState(false);
  const [DataTable, setDataTable] = useState([]);
  const [dataPost, setdataPost] = useState([]);

  // ? state extension
  // Title antd
  const { Title } = Typography;

  // ? state object push table
  const [maSanPham, setMaSanPham] = useState('');
  const [ngaySX, setNgaySX] = useState('');
  const [ngayHH, setNgayHH] = useState('');
  const [kien, setKien] = useState('');
  const [sl, setSL] = useState('');
  const [numberBatch, setNumberBatch] = useState('');
  const [numberGW, setNumberGW] = useState('');
  const [numberNW, setNumberNW] = useState('');
  const [numberCBM, setNumberCBM] = useState('');

  // ? state normal
  // state cookies
  const cookies = new Cookies();
  const formatdate = 'DD/MM/YYYY';
  const date = moment().format('DD/MM/YYYY');

  // ? function handle component
  // handle function cancel
  const handleCancel = () => {
    setOpen(false);
  };
  // handle funtion show modal
  const showModal = () => {
    setOpen(true);
  };
  // ? function handle column action
  // ? column action

  const items = [
    {
      label: 'Thêm',
      key: '1',
      icon: <PlusCircleOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: showModal,
  };

  // ? column table
  const columns = [
    {
      title: 'Thao tác',
      width: 100,
      // eslint-disable-next-line react/button-has-type
      render: (text) => (
        <Dropdown
          placement="bottomLeft"
          menu={menuProps}
        >
          <IconCustom />
        </Dropdown>
      ),
    },
    {
      title: 'Mã Hàng',
      dataIndex: 'ma_San_Pham',
      key: 'ma_San_Pham',
      width: 230,
      fixed: 'left',
      render: (ma_San_Pham) => (
        <p style={{ color: '#ff4861', fontWeight: 'bold' }}>{ma_San_Pham}</p>
      ),
      onFilter: (value, record) => record.ma_San_Pham.includes(value),
    },

    {
      title: 'Số batch',
      dataIndex: 'sobatch',
      key: 'sobatch',
      width: 100,
    },
    {
      title: 'Ngày SX',
      dataIndex: 'ngay_sx',
      key: 'ngay_sx',
      width: 100,
    },

    {
      title: 'Ngày Hết Hạn',
      dataIndex: 'ngay_hh',
      key: 'ngay_hh',
      width: 110,
    },

    {
      title: 'Tên ĐVT',
      dataIndex: 'ten_Don_Vi_Tinh_Thung',
      key: 'ten_Don_Vi_Tinh_Thung',
      width: 100,
    },
    {
      title: 'SL',
      dataIndex: 'sl',
      key: 'sl',
      width: 70,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'sL_Cai_1_Thung',
      key: 'sL_Cai_1_Thung',
      width: 150,
    },
    {
      title: 'GW',
      dataIndex: 'gw',
      key: 'gw',
      width: 70,
    },
    {
      title: 'NW',
      dataIndex: 'nw',
      key: 'nw',
      width: 70,
    },
    {
      title: 'CBM',
      dataIndex: 'cbm',
      key: 'cbm',
      width: 70,
    },
  ];

  // ? function action
  const handleNgaySX = (value, dateString) => {
    console.log(dateString);

    const formatDate1 = formarDateTimeddmmyyy(dateString);
    const formatDate = formatDateTimemmddyyyy(formatDate1);
    setNgaySX(formatDate);
    localStorage.setItem('ngaysx', formatDate1);
  };
  const handleNgayHH = (value, dateString) => {
    const formatDate1 = formarDateTimeddmmyyy(dateString);
    const formatDate = formatDateTimemmddyyyy(formatDate1);
    setNgayHH(formatDate);
    localStorage.setItem('ngayhh', formatDate1);
  };
  const callBackMaHang = (mahang) => {
    setMaSanPham(mahang);
  };
  // if (!localStorage.getItem('newdata')) {
  //   setDataTable([]);
  // }
  const handleKien = (e) => {
    setKien(e.target.value);
  };
  const handleSL = (e) => {
    setSL(e.target.value);
  };
  const onFinish = (values) => {
    console.log(values);

    const newdata = {
      ma_San_Pham: maSanPham.title,
      ngay_sx: ngaySX ? formatDateTimemmddyyyy(ngaySX) : null,
      ngay_hh: ngayHH ? formatDateTimemmddyyyy(ngayHH) : null,
      kien: sl,
      sl: sl,
      sobatch: numberBatch || null,
      gw: numberGW || null,
      nw: numberNW || null,
      cbm: numberCBM || null,
    };
    const data = {
      ma_San_Pham: maSanPham.maHang,
      ngay_sx: ngaySX || null,
      ngay_hh: ngayHH || null,
      kien: sl,
      sl: sl,
      sobatch: numberBatch || null,
      gw: numberGW || null,
      nw: numberNW || null,
      cbm: numberCBM || null,
    };
    const dataUl = [...dataPost, data];
    setDataTable([...DataTable, newdata]);
    setdataPost([...dataPost, data]);
    console.log(dataUl);
    props.dataPostCallBack(dataUl);
    localStorage.setItem('newdata', newdata);
    handleCancel();
  };
  useLayoutEffect(() => {
    setDataTable([]);
    setdataPost([]);
  }, [props.check]);

  // eslint-disable-next-line no-empty

  return (
    <>
      <Table
        locale={{
          emptyText: (
            <span>
              <Button
                type="primary"
                danger
                style={{ marginBottom: '10px' }}
                onClick={showModal}
              >
                Thêm
              </Button>
              <p>Không có dữ liệu</p>
            </span>
          ),
        }}
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        scroll={{
          x: 1300,
          y: 300,
        }}
        dataSource={DataTable}
      />
      <Modal
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
        open={open}
        className="custom-modal-detail"
        title="Chỉnh sửa thông tin"
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <Form
          name="basic"
          id="myform"
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="center"
        >
          <Row className="custom-row">
            <Col span={12}>
              <ListItem
                idchuhang={cookies.get('idchuhang')}
                ismodal
                parentCallBack={callBackMaHang}
              />
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số Batch"
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                  onChange={(e) => setNumberBatch(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày SX"
                name="ngaysx"
              >
                <DatePicker
                  style={{ width: '100%' }}
                  className="createDateRangePicker"
                  dropdownClassName="createDateRangePicker"
                  onChange={handleNgaySX}
                  format={formatdate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày hết hạn"
                name="ngayhh"
              >
                <DatePicker
                  style={{ width: '100%' }}
                  className="createDateRangePicker"
                  dropdownClassName="createDateRangePicker"
                  onChange={handleNgayHH}
                  format={formatdate}
                />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
                      <Form.Item 
                            label="Kiện" 
                            name="kien"
                            rules={[
                                  {
                                    required: true,
                                    message: 'Vui lòng nhập số kiện',
                                  },
                                ]}
                      >
                          <Input 
                            placeholder="Nhập số kiện"
                            style={{ width: '100%' }} 
                            className="custom-input"
                           onChange={handleKien}
                          />
                      </Form.Item> 
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="SL"
                name="sl"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số lượng',
                  },
                ]}
              >
                <Input
                  onChange={handleSL}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="GW">
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                  onChange={(e) => setNumberGW(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="NW">
                <Input
                  className="custom-input"
                  onChange={(e) => setNumberNW(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CBM">
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                  onChange={(e) => setNumberCBM(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                >
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default TableInsertProductASN;
