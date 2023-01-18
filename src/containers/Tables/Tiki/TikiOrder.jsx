import React, { useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';
import TikiApi from '../../../api/TikiApi';

const TikiOrder = () => {
  // ? state component
  const [link, setLink] = useState('');
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

  useEffect(() => {
    const fetchApiTiki = async () => {
      try {
        const response = await TikiApi.getLink();
        console.log(response);
        setLink(response);
      } catch (error) {
        console.loh(error);
      }
    };
    fetchApiTiki();
  }, []);

  return (
    <Space direction="vertical">
      <Space>
        <Button
          type="primary"
          danger
        >
          <a
            href={`${link}`}
            style={{ color: 'white' }}
          >
            Cấu hình
          </a>
        </Button>
      </Space>
      <Space>
        <Table columns={column} />
      </Space>
    </Space>
  );
};

export default TikiOrder;
