/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable quotes */
/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  Modal,
  Row,
  Col,
  Typography,
  Space,
  Select,
  Button,
  notification,
  Input,
  DatePicker,
  Form,
  Checkbox,
} from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import ListNCC from '../ListNCCByChuHang';
import ListSieuThi from '../ListSieuThi';
import TableInsertProductASN from '../TableInsertProductASN';
import { dataPostInsestASN, dataPostInsestDO } from '../../data';
import TableInsertProductDO from '../TableInsertProductDO';
import { Changeloading } from '../../../redux/actions/loadingAction';

const _ = require('lodash');

const ModalDO = (props) => {
  // ? state extension
  const { Title } = Typography;
  const { Option } = Select;
  const cookies = new Cookies();

  // ? state format date
  const date = moment().format('DD/MM/YYYY');
  const dateFormat = 'DD/MM/YYYY';

  // ? state component
  const [open, setOpen] = useState(props.open);
  const [dono, setDono] = useState('');
  const [inputType, setInputType] = useState('1');
  const [dataPost, setDataPost] = useState('');
  const [ASNDate, setASNDate] = useState('');
  const [NhaCC, setNhaCC] = useState('');
  const [MaSieuThi, setMaSieuThi] = useState('');
  const dispatch = useDispatch();

  // ? handle function state component
  // * function close modal
  const handleCancel = () => {
    // setOpen(false);
    // setMaNCC(null);
  };
  // * function set ASNo
  const handleDono = (data) => {
    setDono(data);
  };

  // * function set inputType
  const handleInputType = (value) => {
    setInputType(value);
  };

  // * function handle notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, des) => {
    api[type]({
      message: message,
      description: des,
      duration: 1,
    });
  };
  // * set data post handle
  const handleDataPost = (data) => {
    setDataPost(data);
  };
  // * function handle set MaNCC
  const handleNhaCC = (data) => {
    setNhaCC(data);
  };
  // * function handle set MaSieuThi
  const handleMaSieuThi = (data) => {
    setMaSieuThi(data);
  };
  // ? handle function api
  // * function insert asn
  const insertASN = () => {
    props.callBackCanCel(false);
    // // * get data prepare
    const datainsert = dataPostInsestDO(
      cookies.get('token'),
      dono,
      cookies.get('owner_code')
        ? cookies.get('owner_code')
        : localStorage.getItem('owner_code'),
      '6500',
      inputType,
      NhaCC,
      MaSieuThi,
      dataPost
    );
    // // * filter key null of Data
    // const datas = _.omitBy(datainsert.Data, v => v === null);
    // // * filter key null of transaction detail
    // const changeDataNull = datainsert.Data.Transaction_Detail.map((item) => {
    //     const i = _.omitBy(item, v => v === null);
    //     return i;
    // });
    // datas.Transaction_Detail = changeDataNull;
    // console.log(changeDataNull);
    // const dataPostUl = {
    //     Auth: datainsert.Auth,
    //     Data: datas,
    // };
    // console.log(dataPostUl);
    // props.callBackCanCel(false);
    dispatch(Changeloading({ loading: true }));
    fetch('https://wms.laziki.com//API_Data_V7.ashx ', {
      method: 'POST',
      body: JSON.stringify(datainsert),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Message.Message_Code === 200) {
          props.callBackCanCel(false);
          openNotificationWithIcon(
            'success',
            'Th??m th??nh c??ng',
            data.Message.Message_Desc
          );
          setTimeout(() => {
            props.refreshdata();
          }, 1500);
        } else {
          props.callBackCanCel(false);
          openNotificationWithIcon('error', 'L???i', data.Message.Message_Desc);
          dispatch(Changeloading({ loading: false }));
        }
      });
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
          title="Hi???u ch???nh K??? ho???ch xu???t"
          onCancel={() => props.callBackCanCel(false)}
          width={1000}
          footer={[
            <Button
              key="L??u"
              type="primary"
              onClick={insertASN}
              danger
            >
              L??u
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
                  label="S??? Phi???u"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    value={dono}
                    onChange={(e) => setDono(e.target.value)}
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
                  label="Ng??y Xu???t"
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
                  label="S??? Document"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Space>
            </Col>
            {/*  */}
            <Col
              className="gutter-row"
              span={4}
            >
              <Form.Item
                label="L???nh giao h??ng"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input className="custom-input" />
              </Form.Item>
            </Col>

            <Col
              className="gutter-row"
              span={4}
            >
              <ListSieuThi
                idchuhang={cookies.get('idchuhang')}
                handleStateMaSieuThi={handleMaSieuThi}
                modalcustom
              />
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
                  label="Ng?????i nh???n h??ng"
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
                  label="??i???n tho???i ng?????i nh???n"
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
                  label="??/C Ng?????i nh???n h??ng"
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
                  label="S??? xe/cont"
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
              <Form.Item
                label="S??? cont"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input className="custom-input" />
              </Form.Item>
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
                  label="S??? seal"
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
                  label="T??i X???"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="custom-input" />
                </Form.Item>
              </Space>
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
                  label="Lo???i h??nh xu???t:"
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
                    <Option value="1">Xu???t th?????ng</Option>
                    <Option value="2">Xu???t tr??? NCC</Option>
                    <Option value="5">Xu???t B2C TMDT</Option>
                    <Option value="3">Xu???t chuy???n n???i b???</Option>
                    <Option value="9">Xu???t VAS</Option>
                    <Option value="8">Xu???t kh??c</Option>
                    <Option value="7">Xu???t kho ??i???u chuy???n h??ng SH</Option>
                  </Select>
                </Form.Item>
              </Space>
            </Col>
            <Col
              className="gutter-row"
              span={4}
            >
              <ListNCC
                idchuhang={cookies.get('idchuhang')}
                ismodal
                handleStateNhaCC={handleNhaCC}
              />
              <p style={{ fontSize: '10px', color: 'red' }}>
                (D??ng trong tr?????ng h???p xu???t tr??? h??ng)
              </p>
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
                  label="Ph????ng th???c giao h??ng:"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    className="select-custom"
                    popupClassName="select-custom"
                    // value={inputType}
                    style={{ width: 170 }}
                    onChange={handleInputType}
                  >
                    <Option value="1">Xe t???i</Option>
                    <Option value="2">Xe m??y</Option>
                  </Select>
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
                  label="Ph????ng th???c thanh to??n:"
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
                    <Option value="1">Cash On Delivery</Option>
                    <Option value="2">Bank Transfer</Option>
                  </Select>
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
                <Checkbox className="custom-checkbox">Kh??ng t??nh ph??</Checkbox>
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
                  label="Ch??? h??ng n???i b???:"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    className="select-custom"
                    popupClassName="select-custom"
                    style={{ width: 170 }}
                    onChange={handleInputType}
                  />
                </Form.Item>
              </Space>
              <p style={{ fontSize: '10px', color: 'red' }}>
                (D??ng trong tr?????ng h???p xu???t n???i b???)
              </p>
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
                  label="Kho n???i b???:"
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
                    <Option value="1">An Ph?? ????ng</Option>
                  </Select>
                </Form.Item>
              </Space>
              <p style={{ fontSize: '10px', color: 'red' }}>
                (D??ng trong tr?????ng h???p xu???t n???i b???)
              </p>
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
                  label="Nh??m tr??? ph??:"
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
                    <Option value="1">B??n nh???n tr???</Option>
                    <Option value="2">B??n g???i tr???</Option>
                  </Select>
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
                  label="Lo???i cont"
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
                  label="S??? v???n ????n"
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
                  label="T??n t??u"
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
                  label="Ng??y t??u ch???y"
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
            {/* 5 */}
            <Col
              className="gutter-row"
              span={4}
            >
              <Space
                direction="vertical"
                className="custom-modal-space"
              >
                <Form.Item
                  label="Ng??y t??u ?????n"
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
                  label="T??n c???ng"
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
                  label="C???ng ????ch"
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
                  label="C???ng ?????n"
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
                  label="Air Waybill(AWB)"
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
                  label="????n ??u ti??n"
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
                  label="Order No"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="custom-input" />
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
                  label="Ghi ch??"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="custom-input"
                  />
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Space direction="vertical">
            <TableInsertProductDO
              dataPostCallBack={handleDataPost}
              setfirst
            />
          </Space>
        </Modal>
      </Form>
    </>
  );
};

export default ModalDO;
