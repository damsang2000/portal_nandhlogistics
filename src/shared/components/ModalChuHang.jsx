import React, { useState, useEffect } from 'react';
import { Modal, Space, Typography, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { changeDataChuHang } from '../../redux/actions/ChuHangAction';
import ListItemApi from '../../api/ListItemApi';

// eslint-disable-next-line react/prop-types
const ModalChuHang = ({ openModal, ismodal }) => {
  // ? state redux
  const dispatch = useDispatch();

  // ? state normal
  const cookies = new Cookies();

  // ? state extension
  const { Title } = Typography;
  const { Option } = Select;

  // ? state component
  const [open, setopen] = useState(openModal);
  const [filterChuHang, setFilterChuHang] = useState([]);

  // ? handle function
  const handleCancel = () => {
    setopen(false);
  };
  const handleChange = async (value, key) => {
    localStorage.setItem('checkcontain', '1');
    dispatch(changeDataChuHang({ idchuhang: value }));
    cookies.set('idchuhang', value, { path: '/' });
    localStorage.setItem('idchuhang', value);
    localStorage.setItem('owner_code', key.key);
    cookies.set('owner_code', key.key, { path: '/' });
    handleCancel();
  };

  // ? data of api
  const data = {
    maDangNhap: cookies.get('ma_dang_nhap'),
  };

  // ? hook api
  useEffect(() => {
    const fetchListItem = async () => {
      try {
        const data = {
          maDangNhap: cookies.get('ma_dang_nhap')
            ? cookies.get('ma_dang_nhap')
            : localStorage.getItem('ma_dang_nhap'),
        };
        const response = await ListItemApi.getChuHangUser(data);
        const mapDataChuHang = response.result.map((item) => ({
          label: `${item.tenVietTat} - ${item.tenChuHang}`,
          value: item.chuHangId,
          key: item.tenVietTat,
        }));
        setFilterChuHang(mapDataChuHang);
      } catch (error) {
        console.log('fail to fetch list item', error);
      }
    };
    fetchListItem();
    return () => {
      setFilterChuHang([]);
    };
  }, []);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      width={500}
      maskClosable={false}
      className="modal_choose_chuhang"
    >
      <Space
        direction="vertical"
        style={{ width: '100%' }}
      >
        <Title level={4}>Vui lòng chọn chủ hàng</Title>
        <Space
          style={{ width: '100%' }}
          className="custom-space-choose"
        >
          <Select
            showSearch
            popupClassName="select-custom"
            className="select-custom"
            placeholder="Chọn Chủ Hàng"
            defaultActiveFirstOption
            style={{
              width: '100%',
              marginRight: '10px',
            }}
            onChange={handleChange}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={filterChuHang}
          />
        </Space>
      </Space>
    </Modal>
  );
};

export default ModalChuHang;
