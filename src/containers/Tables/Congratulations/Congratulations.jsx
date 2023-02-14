import React from 'react';
import { Button, Result, Space } from 'antd';
const Congratulations = () => {
  return (
    <Space
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Result
        status="success"
        title="Đã xác thực thành công"
        extra={[
          <a
            type="primary"
            key="console"
            href="http://portal.nandhlogistics.vn/nandhlogistics/nh/config_tiki"
            style={{
              backgroundColor: '#52c41a',
              padding: '10px 20px',
              borderRadius: '10px',
              color: 'white',
            }}
          >
            Trở về trang chủ
          </a>,
        ]}
      />
    </Space>
  );
};

export default Congratulations;
