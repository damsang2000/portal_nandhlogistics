/* eslint-disable object-curly-newline */

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
import React, {
  useState,
} from 'react';
import {
  Col,
  Card,
  Typography,
} from 'antd';
import styled from 'styled-components';
import ModalSellingProduct from './Modal/ModalSellingProduct';
import { CustomCard } from '../../CustomCard';
// import ModalCompleteOrderASN from './Modal/ModalCompleteOrderASN';

const SellingProduct = (props) => {
// ? state extension
const { Title } = Typography;

// ? state component
const [open, setOpen] = useState(false);


// ? handle open
const showModal = () => {
  if (props.data.length !== 0) {
      setOpen(true);
  }
};
const handleCancel = () => {
  setOpen(false);
};
return (
  <Col span={24}>
    <CustomCard onClick={showModal}>
    <p style={{ fontSize: '50px', textAlign: 'center', color: 'black', fontWeight: 'bold' }}>{props.data.length}</p>
      <p>Sản phẩm bán chạy</p>
    </CustomCard>
    <ModalSellingProduct open={open} callBackCanCel={handleCancel} data={props.data} />
  </Col>
);
};

export default SellingProduct;




