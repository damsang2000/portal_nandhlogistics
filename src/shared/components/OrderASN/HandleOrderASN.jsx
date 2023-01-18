import React, { useState } from 'react';
import { Col, Card } from 'antd';
import ModalHandleOrderASN from './Modal/ModalHandleOrderASN';

const HandleOrderASN = (props) => {
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
    <>
      <Col span={12}>
        <Card
          onClick={showModal}
          style={{ cursor: 'pointer', border: 'none' }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px' }}>{props.title}</p>
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
        <ModalHandleOrderASN
          open={open}
          callBackCanCel={handleCancel}
          datefrom={props.datefrom}
          dateto={props.dateto}
          isrender={props.isrender}
          arrtrangthai={props.arrtrangthai}
          titleModal={props.titleModal}
          titleModalDetail={props.titleModalDetail}
        />
      </Col>
    </>
  );
};

export default HandleOrderASN;
