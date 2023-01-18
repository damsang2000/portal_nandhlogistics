import { Card, Col } from 'antd';
import React, { useState } from 'react';
import ModalProcessingDo from './Modal/ModalProcessingDo';

const WaitingProcessDo = (props) => {
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

  //* render component
  return (
    <Col span={8}>
      <Card
        onClick={showModal}
        style={{ border: 'none', cursor: 'pointer' }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '15px' }}>Đang xử lý</p>
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
      <ModalProcessingDo
        open={open}
        callBackCanCel={handleCancel}
        datefrom={props.datefrom}
        dateto={props.dateto}
        isrender={props.isrender}
      />
    </Col>
  );
};

export default WaitingProcessDo;
