import React, { createElement, useState } from 'react';
import { Button } from 'antd';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import axios from 'axios';
const ExportExcel = (props) => {
  const cookies = new Cookies();
  const [loadings, setLoadings] = useState([]);
  const fetchCategoryProduct = async (index) => {
    // const month = parseInt(props.date.split('/')[0], 10);
    // const year = parseInt(props.date.split('/')[1], 10);
    // let startOfMonth = moment()
    //   .month(month - 1)
    //   .year(year)
    //   .startOf('month')
    //   .format('YYYY-MM-DD');
    // let endOfMonth = moment()
    //   .month(month - 1)
    //   .year(year)
    //   .endOf('month')
    //   .format('YYYY-MM-DD');
    try {
      const data = {
        sortName: null,
        isAsc: true,
        page: null,
        pageCount: null,
        date_From: null,
        date_To: null,
        chu_Hang_ID: null,
        kho_ID: null,
        khu_Vuc_ID: 2657524,
        ngay_Kiem_Kho: null,
        trang_Thai_Text: '',
        kiem_Kho_ID: 11919709,
      };
      const response = await axios.post(
        'http://api-stg.nandhlogistics.vn:2530/api/WarehouseReport/ExportPhieuKiemKho',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );
      const blob = new Blob([response], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'file.doc');
      // const href = URL.createObjectURL(response);
      // const link = document.createElement('a');
      // const form = document.createElement('form');
      // link.href = href;
      // link.className = 'excel_download';

      // link.setAttribute('download', `kiemkho.doc`);
      // form.appendChild(link);
      // link.type = 'submit';
      // link.addEventListener('click', (e) => {
      //   e.preventDefault();
      //   console.log('hello');
      // });
      // link.click(); //or any other extension
      // document.body.appendChild(link);
      // const adownload = document.body.querySelector('.excel_download');
      // console.log(adownload);
      // adownload.addEventListener('click', function (e) {
      //   e.preventDefault();
      // });
      // adownload.click();
      // link.click();
      // document.body.removeChild(link);
      // URL.revokeObjectURL(href);
      // eslint-disable-next-line no-restricted-globals
      // history.go(0);

      // setLoadings((prevLoadings) => {
      //   const newLoadings = [...prevLoadings];
      //   newLoadings[index] = false;
      //   return newLoadings;
      // });
    } catch (err) {
      console.log(err);
    }
  };
  const enterLoading = (index) => {
    // setLoadings((prevLoadings) => {
    //   const newLoadings = [...prevLoadings];
    //   newLoadings[index] = true;
    //   return newLoadings;
    // });

    fetchCategoryProduct(index);
  };

  return (
    <Button
      onClick={enterLoading}
      // type="primary"
      // danger
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        textDecoration: 'underline',
      }}
      type="link"
      // className="custom-button1 custom-button2"
      // icon={<DownloadOutlined />}
      // loading={loadings[1]}
    >
      in phiếu
    </Button>
  );
};

export default ExportExcel;
