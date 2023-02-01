/* eslint-disable react/jsx-boolean-value */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
import { Card, Col, DatePicker, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import ThongKeApi from '../../../api/ThongKeApi';
import { changeDataArrCost } from '../../../redux/actions/arrCostActions';
import ExportExcel from '../ExportExcel';
import ShareCost from './ShareCost';

const index = (props) => {
  // ? state extension
  const cookies = new Cookies();
  const idchuhang = useSelector((state) => state.idchuhang);
  const arrCost = useSelector((state) => state.arrCost);
  const { Title } = Typography;
  const dispatch = useDispatch();
  const format = 'MM/YYYY';
  const formatMMYYYY = 'MM-YYYY';
  const monthCurrent = moment().format(format);
  const monthMMYYYY = moment().format(formatMMYYYY);
  const [date, setDate] = useState(monthCurrent);
  // ? state component
  const [datatotal, setdatatotal] = useState('');
  const [dataStogareProduct, setDataStogareProduct] = useState([]);
  const [unLoadingProduct, setUnLoadingProduct] = useState([]);
  const [incurredProduct, setincurredProduct] = useState([]);
  const [exportProduct, setExportProduct] = useState([]);
  const [handleProduct, setHandleProduct] = useState([]);
  const [handleProductReturn, setHandleProductReturn] = useState([]);
  const [handleDC, setHandleDC] = useState([]);
  const [packProduct, setPackProduct] = useState([]);

  //* CALL API
  useEffect(() => {
    const fetchCategoryProduct = async () => {
      const month = parseInt(date.split('/')[0], 10);
      const year = parseInt(date.split('/')[1], 10);
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
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
        };

        const response = await ThongKeApi.getAllChiPhiVanHanh(data);
        setdatatotal(response);
        console.log(response);
        dispatch(
          changeDataArrCost({
            arrCost: [
              response.phiLuuKho_ThanhTien,
              response.phiXuLyHangHoa_ThanhTien,
              response.phiBocXep_ThanhTien,
              response.phiSoanDongGoi_ThanhTien,
              response.phiVatTuBaoBi_ThanhTien,
              response.phiXuLyDC_ThanhTien,
              response.phiXuLyHangHoan_ThanhTien,
              response.phiXuatHang_ThanhTien,
            ],
          })
        );
        const mapDataStorageProduct = response.detail.filter(
          (item) => item.loai === 'L1'
        );
        const mapUnloading = response.detail.filter(
          (item) => item.loai === 'L2'
        );
        const mapincurredProduct = response.detail.filter(
          (item) => item.loai === 'L6'
        );
        const mapExportProduct = response.detail.filter(
          (item) => item.loai === 'L5'
        );
        const mapHandleProduct = response.detail.filter(
          (item) => item.loai === 'L3'
        );
        const mapHandleProductReturn = response.detail.filter(
          (item) => item.loai === 'L8'
        );
        const mapHandleDC = response.detail.filter(
          (item) => item.loai === 'L7'
        );

        const mapPackProduct = response.detail.filter(
          (item) => item.loai === 'L4'
        );

        setDataStogareProduct(mapDataStorageProduct);
        setUnLoadingProduct(mapUnloading);
        setincurredProduct(mapincurredProduct);
        setExportProduct(mapExportProduct);
        setHandleProduct(mapHandleProduct);
        setHandleProductReturn(mapHandleProductReturn);
        setHandleDC(mapHandleDC);
        setPackProduct(mapPackProduct);
      } catch (error) {
        console.log('fail to fetch list item', error);
      }
    };
    fetchCategoryProduct();

    return () => {
      setdatatotal('');
      setDataStogareProduct([]);
      setUnLoadingProduct([]);
      setincurredProduct([]);
      setExportProduct([]);
      setHandleProduct([]);
      setHandleProductReturn([]);
      setHandleDC([]);
      setPackProduct([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchuhang.idchuhang, date]);

  //* RENDER COMPONENT
  return (
    <Col span={24}>
      <div
        style={{
          width: '100%',
          marginBottom: '2px',
          alignItems: 'center',
        }}
      >
        <Title
          level={5}
          style={{
            padding: '2px 5px',
            color: 'black',
            fontWeight: 'normal',
            // backgroundColor: '#d63031',
            marginBottom: '0px',
            display: 'inline-block',
          }}
        >
          {`Tổng chi phí vận hành tháng `}{' '}
          <DatePicker
            className="createDateRangePicker"
            popupClassName="createDateRangePicker"
            picker="month"
            format={'MM/YYYY'}
            defaultValue={dayjs(monthCurrent, format)}
            onChange={(value, dateString) => {
              setDate(dateString);
              localStorage.setItem('CostMonth', dateString);
            }}
          />
          <CurrencyFormat
            value={Number(
              datatotal.tongCong ? datatotal.tongCong.toFixed(0) : 0
            )}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value) => (
              <span className="badge_custom">
                {value} {`đ`}
              </span>
            )}
          />
          <ExportExcel
            filename={`Tong_chi_phi_van_hanh_${parseInt(
              date.split('/')[0],
              10
            )}-${parseInt(date.split('/')[1], 10)}`}
            date={date}
          />
        </Title>
      </div>

      <Card
        style={{
          backgroundColor: 'white',
          border: '1px solid #b2bec3',
          borderTop: '3px solid #ff3838',
          marginBottom: '10px',
          borderRadius: '5px',
        }}
      >
        <Row gutter={16}>
          <ShareCost
            total={datatotal.phiLuuKho_ThanhTien}
            title="Phí lưu kho"
            data={dataStogareProduct}
          />
          <ShareCost
            total={
              datatotal.phiXuLyHangHoa_ThanhTien +
              datatotal.phiSoanDongGoi_ThanhTien +
              datatotal.phiXuLyDC_ThanhTien
            }
            title="Phí dịch vụ giá trị gia tăng"
            isTab
            data={handleProduct}
            dataHanlePack={packProduct}
            dataHanleDC={handleDC}
            totalHanle={datatotal.phiXuLyHangHoa_ThanhTien}
            totalPack={datatotal.phiSoanDongGoi_ThanhTien}
            totalDC={datatotal.phiXuLyDC_ThanhTien}
          />
          <ShareCost
            total={datatotal.phiBocXep_ThanhTien}
            title="Phí bốc xếp hàng hóa"
            data={unLoadingProduct}
          />
          {/* <ShareCost
            total={
              arrCost
                ? parseInt(arrCost.arrCost[3], 10)
                : datatotal.phiSoanDongGoi_ThanhTien
            }
            title="Phí soạn hàng và đóng gói"
            data={packProduct}
          /> */}
          <ShareCost
            total={datatotal.phiVatTuBaoBi_ThanhTien}
            title="Phí vật tư bao bì"
            data={incurredProduct}
          />
          {/* <ShareCost
            total={
              arrCost
                ? parseInt(arrCost.arrCost[5], 10)
                : datatotal.phiXuLyDC_ThanhTien
            }
            title="Phí xử lý DC"
            data={handleDC}
          /> */}
          <ShareCost
            total={datatotal.phiXuLyHangHoan_ThanhTien}
            title="Phí xử lý hàng hoàn"
            data={handleProductReturn}
          />
          <ShareCost
            total={datatotal.phiXuatHang_ThanhTien}
            title="Phí hoàn tất đơn hàng"
            data={exportProduct}
          />
        </Row>
      </Card>
    </Col>
  );
};

export default index;
