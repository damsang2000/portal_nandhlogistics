import React, { useState } from 'react';
import { Col, Card } from 'antd';
import ModalCompleteOrderASN from './Modal/ModalCompleteOrderASN';

const CompleteOrderASN = (props) => {
  // ? state component
  const [open, setOpen] = useState(false);

  // ? handle open
  const showModal = () => {
    if (props.count !== 0) {
      setOpen(true);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Col span={12}>
      <Card
        onClick={showModal}
        style={{ border: 'none', cursor: 'pointer' }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '15px' }}>Đã hoàn thành</p>
          <p
            style={{
              fontSize: '30px',
              textAlign: 'center',
              color: 'black',
              fontWeight: '600',
            }}
          >
            {props.count}
          </p>
        </div>
      </Card>
      <ModalCompleteOrderASN
        open={open}
        callBackCanCel={handleCancel}
        datefrom={props.datefrom}
        dateto={props.dateto}
        isrender={props.isrender}
      />
    </Col>
  );
};

export default CompleteOrderASN;
