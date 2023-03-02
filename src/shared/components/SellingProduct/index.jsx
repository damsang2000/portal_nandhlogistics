/* eslint-disable camelcase */
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
import { Card, Col, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import ThongKeApi from '../../../api/ThongKeApi';
import { formatDateTime } from '../../helpers';
import ContenNoData from '../ContenNoData';

const index = (props) => {
  // ? state extension
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const { Title } = Typography;

  // ? state component
  const [Count, setCount] = useState(0);
  const [sellingProduct, setSellingProduct] = useState([]);

  //* Columns Table
  const columns = [
    {
      title: 'Mã Sản Phẩm',
      dataIndex: 'ma_San_Pham',
      width: 60,
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'ten_San_Pham',
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (ten_San_Pham) => (
        <Tooltip
          placement="topLeft"
          title={ten_San_Pham}
        >
          {ten_San_Pham}
        </Tooltip>
      ),
    },
    {
      title: 'SL tổng bán ra',
      dataIndex: 'tong',
      width: 70,
    },
  ];

  //* CALL API
  useEffect(() => {
    const fetchTopProduct = async () => {
      try {
        const data = {
          date_From: localStorage.getItem('datefromimportDashboard')
            ? formatDateTime(localStorage.getItem('datefromimportDashboard'))
            : props.datefrom,
          date_To: localStorage.getItem('datetoimportDashboard')
            ? formatDateTime(localStorage.getItem('datetoimportDashboard'))
            : props.dateto,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: Number(localStorage.getItem('kho_id')),
          limit: 5,
          isASC: false,
        };
        const response = await ThongKeApi.getAllThongKeTopSanPham(data);
        if (response.data) {
          setCount(response.data.length);
          setSellingProduct(response.data);
        } else {
          setCount(0);
          setSellingProduct([]);
        }
      } catch (error) {
        // console.log('fail to fetch list item', error);
        // dispatch(Changeloading({ loading: false }));
      }
    };
    fetchTopProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchuhang.idchuhang, idKho.idKho, props.isrender]);

  //* RENDER COMPONENT
  return (
    <Col
      span={13}
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
          Sản phẩm bán chạy <span className="badge_custom">{Count}</span>
        </Title>
      </div>

      <Card
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #bdc3c7',
          borderTop: '3px solid #341f97',
          marginBottom: '10px',
          borderRadius: '5px',
        }}
      >
        <Table
          columns={columns}
          className="table_custom_border"
          bordered
          style={{ borderRadius: '20px' }}
          dataSource={sellingProduct}
          pagination={false}
          locale={{
            emptyText: <ContenNoData desc="Không có dữ liệu" />,
          }}
        />
      </Card>
    </Col>
  );
};

export default index;
