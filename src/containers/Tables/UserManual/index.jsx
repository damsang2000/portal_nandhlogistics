import { Button, Col, Row, Space } from 'antd';
import React from 'react';
import { FcPortraitMode } from 'react-icons/fc';
import logo from '../../../asset/img/login/NHLlogo.png';
import Ecommerce from '../Ecommerce';
const UserManual = () => {
  return (
    <div>
      <p>Hướng dẫn sử dụng</p>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Space className="intro_boarding">
          <Row>
            <Col
              span={13}
              style={{ display: 'flex' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <FcPortraitMode
                    style={{ fontSize: '40px', marginRight: '8px' }}
                  />
                </div>
                <div>
                  <h5
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Chào mừng đến với Nandhlogistics ,{' '}
                    {localStorage.getItem('hoten')}
                  </h5>
                  <p>
                    Hãy hoàn tất các bước dưới đây để bắt đầu quản lý tất cả các
                    cửa hàng của bạn
                  </p>
                </div>
              </div>
            </Col>
            <Col
              span={10}
              style={{ paddingLeft: '10%', display: 'flex' }}
            >
              <img
                src={logo}
                alt=""
              />
            </Col>
          </Row>
        </Space>
        <Space className="connectshop">
          <h5
            style={{
              fontWeight: 'bold',
            }}
          >
            Kết nối kênh bán hàng
          </h5>
          <p>
            Kết nối các kênh bán hàng của bạn trên shopify, woocommerce hoặc các
            sàn TMDT Lazada, Shopee, Tiki... để có thể tự động đồng bộ sản phẩm
            và đơn hàng
          </p>

          <Row
            style={{
              display: 'flex',
              marginTop: '15px',
              width: '100%',
            }}
          >
            <Ecommerce
              nameCommerce="Tiki"
              src="https://storage.googleapis.com/omisell-cloud/logo/platforms/tiki.svg"
            />
            <Ecommerce
              nameCommerce="Sendo"
              src="https://storage.googleapis.com/omisell-cloud/logo/platforms/sendo.svg"
            />
            <Ecommerce
              nameCommerce="Shopify"
              src="https://storage.googleapis.com/omisell-cloud/logo/platforms/shopify.svg"
            />
            <Ecommerce
              nameCommerce="Lazada"
              src="https://storage.googleapis.com/omisell-cloud/logo/platforms/lazada.svg"
            />
          </Row>
        </Space>
        <Space className="transport">
          {/* <div>
              <img src=''
            </div> */}
          <div className="transport_container">
            <div>
              <h5
                style={{
                  fontWeight: 'bold',
                  marginTop: '10px',
                }}
              >
                Kết nối hãng vận chuyển & trung tâm hậu cần kho vận
              </h5>
              <p>
                Bắt đầu liên kết các hãng vận chuyển bạn đang sử dụng hoặc lựa
                chọn một trong những đối tác của chúng tôi để có thể đồng bộ vận
                đơn, in vận đơn, đồng bộ trạng thái một cách tự động.
              </p>
            </div>
            <div>
              <Button
                type="primary"
                danger
                style={{
                  marginTop: '10px',
                }}
              >
                Thiết lập hàng vận chuyển và dịch vụ
              </Button>
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default UserManual;
