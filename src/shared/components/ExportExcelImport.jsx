import React, { useState } from 'react';
import ThongKeApi from '../../api/ThongKeApi';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Cookies from 'universal-cookie';
import axios from 'axios';
import moment from 'moment';
const ExportExcelImport = (props) => {
  const cookies = new Cookies();
  const [loadings, setLoadings] = useState([]);
  const fetchCategoryProduct = async (index) => {
    const month = parseInt(props.date.split('/')[0], 10);
    const year = parseInt(props.date.split('/')[1], 10);
    let startOfMonth = moment()
      .month(month - 1)
      .year(year)
      .startOf('month')
      .format('YYYY-MM-DD');
    let endOfMonth = moment()
      .month(month - 1)
      .year(year)
      .endOf('month')
      .format('YYYY-MM-DD');
    try {
      const data = {
        date_From: startOfMonth,
        date_To: endOfMonth,
        chu_Hang_ID: cookies.get('idchuhang')
          ? cookies.get('idchuhang')
          : localStorage.getItem('idchuhang'),
        kho_ID: 2631604,
        hop_Dong_ID: 14847629,
      };
      const response = await axios.post(
        'https://gateway-api.nandhlogistics.vn/api/WarehouseReport/ExportBangKeChiPhiVanHanh',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );
      const href = URL.createObjectURL(response);

      const link = document.createElement('a');
      link.href = href;

      link.setAttribute('download', `${props.filename}.xls`); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    } catch (err) {
      console.log(err);
    }
  };
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    fetchCategoryProduct(index);
  };

  return (
    <Button
      onClick={() => enterLoading(1)}
      // type="primary"
      // danger
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        textDecoration: 'underline',
      }}
      type="link"
      className="custom-button1 custom-button2"
      icon={<DownloadOutlined />}
      loading={loadings[1]}
    >
      tải file
    </Button>
  );
};

export default ExportExcelImport;
