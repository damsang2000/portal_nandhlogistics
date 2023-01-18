import { Button, DatePicker, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AiOutlineFilter } from 'react-icons/ai';
import { Redirect } from 'react-router';

// ? import component
import OrderASN from '../../../shared/components/OrderASN';
import OrderDo from '../../../shared/components/OrderDO';
import RefundOrder from '../../../shared/components/RefundOrder';
import SellingProduct from '../../../shared/components/SellingProduct';
import TotalOperatingCost from '../../../shared/components/TotalOperatingCost';
import { formatDateTime } from '../../../shared/helpers';
import LineSeries from '../../Charts/ChartJs/LineSeries';

const OnLineMarketingDashboard = () => {
  // ? state extension
  const { Title } = Typography;
  const { RangePicker } = DatePicker;

  // ? state componment
  //! state date format 7 date
  const d = new Date();
  const today = moment(d).subtract(7, 'day');
  const todayformat = today.format('DD/MM/YYYY');
  const todayformat7day = formatDateTime(todayformat);
  //! state date format and datetime
  const dateFormat = 'DD/MM/YYYY';
  const date = moment().format('DD/MM/YYYY');
  const dateFormat1 = moment().format('YYYY-MM-DD');
  const [DateFrom, setDateFrom] = useState(todayformat7day);
  const [DateTo, setDateTo] = useState(dateFormat1);
  //! state render datetime
  const [IsRender, setIsRender] = useState(false);

  // ? function handle event
  //! function handle while click search
  const handleClick = () => {
    setIsRender(!IsRender);
  };
  //! function handle onchangeValue datetime
  const onChangeValue = (value, dateString) => {
    localStorage.setItem('datefromimportDashboard', dateString[0]);
    localStorage.setItem('datetoimportDashboard', dateString[1]);
    setDateFrom(dateString[0]);
    setDateTo(dateString[1]);
  };

  // * Hook
  useEffect(() => {
    setIsRender(!IsRender);
    if (!localStorage.getItem('datefromimportDashboard')) {
      setDateFrom(DateFrom);
      setDateTo(dateFormat1);
    }
  }, []);

  return localStorage.getItem('accessToken') ? (
    <Container>
      <Space direction="vertical">
        <Space
          direction="horizontal"
          style={{ marginBottom: '10px' }}
          className="custom_layout"
        >
          <Space>
            <Title level={5}>Ngày</Title>
          </Space>
          <Space>
            <RangePicker
              className="createDateRangePicker"
              popupClassName="createDateRangePicker"
              defaultValue={
                localStorage.getItem('datefromimportDashboard')
                  ? [
                      dayjs(
                        localStorage.getItem('datefromimportDashboard'),
                        dateFormat
                      ),
                      dayjs(
                        localStorage.getItem('datetoimportDashboard'),
                        dateFormat
                      ),
                    ]
                  : [dayjs(todayformat, dateFormat), dayjs(date, dateFormat)]
              }
              format={dateFormat}
              onChange={onChangeValue}
            />
            <Button
              onClick={handleClick}
              danger
              icon={<AiOutlineFilter />}
            />
          </Space>
        </Space>
      </Space>
      <Row
        gutter={16}
        style={{ marginTop: '10px' }}
      >
        <OrderDo
          datefrom={DateFrom}
          dateto={DateTo}
          isrender={IsRender}
        />
        <OrderASN
          datefrom={DateFrom}
          dateto={DateTo}
          isrender={IsRender}
        />
        <RefundOrder
          datefrom={DateFrom}
          dateto={DateTo}
          isrender={IsRender}
        />
      </Row>
      <Row
        gutter={16}
        style={{ marginTop: '10px' }}
      >
        <SellingProduct
          datefrom={DateFrom}
          dateto={DateTo}
          isrender={IsRender}
        />
        <LineSeries />
      </Row>
      <TotalOperatingCost />
    </Container>
  ) : (
    <Redirect to="/" />
  );
};

export default OnLineMarketingDashboard;
