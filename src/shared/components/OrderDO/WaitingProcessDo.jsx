import { Card, Col } from 'antd';
import React, { useState } from 'react';
import ModalWaitingProcessDo from './Modal/ModalWaitingProcessDo';

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

  return (
    <Col span={8}>
      <Card
        onClick={showModal}
        style={{ border: 'none', cursor: 'pointer' }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '15px' }}>{props.title}</p>
          <p
            style={
              // props.count !== 0
              //   ? {
              //       fontSize: '30px',
              //       textAlign: 'center',
              //       color: 'black',
              //       fontWeight: '600',
              //       textDecoration: 'underline',
              //     }
              {
                fontSize: '30px',
                textAlign: 'center',
                color: 'black',
                fontWeight: '600',
              }
            }
          >
            {props.count}
          </p>
        </div>
      </Card>
      <ModalWaitingProcessDo
        open={open}
        callBackCanCel={handleCancel}
        datefrom={props.datefrom}
        dateto={props.dateto}
        isrender={props.isrender}
        arrtrangthai={props.arrtrangthai}
        title={props.titleModal}
        titleDetail={props.titleModalDetail}
      />
    </Col>
  );
};

export default WaitingProcessDo;
