/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
import { Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { formatDateTime } from '../../helpers';

import ThongKeApi from '../../../api/ThongKeApi';
import AccomplishedDo from './AccomplishedDo';
import ProcessingDo from './ProcessingDo';
import WaitingProcessDo from './WaitingProcessDo';

const index = (props) => {
  // ? state extension
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);
  const { Title } = Typography;

  // ? state component
  const [Count, setCount] = useState(0);
  const [WaitingProcessCount, setwaitingProcessCount] = useState(0);
  const [ProcessingCount, setProcessingCount] = useState(0);
  const [AccomplishedCount, setAccomplishedCount] = useState(0);

  //* Call API
  useEffect(() => {
    const fetchThongKeXuatProduct = async () => {
      try {
        const data = {
          date_From: localStorage.getItem('datefromimportDashboard')
            ? formatDateTime(localStorage.getItem('datefromimportDashboard'))
            : props.datefrom,
          date_To: localStorage.getItem('datetoimportDashboard')
            ? formatDateTime(localStorage.getItem('datetoimportDashboard'))
            : props.dateto,
          chu_Hang_ID:
            cookies.get('idchuhang') || localStorage.getItem('idchuhang'),
          kho_ID: 2631604,
        };
        const response = await ThongKeApi.getAllThongKeXuat(data);
        if (response) {
          setCount(response.total);
          setwaitingProcessCount(response.new);
          const countprocessing =
            response.allocated +
            response.picked +
            response.packing +
            response.sorted +
            response.packed +
            response.cancel;
          setProcessingCount(countprocessing);
          setAccomplishedCount(response.shipped);
        } else {
          setCount(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchThongKeXuatProduct();
    return () => {
      setCount(0);
      setwaitingProcessCount(0);
      setProcessingCount(0);
      setAccomplishedCount(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchuhang.idchuhang, props.isrender]);
  //* render component
  return (
    <Col
      span={10}
      className="custom-col1"
    >
      <div style={{ width: '100%' }}>
        <Title
          level={5}
          style={{
            padding: '2px 5px',
            color: 'black',
            fontWeight: 'normal',
            marginBottom: '0px',
          }}
        >
          Tổng đơn hàng bán <span className="badge_custom">{Count}</span>
        </Title>
      </div>

      <Card
        style={{
          backgroundColor: 'white',
          border: '1px solid #bdc3c7',
          borderTop: '3px solid #10ac84',
          marginBottom: '10px',
          borderRadius: '5px',
        }}
      >
        <Row gutter={16}>
          <WaitingProcessDo
            count={WaitingProcessCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto}
            arrtrangthai={[1]}
            title="Chờ xử lý"
            titleModalDetail="Chi tiết đơn hàng chờ xử lý"
            titleModal="Đơn hàng chờ xử lý"
          />
          <WaitingProcessDo
            count={ProcessingCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto}
            arrtrangthai={[2, 3, 8]}
            title="Đang xử lý"
            titleModalDetail="Chi tiết đơn hàng đang xử lý"
            titleModal="Đơn hàng đang xử lý"
          />
          <WaitingProcessDo
            count={AccomplishedCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto}
            arrtrangthai={[4]}
            title="Đã hoàn thành"
            titleModalDetail="Chi tiết đơn hàng đã hoàn thành"
            titleModal="Đơn hàng đã hoàn thành"
          />
          {/* <ProcessingDo
            count={ProcessingCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto}
          />
          <AccomplishedDo
            count={AccomplishedCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto} */}
          {/* /> */}
        </Row>
      </Card>
    </Col>
  );
};

export default index;
