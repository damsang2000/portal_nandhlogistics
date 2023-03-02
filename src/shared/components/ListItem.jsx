import React, { useState, useEffect, useMemo } from 'react';
import { Space, Typography, Select, Form } from 'antd';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { Changeloading } from '../../redux/actions/loadingAction';
import ListItemApi from '../../api/ListItemApi';
import { CustomTitleAndColor } from './CustomTitle';
const ListItem = (props) => {
  const { Title } = Typography;
  const [MaHang, setMaHang] = useState(props.ismodal ? null : null);
  const [ListHang, setListHang] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const onChangeDataMaHang = (value, key) => {
    const data = {
      maHang: value,
      title: key.key,
    };
    if (props.ismodal) {
      props.parentCallBack(data);
    }

    setMaHang(value);
    if (!props.ismodal) {
      props.handleMaHang(value);
    }
    localStorage.setItem('mahang', value);
    localStorage.setItem('mahanglabel', key.key);
  };

  useEffect(() => {
    if (cookies.get('idchuhang')) {
      const fetchListItem = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: 0,
            pageCount: 0,
            chu_Hang_ID:
              idchuhang.idchuhang || localStorage.getItem('idchuhang'),
            is_Closed: false,
            ten_San_Pham: null,
            ma_San_Pham: null,
          };
          const response = await ListItemApi.getAll(data);
          const mapListHang = response.result.map((item) => ({
            value: props.ismodal ? item.ma_San_Pham : item.auto_ID,
            label: props.ismodal
              ? `${item.ma_San_Pham}_${item.ten_San_Pham}`
              : item.ma_San_Pham,
            key: `${item.ma_San_Pham}_${item.ten_San_Pham}`,
          }));
          if (!props.modal) {
            const all = {
              label: 'Tất Cả',
              value: -5,
            };
            mapListHang.unshift(all);
          }
          setListHang(mapListHang);
          setMaHang(null);
        } catch (error) {
          dispatch(Changeloading({ loading: false }));
        }
      };
      fetchListItem();
    }
  }, [idchuhang.idchuhang, idKho.idKho]);

  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
    >
      {!props.ismodal ? (
        <CustomTitleAndColor level={5}>Mã Hàng</CustomTitleAndColor>
      ) : null}
      {!props.ismodal ? (
        <Space
          direction="horizontal"
          className="custom-modal-space"
          style={{ marginBottom: props.ismodal ? '0px' : ' 10px' }}
        >
          <Select
            showSearch
            placeholder="Tìm mã hàng"
            className="select-custom-modal"
            optionFilterProp="children"
            popupClassName="select-custom-modal"
            value={MaHang}
            onChange={onChangeDataMaHang}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: props.ismodal ? '100%' : 200 }}
            options={ListHang}
          />
        </Space>
      ) : (
        <Space
          direction="horizontal"
          className="custom-modal-space"
          style={{ marginBottom: props.ismodal ? '0px' : ' 10px' }}
        >
          <Form.Item
            label="Mã Hàng"
            name="mahang"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn mã hàng',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Tìm mã hàng"
              className="select-custom-modal"
              optionFilterProp="children"
              popupClassName="select-custom-modal"
              value={MaHang}
              onChange={onChangeDataMaHang}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{ width: props.ismodal ? '100%' : 250 }}
              options={ListHang}
            />
          </Form.Item>
        </Space>
      )}
    </Space>
  );
};

export default ListItem;
