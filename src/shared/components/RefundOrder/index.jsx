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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Card, Typography, Col } from 'antd';
import Cookies from 'universal-cookie';
import { formatDateTime } from '../../helpers';
import HandleRefundOrder from './HandleRefundOrder';
import CompleteRefundOrder from './CompleteRefundOrder';
import ThongKeApi from '../../../api/ThongKeApi';

const index = (props) => {
  // ? state extension
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);
  const { Title } = Typography;

  // ? state component
  const [Count, setCount] = useState(0);
  const [HandleRefundOrderCount, setHandleRefundOrderCount] = useState(0);
  const [CompleteRefundOrderCount, setCompleteRefundOrderCount] = useState(0);

  //* CALL API=========================================================
  useEffect(() => {
    const fetchThongKeHoanProduct = async () => {
      try {
        const data = {
          date_From: localStorage.getItem('datefromimportDashboard')
            ? formatDateTime(localStorage.getItem('datefromimportDashboard'))
            : props.datefrom,
          date_To: localStorage.getItem('datetoimportDashboard')
            ? formatDateTime(localStorage.getItem('datetoimportDashboard'))
            : props.dateto,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
          xem_Type_ID: 2,
        };
        const response = await ThongKeApi.getAllThongKeNhap(data);
        if (response) {
          setCount(response.total);
          setHandleRefundOrderCount(response.new);
          const countcomplete =
            response.received + response.putaway + response.complete;
          setCompleteRefundOrderCount(countcomplete);
        } else {
          setCount(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchThongKeHoanProduct();
    return () => {
      setCount(0);
      setHandleRefundOrderCount(0);
      setCompleteRefundOrderCount(0);
    };
  }, [idchuhang.idchuhang, props.isrender]);

  //* RENDER COMPONENT=================================================
  return (
    <Col
      span={7}
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
          Đơn hàng hoàn từ nhà vận chuyển{' '}
          <span className="badge_custom">{Count}</span>
        </Title>
      </div>

      <Card
        style={{
          backgroundColor: 'white',
          border: '1px solid #bdc3c7',
          borderTop: '3px solid #2e86de',
          marginBottom: '10px',
          borderRadius: '5px',
        }}
      >
        <Row gutter={16}>
          <HandleRefundOrder
            count={HandleRefundOrderCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto}
            arrTrangThai={[4]}
            title="Chờ xử lý"
            titleModal="Đơn hàng chờ xử lý"
            titleModalDetail="Chi tiết đơn hàng chờ xử lý"
          />
          <HandleRefundOrder
            count={CompleteRefundOrderCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto}
            arrTrangThai={[1, 3, 2]}
            title="Đã xử lý"
            titleModal="Đơn hàng đã xử lý"
            titleModalDetail="Chi tiết đơn hàng đã xử lý"
          />
          {/* <CompleteRefundOrder
            count={CompleteRefundOrderCount}
            isrender={props.isrender}
            datefrom={props.datefrom}
            dateto={props.dateto}
          /> */}
        </Row>
      </Card>
    </Col>
  );
};

export default index;
