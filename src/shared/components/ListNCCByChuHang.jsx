/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import {
          Space, 
          Typography, 
          Select, 
          Form, 
  
} from 'antd';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Changeloading } from '../../redux/actions/loadingAction';
import NhaNCCApi from '../../api/NhaCCApi';


// eslint-disable-next-line react/prop-types, camelcase
const ListNCC = ({ idchuhang, ismodal, handleStateNhaCC }) => {
const { Title } = Typography;   
const { Option } = Select;
const [MaNCC, setMaNCC] = useState(null);
const [listNCC, setlistNCC] = useState([]);
const dispatch = useDispatch();
const cookies = new Cookies();

const onChangeDataMaNCC = (value) => {
    setMaNCC(value);
    localStorage.setItem('mancc', value);
};


useEffect(() => {
    if (!ismodal) {
      dispatch(Changeloading({ loading: true }));
    }
    if (cookies.get('idchuhang')) { 
//       fetch('http://api-stg.nandhlogistics.vn:2530/api/DanhMucNhaCungCap/GetDanhMucNhaCungCap',
// {
//       headers: {
//       Accept: 'application/json ,',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//       },
//     // mode: 'cors',
//     // crossorigin: true,  
//       method: 'POST',
//       body: JSON.stringify({
//           chu_Hang_ID: idchuhang,
//         }),
//       })
//       // eslint-disable-next-line consistent-return
//       .then(res => res.json())
//       .then((data) => {
//         const mapListNCC = data.result.map(item => ({
//                 value: item.ma_NCC,
//                 label: item.ten_NCC,
//                 key: item.ten_NCC,
//             }));
//         setlistNCC(mapListNCC);
//         setMaNCC(null);
//          dispatch(Changeloading({ loading: false })); 
//       })
//       .catch((err) => {
//         dispatch(Changeloading({ loading: false }));
//       });

      const fetchNCCList = async () => {
         try {
          const data = {
            chu_Hang_ID: idchuhang,
          };
          const response = await NhaNCCApi.getAll(data);
          const mapListNCC = response.result.map(item => ({
            value: item.ma_NCC,
            label: item.ten_NCC,
            key: item.ten_NCC,
            }));
            // console.log(mapListNCC);
            setlistNCC(mapListNCC);
            setMaNCC(null);
            dispatch(Changeloading({ loading: false })); 
         } catch (error) {
            dispatch(Changeloading({ loading: false }));
            console.log('fail to fetch list nha cung cap', error);
         }
      };

      fetchNCCList();
  } 
}, [idchuhang]);

    return (
      <Space direction="vertical" className="custom-modal-space">
        <Space direction="horizontal" className="custom-modal-space">
            <Form.Item label="Nhà Cung Cấp" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <Select 
                    showSearch
                    placeholder="Chọn Nhà Cung Cấp"
                    className="select-custom"
                    optionFilterProp="children"
                    popupClassName="select-custom"
                    onChange={value => handleStateNhaCC(value)}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    style={{ width: 200 }}
                    options={listNCC}
                  />     
            </Form.Item>  
          
        </Space> 
      </Space>
);
};

export default ListNCC;
