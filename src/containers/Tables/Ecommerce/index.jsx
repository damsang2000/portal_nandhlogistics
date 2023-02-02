import React from 'react';
import { Col } from 'antd';

const Ecommerce = ({ src, nameCommerce }) => {
  return (
    <Col
      span={2}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      className="col_ecommerce"
    >
      <img
        src={src}
        alt=""
        style={{
          width: '4rem',
        }}
      />
      <a
        href="@"
        style={{
          fontWeight: 'normal',
          color: '#ff4861',
        }}
      >
        {nameCommerce}
      </a>
    </Col>
  );
};

export default Ecommerce;
