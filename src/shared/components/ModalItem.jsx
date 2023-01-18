/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable arrow-body-style */
import React, {
    useState,
} from 'react';
import {
    Modal,
    Space,
    Select,
    DatePicker,
    Typography,
    Button,
    Input,
} 
  from 'antd';
import Cookies from 'universal-cookie';
import ListItem from './ListItem';

// eslint-disable-next-line react/prop-types
const ModalItem = ({ openmodal }) => {
  // ? state component
  const [open, setOpen] = useState(openmodal);


  // ? state extension
    // Title antd
    const { Title } = Typography;

    
  // ? state normal
    // state cookies
    const cookies = new Cookies();

  // ? function handle component
        // handle function cancel
        const handleCancel = () => {
            setOpen(false);
        };

  // ? function action 
        
    
  return (
    <Modal
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
        className="custom-modal"
        open={open}
        title="Chỉnh sửa thông tin"
        onCancel={handleCancel}
        width={1000}
        footer={[
       <Button key="Lưu" type="primary">
        Lưu
       </Button>,
     ]}
    >
    <Space direction="vertical">
     <Space direction="horizontal">
        <ListItem idchuhang={cookies.get('idchuhang')} ismodal />
     </Space>
    </Space>
   
    </Modal>
  );
};

export default ModalItem;
