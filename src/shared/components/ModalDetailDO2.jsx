/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import { Col, Descriptions, Modal, Row, Table } from 'antd';
import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import usePagination from '../../hook/usePagination';
import { formarDateTimeddmmyyy } from '../helpers';
import ContenNoData from './ContenNoData';

const ModalDetailDO2 = (props) => {
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
    {
      title: 'Tên Hàng',
      dataIndex: 'ten_San_Pham',
      width: 200,
      render: (ten_San_Pham) => (
        <p style={{ color: 'rgba(71, 71, 135,1.0)', fontWeight: 'bold' }}>
          {ten_San_Pham}
        </p>
      ),
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
  const [TotalPage, setTotalPage] = useState(1);
  const [Page, setPage] = useState(1);

  const idchuhang = useSelector((state) => state.idchuhang);
  const idKho = useSelector((state) => state.idKho);
  const [DODetail, setDODetail] = useState([]);

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

  let mapDODetail = {};
  let totalPrice = 0;
  // ? state extension
  const cookies = new Cookies();
  const dispatch = useDispatch();

  // ? call api
  //   useEffect(() => {
  //     if (props.id) {
  //         const fetchDODetailProduct = async () => {
  //             try {
  //               const data = {
  //                 sortName: null,
  //                 isAsc: false,
  //                 page: 0,
  //                 pageCount: 0,
  //                 date_From: localStorage.getItem('datefromimportDashboard')
  //                                 ? formatDateTime(localStorage.getItem('datefromimportDashboard'))
  //                                 : props.datefrom,
  //                 date_To: localStorage.getItem('datetoimportDashboard')
  //                                 ? formatDateTime(localStorage.getItem('datetoimportDashboard'))
  //                                 : props.dateto,
  //                 chu_Hang_ID: cookies.get('idchuhang'),
  //                 kho_ID: Number(localStorage.getItem('kho_id')),
  //                 trang_Thai_Xuat_Kho_ID: [
  //                   ...props.arrTrangThai,
  //                 ],
  //                 xem_Type_ID: 3,
  //                 sieu_Thi_ID: -5,
  //                 idKeHoach: props.id,
  //               };
  //               const response = await OrderDOApi.getDetail(data);
  //               if (response.result) {
  //                 setDODetail(response.result);
  //                 setTotal(response.total);
  //               }
  //             } catch (error) {
  //               // console.log('fail to fetch list item', error);
  //               // dispatch(Changeloading({ loading: false }));
  //             }
  //         };
  //         fetchDODetailProduct();
  //     }
  //     return () => {
  //       setDODetail([]);
  //       setTotal(0);
  //     };
  // }, [idchuhang.idchuhang,idKho.idKho, props.id, props.isrender]);
  // ? mapdodetail
  mapDODetail = [
    {
      ...props.datadetail,
      thoi_Diem_Auto_Pick_Hang: props.datadetail.thoi_Diem_Auto_Pick_Hang
        ? `${formarDateTimeddmmyyy(
            props.datadetail.thoi_Diem_Auto_Pick_Hang.slice(0, 10)
          )}
                                    ${props.datadetail.thoi_Diem_Auto_Pick_Hang.slice(
                                      11,
                                      19
                                    )}`
        : '',
      thoi_Diem_Xac_Nhan_Pick_Xong: props.datadetail
        .thoi_Diem_Xac_Nhan_Pick_Xong
        ? `${formarDateTimeddmmyyy(
            props.datadetail.thoi_Diem_Xac_Nhan_Pick_Xong.slice(0, 10)
          )}
                                    ${props.datadetail.thoi_Diem_Xac_Nhan_Pick_Xong.slice(
                                      11,
                                      19
                                    )}`
        : '',
    },
  ];

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
                <span
                  dangerouslySetInnerHTML={createMarkup(
                    props.datadetail.trang_Thai_Xuat_Kho_HTML
                  )}
                />
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
              {props.datadetail.document_No || ''}
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
              {}
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
              {props.datadetail.loai_Hinh_Xuat_Kho_Text || ''}
            </Descriptions.Item>

            <Descriptions.Item
              label="Ghi chú"
              span={4}
            >
              {props.datadetail.ghi_Chu_Phieu_Xuat || ''}
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
              {props.datadetail.thoi_Gian_Tao &&
              mapDODetail[0].thoi_Diem_Ra_Khoi_Kho ? (
                <span className="label label-success">{`New (${props.datadetail.thoi_Gian_Tao})`}</span>
              ) : (
                ''
              )}
              {mapDODetail[0].thoi_Diem_Auto_Pick_Hang &&
              mapDODetail[0].thoi_Diem_Ra_Khoi_Kho ? (
                <span className="label label-orange">{`Allocated (${mapDODetail[0].thoi_Diem_Auto_Pick_Hang})`}</span>
              ) : (
                ''
              )}
              <br />
              {mapDODetail[0].thoi_Diem_Xac_Nhan_Pick_Xong &&
              mapDODetail[0].thoi_Diem_Ra_Khoi_Kho ? (
                <span className="label label-putaway">{`Picked (${mapDODetail[0].thoi_Diem_Xac_Nhan_Pick_Xong})`}</span>
              ) : (
                ''
              )}
              {mapDODetail[0].thoi_Diem_Ra_Khoi_Kho &&
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
              {mapDODetail.length}
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
              {props.datadetail.don_Gia_Xuat ? (
                <CurrencyFormat
                  value={Number(props.datadetail.don_Gia_Xuat)}
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
          total: TotalPage,
          position: position,
        }}
        footer={() =>
          page && TotalPage ? (
            <p
              style={{
                color: 'black',
              }}
            >{`Page ${page} of ${Math.ceil(
              TotalPage / 1
            )} (${TotalPage} items)`}</p>
          ) : null
        }
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
      />
    </Modal>
  );
};

export default ModalDetailDO2;
