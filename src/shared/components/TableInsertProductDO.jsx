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
import React, { useState } from 'react';
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

const TableInsertProductDO = (props) => {
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
      title: 'PO Chỉ Định',
      dataIndex: 'ten_San_Pham',
      key: 'ten_San_Pham',
      width: 100,
      //   ellipsis: {
      //       showTitle: false,
      //     },
      //     render: ten_San_Pham => (
      //       <Tooltip placement="topLeft" title={ten_San_Pham}>
      //         <p
      //           style={{ color: '#3742fa', cursor: 'pointer' }}
      //         >
      //           {ten_San_Pham}
      //         </p>
      //       </Tooltip>
      //     ),
    },
    {
      title: 'Lot Chỉ Định',
      dataIndex: 'ngay_sx',
      key: 'ngay_sx',
      width: 100,
      //   ellipsis: {
      //       showTitle: false,
      //     },
      //     render: ten_San_Pham => (
      //       <Tooltip placement="topLeft" title={ten_San_Pham}>
      //         <p
      //           style={{ color: '#3742fa', cursor: 'pointer' }}
      //         >
      //           {ten_San_Pham}
      //         </p>
      //       </Tooltip>
      //     ),
    },

    {
      title: 'Batch Chỉ Định',
      dataIndex: 'ngay_hh',
      key: 'ngay_hh',
    },

    {
      title: 'Serial Chỉ Định',
      dataIndex: 'ten_Don_Vi_Tinh_Thung',
      key: 'ten_Don_Vi_Tinh_Thung',
    },
    {
      title: 'Life (%) >= ...',
      dataIndex: '',

      key: 'ten_Loai_San_Pham',
    },
    {
      title: 'Life (%) <= ...',
      dataIndex: '',
      key: 'sl',
    },
    {
      title: 'Tên ĐVT',
      dataIndex: 'sL_Cai_1_Thung',
      key: 'sL_Cai_1_Thung',
    },
    {
      title: 'LPN ID',
      dataIndex: 'gw',
      key: 'gw',
    },
    {
      title: 'Vị trí chỉ định',
      dataIndex: 'nw',
      key: 'nw',
    },
    {
      title: 'NSX Chỉ Định',
      dataIndex: 'cbm',
      key: 'cbm',
    },
    {
      title: 'Case No',
      dataIndex: 'gw',
      key: 'gw',
    },
    {
      title: 'Line Item',
      dataIndex: 'cbm',
      key: 'cbm',
    },
    {
      title: 'Kiện',
      dataIndex: 'kien',
      key: 'kien',
    },
    {
      title: 'SL',
      dataIndex: 'sl',
      key: 'sl',
    },
    {
      title: 'SL Lẻ',
      dataIndex: 'cbm',
      key: 'cbm',
    },
    {
      title: 'Đơn Giá Xuất',
      dataIndex: 'cbm',
      key: 'cbm',
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'cbm',
      key: 'cbm',
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
      kien: kien,
      sl: sl,
    };
    const data = {
      ma_San_Pham: maSanPham.maHang,
      kien: kien,
      sl: sl,
    };
    const dataUl = [...dataPost, data];
    setDataTable([...DataTable, newdata]);
    setdataPost([...dataPost, data]);
    //   console.log(dataUl);
    props.dataPostCallBack(dataUl);
    //   localStorage.setItem('newdata', newdata);
    handleCancel();
  };

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
          x: 1700,
          y: 300,
        }}
        dataSource={DataTable}
      />
      <Modal
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
        open={open}
        className="custom-modal-detail1"
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
                label="PO Chỉ Định"
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Lot Chỉ Định"
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Batch Chỉ Định"
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Serial Chỉ Định"
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Life (%) >=..."
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Life (%) <=..."
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="LPN ID:"
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Vị trí chỉ định:"
                name="sobatch"
              >
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="NSX Chỉ Định:"
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
              <Form.Item label="Case No:">
                <Input
                  style={{ width: '100%' }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Line Item:">
                <Input className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Kiện:"
                name="kien"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số kiện',
                  },
                ]}
              >
                <Input
                  className="custom-input"
                  onChange={handleKien}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SL:"
                name="sl"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số kiện',
                  },
                ]}
              >
                <Input
                  className="custom-input"
                  onChange={handleSL}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="SL Lẻ:">
                <Input className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Đơn Giá Xuất:">
                <Input className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ghi Chú:">
                <Input className="custom-input" />
              </Form.Item>
            </Col>

            <Col span={24}>
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

export default TableInsertProductDO;
