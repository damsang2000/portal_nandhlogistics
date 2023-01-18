/* eslint-disable no-dupe-keys */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import {
  Table,
  Tag,
  Tooltip,
  Select,
  Typography,
  DatePicker,
  Space,
  Button,
  Radio,
  Modal,
  Row,
  Col,
  Descriptions,
} from 'antd';
import { formarDateTimeddmmyyy } from '../../../shared/helpers';
import OrderDOApi from '../../../api/OrderDOApi';
import usePagination from '../../../hook/usePagination';
import ContenNoData from '../../../shared/components/ContenNoData';

const ModalDetailSystemExport = (props) => {
  // ? column
  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  const columns = [
    {
      title: 'Mã Hàng',
      dataIndex: 'ma_San_Pham',
      key: 'ma_San_Pham',
      width: 120,
    },
    // {
    //     title: 'Ngày XK',
    //     dataIndex: 'ngay_Xuat_Kho',
    // },
    // {
    //     title: 'Số AWB',
    //     dataIndex: 'so_AWB',
    //     render: so_AWB => <p style={{ color: '#20bf6b', fontWeight: 'bold' }}>{so_AWB}</p>,
    // },
    {
      title: 'Tên Hàng',
      dataIndex: 'ten_San_Pham',
      width: 200,
      render: (ten_San_Pham) => (
        <p style={{ color: 'rgba(71, 71, 135,1.0)', fontWeight: 'bold' }}>
          {ten_San_Pham}
        </p>
      ),

      // ellipsis: {
      //     showTitle: false,
      // },
      // render: ten_San_Pham => (
      //     <Tooltip placement="topLeft" title={ten_San_Pham}>
      //     {ten_San_Pham}
      //     </Tooltip>
      // ),
    },
    {
      title: 'Case No',
      dataIndex: '',
    },
    {
      title: 'PO Chỉ Định',
      dataIndex: '',
    },
    {
      title: 'Lot Chỉ Định',
      dataIndex: '',
    },
    {
      title: 'Batch Chỉ Định',
      dataIndex: '',
    },
    {
      title: 'Serial Chỉ Định',
      dataIndex: '',
    },
    {
      title: 'Kiện',
      dataIndex: 'so_Kien_Xuat',
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <div>{record.so_Kien_Xuat}</div>,
        };
      },
    },
    {
      title: 'SL',
      dataIndex: 'so_Luong_Xuat',
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <div>{record.so_Luong_Xuat}</div>,
        };
      },
    },
    {
      title: 'SL Lẻ',
      dataIndex: '',
    },
    // {
    //     title: 'Tên ĐVT',
    //     dataIndex: 'ten_Don_Vi_Tinh',
    // },
    {
      title: 'Đơn giá xuất',
      dataIndex: 'don_Gia_Xuat',
      render: (text, record) =>
        record.don_Gia_Xuat ? (
          <CurrencyFormat
            value={Number(record.don_Gia_Xuat)}
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value) => (
              <span
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                }}
              >
                {value}
                {`đ`}
              </span>
            )}
          />
        ) : (
          ''
        ),
    },
    {
      title: 'Life (%) >=...',
      dataIndex: '',
    },
    {
      title: 'Life (%) <=...',
      dataIndex: '',
    },
    {
      title: 'Vị trí chỉ định',
      dataIndex: '',
    },
    {
      title: 'NSX Chỉ Định',
      dataIndex: '',
    },
    {
      title: 'GW',
      dataIndex: '',
    },
    {
      title: 'NW',
      dataIndex: '',
    },
    {
      title: 'CBM',
      dataIndex: '',
    },
  ];
  // ? state component
  // ! hook custom pagination
  const [
    Total,
    setTotal,
    page,
    PageSize,
    getData,
    getDataSize,
    pageOption,
    position,
    setpage,
  ] = usePagination();

  const idchuhang = useSelector((state) => state.idchuhang);
  const [DODetail, setDODetail] = useState([]);

  let mapDODetail = [];
  let totalPrice = 0;
  // ? state extension
  const cookies = new Cookies();

  // ? call api
  useEffect(() => {
    // fetch(
    //   'http://api-stg.nandhlogistics.vn:2530/api/XuatNhapKhau/GetListChiTietHangXuat',
    //   {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //       sortName: null,
    //       isAsc: false,
    //       page: 0,
    //       pageCount: 0,
    //       date_From: props.datefrom,
    //       date_To: props.dateto,
    //       chu_Hang_ID: cookies.get('idchuhang'),
    //       kho_ID: 2631604,
    //       trang_Thai_Xuat_Kho_ID: [...props.arrTrangThai],
    //       xem_Type_ID: 3,
    //       sieu_Thi_ID: -5,
    //       idKeHoach: props.id,
    //     }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setDODetail(data.result);
    //     setTotal(data.total);
    //   });
    const fetchCategoryProduct = async () => {
      try {
        const data = {
          page: 0,
          sortName: null,
          isAsc: false,
          page: page,
          pageCount: PageSize,
          date_From: props.datefrom,
          date_To: props.dateto,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
          trang_Thai_Xuat_Kho_ID: null,
          xem_Type_ID: 3,
          sieu_Thi_ID: -5,
          idKeHoach: props.id,
        };
        const response = await OrderDOApi.getDetail(data);
        setDODetail(response.result);
        setTotal(response.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryProduct();
  }, [idchuhang.idchuhang, props.id, props.isrender]);
  // ? mapdodetail
  if (DODetail && DODetail.length !== 0) {
    mapDODetail = DODetail.map((item, index) => ({
      key: index,
      ...item,
      ngay_Xuat_Kho: item.ngay_Xuat_Kho
        ? formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10))
        : '',
      don_Gia_Xuat: item.don_Gia_Xuat ? item.don_Gia_Xuat : '',
      // eslint-disable-next-line max-len
      thoi_Diem_Ra_Khoi_Kho: item.thoi_Diem_Ra_Khoi_Kho
        ? `${formarDateTimeddmmyyy(item.thoi_Diem_Ra_Khoi_Kho.slice(0, 10))}
                                ${item.thoi_Diem_Ra_Khoi_Kho.slice(11, 19)}`
        : '',
      thoi_Diem_Auto_Pick_Hang: item.thoi_Diem_Auto_Pick_Hang
        ? `${formarDateTimeddmmyyy(item.thoi_Diem_Auto_Pick_Hang.slice(0, 10))}
                                ${item.thoi_Diem_Auto_Pick_Hang.slice(11, 19)}`
        : '',
      thoi_Diem_Xac_Nhan_Pick_Xong: item.thoi_Diem_Xac_Nhan_Pick_Xong
        ? `${formarDateTimeddmmyyy(
            item.thoi_Diem_Xac_Nhan_Pick_Xong.slice(0, 10)
          )}
                                ${item.thoi_Diem_Xac_Nhan_Pick_Xong.slice(
                                  11,
                                  19
                                )}`
        : '',
      thoi_Gian_Tao: item.thoi_Gian_Tao
        ? `${formarDateTimeddmmyyy(item.thoi_Gian_Tao.slice(0, 10))}
       ${item.thoi_Gian_Tao.slice(11, 19)}`
        : '',
    }));
    totalPrice = DODetail.reduce((item, value) => item + value.don_Gia_Xuat, 0);
  }

  return (
    <Modal
      open={props.open}
      onCancel={props.callBackCanCel}
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
      className="custom-modal"
      title={props.title}
      width={1000}
      footer={null}
    >
      <Row>
        <Col span={12}>
          <Descriptions
            bordered
            style={{ marginBottom: '10px', width: '95%' }}
            size="small"
          >
            <Descriptions.Item
              label="Số phiếu xuất | trạng thái"
              span={4}
            >
              <div>
                <p
                  style={{
                    fontWeight: 'bolder',
                    color: 'red',
                    display: 'inline-block',
                  }}
                >
                  {`${props.datadetail.so_Phieu_Xuat_Kho}` || ''}
                </p>
                |
                {mapDODetail.length !== 0 &&
                mapDODetail[0].trang_Thai_Xuat_Kho_HTML ? (
                  <span
                    dangerouslySetInnerHTML={createMarkup(
                      mapDODetail[0].trang_Thai_Xuat_Kho_HTML
                    )}
                  />
                ) : (
                  ''
                )}
              </div>
            </Descriptions.Item>
            <Descriptions.Item
              label="Ngày xuất kho"
              span={3}
            >
              <div>{`${props.datadetail.ngay_Xuat_Kho}`}</div>
            </Descriptions.Item>
            <Descriptions.Item
              label="Document No"
              span={4}
            >
              {props.datadetail.document_no || ''}
            </Descriptions.Item>

            <Descriptions.Item
              label="Người nhận hàng(Phone)"
              span={4}
            >
              <div
                dangerouslySetInnerHTML={createMarkup(
                  props.datadetail.nguoi_nhan_hang || ''
                )}
              />
            </Descriptions.Item>
            <Descriptions.Item
              label="Nhà cung cấp"
              span={4}
            >
              {props.datadetail.ma_ncc || ''} 
            </Descriptions.Item>
            <Descriptions.Item
              label="Loại hình xuất"
              span={3}
            >
              {props.datadetail.loai_hinh_xuat || ''}
            </Descriptions.Item>

            <Descriptions.Item
              label="Địa chỉ chi tiết"
              span={4}
            >
              {props.datadetail.dia_chi_chi_tiet || ''}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions
            bordered
            style={{ marginBottom: '10px' }}
            size="small"
          >
            <Descriptions.Item
              label="Khoảng thời gian"
              span={3}
            >
              {mapDODetail.length !== 0 && mapDODetail[0].thoi_Gian_Tao ? (
                <span className="label label-success">{`New (${mapDODetail[0].thoi_Gian_Tao})`}</span>
              ) : (
                ''
              )}
              {mapDODetail.length !== 0 &&
              mapDODetail[0].thoi_Diem_Auto_Pick_Hang ? (
                <span className="label label-orange">{`Allocated (${mapDODetail[0].thoi_Diem_Auto_Pick_Hang})`}</span>
              ) : (
                ''
              )}
              <br />
              {mapDODetail.length !== 0 &&
              mapDODetail[0].thoi_Diem_Xac_Nhan_Pick_Xong ? (
                <span className="label label-putaway">{`Picked (${mapDODetail[0].thoi_Diem_Xac_Nhan_Pick_Xong})`}</span>
              ) : (
                ''
              )}
              {mapDODetail.length !== 0 &&
              mapDODetail[0].thoi_Diem_Ra_Khoi_Kho ? (
                <span className="label label-primary">{`Shipped (${mapDODetail[0].thoi_Diem_Ra_Khoi_Kho})`}</span>
              ) : (
                ''
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="Tổng mã hàng"
              span={3}
            >
              {mapDODetail.length !== 0 ? mapDODetail.length : ''}
            </Descriptions.Item>
            <Descriptions.Item
              label="Phương thức thanh toán"
              span={3}
            >
              {' '}
            </Descriptions.Item>
            <Descriptions.Item
              label="Tổng"
              span={3}
            >
              {totalPrice ? (
                <CurrencyFormat
                  value={Number(totalPrice)}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value) => (
                    <span
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                      }}
                    >
                      {value}
                      {`đ`}
                    </span>
                  )}
                />
              ) : (
                ''
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="Phí giao hàng"
              span={3}
            >
              0đ
            </Descriptions.Item>
            <Descriptions.Item
              label="Số tiền giảm giá"
              span={3}
            >
              0đ
            </Descriptions.Item>
            <Descriptions.Item
              label="COD"
              span={3}
            >
              0đ
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        // expandable={{
        // rowExpandable: record => true,
        // expandedRowRender: record => (
        //   <table>
        //     <thead className="ant-table-thead">
        //       <tr>
        //         <th className="ant-table-cell">KH Kiện</th>
        //         <th className="ant-table-cell">KH SL</th>
        //         <th className="ant-table-cell">ĐP Kiện</th>
        //         <th className="ant-table-cell">ĐP SL</th>
        //         <th className="ant-table-cell">PX Kiện</th>
        //         <th className="ant-table-cell">PX SL</th>
        //         <th className="ant-table-cell">HT Kiện</th>
        //         <th className="ant-table-cell">HT SL</th>
        //         <th className="ant-table-cell">Shipped Time</th>
        //       </tr>
        //     </thead>
        //     <tr className="ant-table-row">
        //       <td>{record.so_Kien_Xuat}</td>
        //       <td>{record.so_Luong_Xuat}</td>
        //       <td>{record.so_Kien_Cho_Pick}</td>
        //       <td>{record.so_Luong_Cho_Pick}</td>
        //       <td>{record.so_Kien_Pick_Xong}</td>
        //       <td>{record.so_Luong_Pick_Xong}</td>
        //       <td>{record.so_Kien_Ra_Khoi_Kho}</td>
        //       <td>{record.so_Luong_Ra_Khoi_Kho}</td>
        //       <td>{record.thoi_Diem_Ra_Khoi_Kho}</td>
        //     </tr>
        //   </table>
        //   ),
        //   }}
        dataSource={mapDODetail}
        scroll={{ x: 1600 }}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          pageSizeOptions: pageOption,
          position: position,
        }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        footer={() =>
          page && Total ? (
            <p
              style={{
                color: 'black',
              }}
            >{`Page ${page} of ${Math.ceil(
              Total / PageSize
            )} (${Total} items)`}</p>
          ) : null
        }
      />
    </Modal>
  );
};

export default ModalDetailSystemExport;
