/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { Space, Typography, Select, Checkbox, Row, Col, Form } from 'antd';
import Cookies from 'universal-cookie';
import ListSieuThiApi from '../../api/ListSieuThiApi';

const ListSieuThi = ({ idchuhang, handleStateMaSieuThi, modalcustom }) => {
  // ? state extension
  const { Title } = Typography;
  const { Option } = Select;
  const cookies = new Cookies();

  // ? state component
  const [InputType, setInputType] = useState(null);
  const [ListSieuThi, setListSieuThi] = useState([]);

  // ? handle change function
  const handleChangeInputType = (value) => {
    localStorage.setItem('masieuthi', value);
  };

  // ? hook redux

  useEffect(() => {
    if (cookies.get('idchuhang')) {
      const fetchListSieuThi = async () => {
        try {
          const data = {
            page: 0,
            pageCount: 0,
            chu_Hang_ID: idchuhang,
            is_Closed: true,
          };
          const response = await ListSieuThiApi.getAll(data);
          if (response.result) {
            const mapDataSieuThi = response.result.map((item) => ({
              value: item.ma_Sieu_Thi,
              label: item.ten_Sieu_Thi_Full,
            }));
            setListSieuThi(mapDataSieuThi);
          }
        } catch (error) {
          console.log('fail to fetch list sieu thi', error);
        }
      };
      fetchListSieuThi();
    }
  }, [idchuhang]);

  return (
    <>
      {modalcustom ? (
        <Space
          direction="vertical"
          className="custom-modal-space"
        >
          <Form.Item
            label="Nơi xuất đến"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              showSearch
              placeholder="Chọn nơi xuất đến"
              optionFilterProp="children"
              className="select-custom"
              popupClassName="select-custom"
              style={{ width: 200 }}
              onChange={(value) => handleStateMaSieuThi(value)}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={ListSieuThi}
            />
          </Form.Item>
        </Space>
      ) : (
        <Row
          gutter={12}
          className="custom-row"
        >
          <Col
            className="gutter-row custom-col"
            span={8}
          >
            <Space
              direction="vertical"
              className="custom-modal-space"
            >
              <Form.Item
                label="Nơi xuất đến"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  showSearch
                  placeholder="Chọn nơi xuất đến"
                  optionFilterProp="children"
                  className="select-custom"
                  popupClassName="select-custom"
                  style={{ width: 200 }}
                  onChange={(value) => handleStateMaSieuThi(value)}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={ListSieuThi}
                />
              </Form.Item>
            </Space>
          </Col>
          <Col
            className="gutter-row custom-col"
            span={8}
          >
            <Space direction="vertical">
              <div style={{ height: '35px' }} />
              <Checkbox className="custom-checkbox">Không tính phí</Checkbox>
            </Space>
          </Col>
          <Col
            className="gutter-row custom-col"
            span={8}
          >
            <Space direction="vertical">
              <div style={{ height: '35px' }} />
              <Checkbox className="custom-checkbox">Có QC</Checkbox>
            </Space>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ListSieuThi;
