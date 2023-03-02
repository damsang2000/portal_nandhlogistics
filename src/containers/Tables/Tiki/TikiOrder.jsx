import React, { useEffect, useState } from 'react';
import { Button, Space, Typography, Row, Col } from 'antd';
import TikiApi from '../../../api/TikiApi';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import noImage from '../../../asset/img/login/no_image.jpg';
import { formatDateTimemmddyyyy1 } from '../../../shared/helpers';
import TikiWarehouse from '../TikiWarehouse/TikiWarehouse';

const TikiOrder = () => {
  // ? state component
  const [link, setLink] = useState('');
  const [infoStore, setInfoStore] = useState({});
  // ? column
  const column = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'code',
    },
    {
      title: 'Mã Sản Phẩm',
      dataIndex: 'sku',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
  ];
  // ?
  const { Title } = Typography;

  //
  const cookies = new Cookies();

  //
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);

  const fetchTikiOrder = async () => {
    const data = {
      idChuHang: 17151506,
      created_from_date: '2022-01-01',
      created_to_date: '2022-12-31',
      updated_from_date: null,
      updated_to_date: null,
      status: 'getall',
    };
    const response = await TikiApi.getOrder(data);
    console.log(response);
  };

  useEffect(() => {
    const fetchApiTiki = async () => {
      const idchuhang = cookies.get('idchuhang');
      try {
        const response = await TikiApi.getLink(idchuhang);
        const responseInfo = await TikiApi.getStoreTikiInfo(idchuhang);
        setLink(response);
        setInfoStore(responseInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiTiki();
  }, [idchuhang.idchuhang, idKho.idKho]);

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Space direction="vertical">
          <Title level={5}>Gửi yêu cầu kết nối tiki(tài khoản admin)</Title>
          <Space>
            <Button
              type="primary"
              danger
            >
              <a
                href={`${link}`}
                style={{ color: 'white' }}
              >
                Xác nhận
              </a>
            </Button>
          </Space>
        </Space>
        <Space
          style={{
            width: '60%',
            marginTop: '10px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
          }}
          direction="vertical"
        >
          <h4
            style={{
              fontWeight: 'bold',
            }}
          >
            Thông tin Seller
          </h4>
          <img
            src={`${infoStore.logo ? infoStore.logo : noImage}`}
            alt="logo"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              border: '1px solid #dfe6e9',
            }}
          />
          <Row
            style={{
              marginTop: '10px',
            }}
          >
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <h5>ID Shop</h5>
            </Col>
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <p>{infoStore.id || null}</p>
            </Col>
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <h5>Tên Seller</h5>
            </Col>
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <p>{infoStore.name || null}</p>
            </Col>
          </Row>
          <Row>
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <h5>Trạng thái</h5>
            </Col>
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <p>
                {infoStore.registration_status ? (
                  <span className="label label-success">
                    {infoStore.registration_status}
                  </span>
                ) : null}
              </p>
            </Col>
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <h5>Ngày hoạt động</h5>
            </Col>
            <Col
              span={5}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <p>
                {infoStore.live_at
                  ? formatDateTimemmddyyyy1(infoStore.live_at.slice(0, 10))
                  : null}
              </p>
            </Col>
          </Row>
        </Space>
        <Space
          direction="vertical"
          style={{
            width: '100%',
            marginTop: '10px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
          }}
        >
          <h4
            style={{
              fontWeight: 'bold',
            }}
          >
            Danh sách kho seller
          </h4>
          <TikiWarehouse />
        </Space>
      </Space>
    </>
  );
};

export default TikiOrder;
