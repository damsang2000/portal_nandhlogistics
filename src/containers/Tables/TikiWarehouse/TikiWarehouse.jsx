/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Select, Space, Table, notification } from 'antd';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import TikiApi from '../../../api/TikiApi';
import KhoApi from '../../../api/KhoAPI';
const TikiWarehouse = () => {
  //state
  const [listKhoNH, setListKhoNH] = useState([]);
  const [listKhoTiki, setListKhoTiki] = useState([]);
  const [updateKhoTiki, setUpdateKhoTiki] = useState([]);
  const [checkIndex1, setCheckIndex1] = useState(0);
  const [checkIndex2, setCheckIndex2] = useState(0);
  const [checkIndex3, setCheckIndex3] = useState(0);
  const [checkIndex4, setCheckIndex4] = useState(0);
  const [checkIndex5, setCheckIndex5] = useState(0);
  const [checkIndex6, setCheckIndex6] = useState(0);
  const [checkIndex7, setCheckIndex7] = useState(0);
  const [checkIndex8, setCheckIndex8] = useState(0);
  // state extension
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const username = localStorage.getItem('ma_dang_nhap');
  //? columns
  const arrSelect = [
    {
      key: 'An Phú Đông',
      label: 'An Phú Đông',
      value: '1123',
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
      dataIndex: 'inventoriesName',
      width: 300,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      width: 100,
      render: (text, record) =>
        record.isActive ? (
          <span className="label label-success">Completed</span>
        ) : (
          ''
        ),
    },
    {
      title: 'Is NHL',
      dataIndex: 'isNh',
      render: (text, record) => (
        <Checkbox
          className="custom-checkbox"
          onChange={() => {
            // eslint-disable-next-line no-eval
            if (Number(eval(`checkIndex${record.index}`)) === 0) {
              const setName = eval(`setCheckIndex${Number(record.index)}`);
              setName(Number(record.index));
              if (listKhoNH.length === 0) {
                fetchListKhoNH();
              }
            } else {
              const setName = eval(`setCheckIndex${Number(record.index)}`);
              setName(0);
            }
          }}
        />
      ),
      width: 80,
    },
    {
      title: 'Kho NHL',
      dataIndex: 'kho',
      render: (select, record) => (
        <Select
          options={listKhoNH}
          disabled={
            // eslint-disable-next-line no-eval
            record.index === eval(`checkIndex${record.index}`) ? false : true
          }
          style={{
            width: '100%',
          }}
          className="custom-checkbox"
          onChange={(value) => {
            if (record.index === listKhoTiki[Number(record.index) - 1].index) {
              listKhoTiki[Number(record.index) - 1].idKho = value;
              listKhoTiki[Number(record.index) - 1].isNhl = true;
              setUpdateKhoTiki(listKhoTiki);
            }
          }}
        />
      ),
      width: 200,
    },
  ];

  //? handle update kho tiki
  const handleUpdate = async () => {
    if (!updateKhoTiki.length === 0) {
      const res = await TikiApi.updateKhoTiki(updateKhoTiki);
      if (Number(res.errorCode) === 200) {
        openNotificationWithIcon('success', res.errorMess);
      }
    } else {
      openNotificationWithIcon('error', 'Chọn kho để lưu');
    }
  };

  //? function handle notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, des) => {
    api[type]({
      message: message,
      description: des,
      duration: 1,
    });
  };
  //? call api lúc đầu
  const fetchListKho = async () => {
    const response = await TikiApi.getListKho(cookies.get('idchuhang'));
    if (response.result) {
      const mapDataTiki = response.result.map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      });
      setListKhoTiki(mapDataTiki);
    }
  };
  //? call api đồng bộ
  const asyncListKho = async () => {
    const response = await TikiApi.getAsyncListKho(cookies.get('idchuhang'));
    if (response.result) {
      const mapDataTiki = response.result.map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      });
      setListKhoTiki(mapDataTiki);
    }
  };

  //? get list kho
  const fetchListKhoNH = async () => {
    const response = await KhoApi.getListKhoByUser(username);
    if (response.length !== 0) {
      const mapListKho = response.map((item) => {
        return {
          label: item.tenKho,
          value: item.khoId,
        };
      });
      setListKhoNH(mapListKho);
    }
  };

  useEffect(() => {
    fetchListKho();
    return () => {
      setListKhoTiki([]);
      setCheckIndex1(0);
      setCheckIndex2(0);
      setCheckIndex3(0);
      setCheckIndex4(0);
      setCheckIndex5(0);
      setCheckIndex5(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchuhang.idchuhang, idKho.idKho]);

  return (
    <>
      {contextHolder}
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
            onClick={asyncListKho}
          >
            Đồng bộ
          </Button>
          <Button
            type="primary"
            danger
            style={{
              width: '100%',
            }}
            onClick={handleUpdate}
          >
            Lưu
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default TikiWarehouse;
