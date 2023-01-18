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

//? import component
import HandleOrderASN from './HandleOrderASN';
import CompleteOrderASN from './CompleteOrderASN';
import ThongKeApi from '../../../api/ThongKeApi';

const index = (props) => {
  // ? state extension
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);
  const { Title } = Typography;

  // ? state component
  const [Count, setCount] = useState(0);
  const [HandleCount, setHandleCount] = useState(0);
  const [CompleteCount, setCompleteCount] = useState(0);

  // * CALL API=============================================================
  useEffect(() => {
    if (cookies.get('idchuhang')) {
      const fetchThongKeNhapProduct = async () => {
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
            xem_Type_ID: 1,
          };
          const response = await ThongKeApi.getAllThongKeNhap(data);
          if (response) {
            setCount(response.total);
            setHandleCount(response.new);
            const countcomplete =
              response.received + response.putaway + response.complete;
            setCompleteCount(countcomplete);
          } else {
            setCount(0);
            setHandleCount(0);
            setCompleteCount(0);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchThongKeNhapProduct();
    }
    return () => {
      setCount(0);
      setHandleCount(0);
      setCompleteCount(0);
    };
  }, [idchuhang.idchuhang, props.isrender]);

  //* RENDER COMPONENT===================================================
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
          Đơn hàng mới nhập kho <span className="badge_custom">{Count}</span>
        </Title>
      </div>

      <Card
        style={{
          backgroundColor: 'white',
          border: '1px solid #bdc3c7',
          borderTop: '3px solid #ff9f43',
          borderRadius: '5px',
        }}
      >
        <Row gutter={16}>
          <HandleOrderASN
            count={HandleCount}
            datefrom={props.datefrom}
            dateto={props.dateto}
            isrender={props.isrender}
            arrtrangthai={[4]}
            title="Đang xử lý"
            titleModal="Đơn hàng chờ xử lý"
            titleModalDetail="Chi tiết đơn hàng chờ xử lý"
          />
          <HandleOrderASN
            count={CompleteCount}
            datefrom={props.datefrom}
            dateto={props.dateto}
            isrender={props.isrender}
            arrtrangthai={[1, 2, 3]}
            title="Đã hoàn thành"
            titleModal="Đơn hàng đã hoàn thành"
            titleModalDetail="Chi tiết đơn hàng đã hoàn thành"
          />
          {/* <CompleteOrderASN
            count={CompleteCount}
            dateto={props.dateto}
            datefrom={props.datefrom}
            isrender={props.isrender}
          /> */}
        </Row>
      </Card>
    </Col>
  );
};

export default index;
