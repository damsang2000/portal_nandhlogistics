import { Card, Col } from 'antd';
import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import ModalTotalOperatingCost from './Modal/ModalTotalOperatingCost';

const ShareCost = (props) => {
  // ? state component
  const [open, setOpen] = useState(false);

  // ? handle open
  const showModal = () => {
    if (props.total !== 0) {
      setOpen(true);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Col span={6}>
        <Card
          onClick={showModal}
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <p style={{ fontSize: '30px', textAlign: 'center', color: 'black' }}>
            <CurrencyFormat
              value={Number(props.total ? props.total.toFixed(0) : 0)}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <span>{value}</span>}
            />
          </p>
          <p
            style={
              props.total && props.total !== 0
                ? {
                    textAlign: 'center',
                    textDecoration: 'underline',
                  }
                : {
                    textAlign: 'center',
                  }
            }
          >
            {props.title}
          </p>
        </Card>
      </Col>
      <ModalTotalOperatingCost
        data={props.data}
        open={open}
        callBackCancel={handleCancel}
        title={`Chi tiết ${props.title.toLowerCase()}`}
      />
    </>
  );
};

export default ShareCost;
