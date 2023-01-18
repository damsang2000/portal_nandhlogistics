import React, { useState } from 'react';
import {
  Modal,
  Row,
  Col,
  Space,
  Select,
  Button,
  notification,
  Input,
  DatePicker,
  Form,
} from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import Cookies from 'universal-cookie';

import { useDispatch } from 'react-redux';
import { isArray } from 'lodash';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ListNCC from '../ListNCCByChuHang';
import ListSieuThi from '../ListSieuThi';
import TableInsertProductASN from '../TableInsertProductASN';
import { dataPostInsestASN } from '../../data';

const _ = require('lodash');

const ModalASN = (props) => {
  // ? state extension
  const { Option } = Select;
  const cookies = new Cookies();
  const dispatch = useDispatch();

  // ? state format date
  const date = moment().format('DD/MM/YYYY');
  const dateFormat = 'DD/MM/YYYY';

  // ? state component
  const [asnno, setAsno] = useState('');
  const [inputType, setInputType] = useState('1');
  const [dataPost, setDataPost] = useState('');
  const [ASNDate, setASNDate] = useState('');
  const [NhaCC, setNhaCC] = useState('');
  const [MaSieuThi, setMaSieuThi] = useState('');
  const [Empty, setEmpty] = useState(false);
  const [numberCar, setNumberCar] = useState('');
  const [driver, setDriver] = useState('');
  const [note, setNote] = useState('');
  const [refNo, setRefNo] = useState('');
  const [altNo, setAltNo] = useState('');

  // ? handle function state component
  // ! function set inputType
  const handleInputType = (value) => {
    setInputType(value);
  };

  // ! function handle notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, des) => {
    api[type]({
      message: message,
      description: des,
      duration: 1,
    });
  };
  // ! set data post handle
  const handleDataPost = (data) => {
    setDataPost(data);
  };
  // ! function handle set MaNCC
  const handleNhaCC = (data) => {
    setNhaCC(data);
  };
  // ! function handle set MaSieuThi
  const handleMaSieuThi = (data) => {
    setMaSieuThi(data);
  };
  const handleEmpty = (data) => {
    setEmpty(data);
  };
  // ? handle function api
  // ! function insert asn
  const insertASN = () => {
    // ! get data prepare
    if (!isArray(dataPost)) {
      openNotificationWithIcon('error', 'Chưa thêm sản phẩm');
    } else {
      const datainsert = dataPostInsestASN(
        cookies.get('token'),
        asnno,
        cookies.get('owner_code')
          ? cookies.get('owner_code')
          : localStorage.getItem('owner_code'),
        '6500',
        inputType,
        NhaCC,
        MaSieuThi,
        numberCar,
        driver,
        note,
        refNo,
        altNo,
        dataPost
      );
      // ! filter key null of Data
      const datas = _.omitBy(datainsert.Data, (v) => v === null);
      // ! filter key null of transaction detail
      const changeDataNull = datainsert.Data.Transaction_Detail.map((item) => {
        const i = _.omitBy(item, (v) => v === null);
        return i;
      });
      datas.Transaction_Detail = changeDataNull;
      const dataPostUl = {
        Auth: datainsert.Auth,
        Data: datas,
      };
      props.callBackCanCel(false);
      dispatch(Changeloading({ loading: true }));
      fetch('https://wms.laziki.com//API_Data_V7.ashx ', {
        method: 'POST',
        body: JSON.stringify(dataPostUl),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.Message.Message_Code === 200) {
            openNotificationWithIcon(
              'success',
              'Thêm thành công',
              data.Message.Message_Desc
            );
            setTimeout(() => {
              props.refreshdata();
            }, 1000);
            setEmpty(!Empty);
          } else {
            props.callBackCanCel(false);
            openNotificationWithIcon('error', 'Lỗi', data.Message.Message_Desc);
            dispatch(Changeloading({ loading: false }));
          }
        });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        // onFinish={onFinish}
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
        className="custom-form"
      >
        <Modal
          bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
          className="custom-modal"
          open={props.open}
          title="Hiệu chỉnh Kế hoạch nhập"
          onCancel={() => props.callBackCanCel(false)}
          width={1000}
          footer={[
            <Button
              key="Lưu"
              type="primary"
              onClick={insertASN}
              danger
            >
              Lưu
            </Button>,
          ]}
        >
          <Row
            gutter={[24, 24]}
            className="custom-row-gap"
          >
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Số Phiếu"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    value={asnno}
                    onChange={(e) => setAsno(e.target.value)}
                    className="custom-input"
                  />
                </Form.Item>
              </Space>
            </Col>

            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Ngày Kế Hoạch"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <DatePicker
                    onChange={(dateString) => setASNDate(dateString)}
                    className="createDateRangePicker"
                    dropdownClassName="createDateRangePicker"
                    defaultValue={dayjs(date, dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Space>
            </Col>

            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Số Alt"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    className="custom-input"
                    onChange={(e) => setAltNo(e.target.value)}
                  />
                </Form.Item>
              </Space>
            </Col>

            <Col
              className="gutter-row"
              span={4}
            >
              <Space className="custom-modal-space">
                <ListNCC
                  idchuhang={cookies.get('idchuhang')}
                  ismodal
                  handleStateNhaCC={handleNhaCC}
                />
              </Space>
            </Col>

            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Số xe"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    className="custom-input"
                    onChange={(e) => setNumberCar(e.target.value)}
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Số cont"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Space>
            </Col>
            {/* 2 */}
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Số seal"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Tài xế"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    className="custom-input"
                    onChange={(e) => setDriver(e.target.value)}
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Loại hình nhập"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    className="select-custom"
                    popupClassName="select-custom"
                    value={inputType}
                    style={{ width: 170 }}
                    onChange={handleInputType}
                  >
                    <Option value="1">Nhập từ NCC</Option>
                    <Option value="2">Nhập Trả Hàng</Option>
                    <Option value="3">Nhập chuyển kho</Option>
                  </Select>
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={12}
            >
              <ListSieuThi
                idchuhang={cookies.get('idchuhang')}
                handleStateMaSieuThi={handleMaSieuThi}
              />
            </Col>
            {/* 3 */}
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Số invoice"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Ngày invoice"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <DatePicker
                    className="createDateRangePicker"
                    dropdownClassName="createDateRangePicker"
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Ref no"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    className="custom-input"
                    onChange={(e) => setRefNo(e.target.value)}
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Cổng nhập hàng"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    placeholder="Chọn cổng nhập hàng"
                    className="select-custom"
                    popupClassName="select-custom"
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Hợp đồng KNQ"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    placeholder="Chọn hợp đồng"
                    className="select-custom"
                    popupClassName="select-custom"
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={24}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Ghi chú"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="custom-input"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Space direction="vertical">
            <TableInsertProductASN
              idchuhang={cookies.get('idchuhang')}
              dataPostCallBack={handleDataPost}
              check={props.check}
              ChangeEmpty={handleEmpty}
            />
          </Space>
        </Modal>
      </Form>
    </>
  );
};

export default ModalASN;
