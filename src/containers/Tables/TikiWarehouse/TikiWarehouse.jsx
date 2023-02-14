import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Select, Space, Table } from 'antd';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import TikiApi from '../../../api/TikiApi';
const TikiWarehouse = () => {
  //state
  const [listKhoTiki, setListKhoTiki] = useState([]);
  // state extension
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);
  // columns
  const arrSelect = [
    {
      key: 'Nh',
      value: 'nh',
    },
  ];
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 10,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 100,
      render: (text, record) =>
        record.status === 1 ? (
          <span className="label label-success">Completed</span>
        ) : (
          ''
        ),
    },
    {
      title: 'Is NHL',
      render: (text, record) => <Checkbox className="custom-checkbox" />,
      width: 80,
    },
    {
      title: 'Kho NHL',
      dataIndex: 'kho',
      render: (select, record) => (
        <Select
          options={arrSelect}
          style={{
            width: '100%',
          }}
          className="custom-checkbox"
        />
      ),
      width: 200,
    },
  ];

  const fetchListKho = async () => {
    const resonse = await TikiApi.getListKho(cookies.get('idchuhang'));
    const mapDataTiki = resonse.seller_inventories.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });
    setListKhoTiki(mapDataTiki);
  };
  useEffect(() => {
    fetchListKho();
    return () => {
      setListKhoTiki([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchuhang.idchuhang]);

  return (
    <Space>
      <Table
        columns={columns}
        dataSource={listKhoTiki}
        pagination={null}
      />
      <Space direction="vertical">
        <Button
          type="primary"
          danger
        >
          Đồng bộ
        </Button>
        <Button
          type="primary"
          danger
        >
          Làm mới
        </Button>
      </Space>
    </Space>
  );
};

export default TikiWarehouse;
