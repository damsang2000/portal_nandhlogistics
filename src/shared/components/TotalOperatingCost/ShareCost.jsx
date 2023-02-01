import { Card, Col, Tabs } from 'antd';
import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import ModalTotalOperatingCost from './Modal/ModalTotalOperatingCost';

const ShareCost = (props) => {
  // ? state component
  const [open, setOpen] = useState(false);

  // ? handle open
  const showModal = () => {
    if (props.data.length !== 0) {
      setOpen(true);
    }
  };
  const handleCancel = (props) => {
    setOpen(false);
  };

  // const items = [
  //   {
  //     label: 'Nhập Kho',
  //     key: 1,
  //     children: (
  //       <ImportToday
  //         ref={childRef}
  //         ImportExportToday={DateImportExport}
  //       />
  //     ),
  //   },
  //   {
  //     label: 'Xuất Kho',
  //     key: 2,
  //     children: (
  //       <ExportToday
  //         ref={childRef}
  //         ImportExportToday={DateImportExport}
  //       />
  //     ),
  //   },
  // ];
  return (
    <>
      <Col span={8}>
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
        dataPack={props.dataHanlePack ? props.dataHanlePack : null}
        dataDC={props.dataHanleDC ? props.dataHanleDC : null}
        totalHanle={props.totalHanle ? props.totalHanle : null}
        totalPack={props.totalPack ? props.totalPack : null}
        totalDC={props.totalDC ? props.totalDC : null}
        open={open}
        isTab={props.isTab}
        callBackCancel={handleCancel}
        title={`Chi tiết ${props.title.toLowerCase()}`}
      />
    </>
  );
};

export default ShareCost;
