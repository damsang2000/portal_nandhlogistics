/* eslint-disable max-len */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { Table, Modal, Descriptions, Row, Col } from 'antd';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';
import OrderASNApi from '../../../api/OrderASNApi';
import usePagination from '../../../hook/usePagination';
import ContenNoData from '../../../shared/components/ContenNoData';

const ModalDetailSystemImport = (props) => {
  const [ASNDetail, setASNDetail] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);

  const cookies = new Cookies();

  let mapASNDetail = [];
  let detailDataASN = {};

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

  useEffect(() => {
    if (cookies.get('idchuhang') && props.id) {
      const fetchASNProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromsystemimport')
              ? formatDateTime(localStorage.getItem('datefromsystemimport'))
              : props.datefrom,
            date_To: localStorage.getItem('datetosystemimport')
              ? formatDateTime(localStorage.getItem('datetosystemimport'))
              : props.dateto,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: 2631604,
            loai_Hinh_Nhap_Kho_ID: 1,
            idKeHoach: props.id,
            trang_Thai_Nhap_Kho_ID: null,
          };
          const response = await OrderASNApi.getDetail(data);
          if (response.result) {
            setASNDetail(response.result);
            setTotal(response.total);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchASNProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idchuhang.idchuhang, page, PageSize, props.id]);

  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  const columns = [
    {
      title: 'Mã hàng',
      dataIndex: 'ma_San_Pham',
      key: 'ma_San_Pham',
      width: 100,
    },
    // {
    //     title: 'Mã Loại Hàng',
    //     dataIndex: 'Ma_Loai_San_Pham',
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
    },
    {
      title: 'Số Batch',
      dataIndex: 'so_Batch',
      width: 100,
    },
    {
      title: 'Ngày SX',
      dataIndex: 'ngay_San_Xuat',
      key: 'Ngay_Ke_Hoach',
      width: 100,
    },
    {
      title: 'Ngày Hết Hạn',
      dataIndex: 'ngay_Het_Han',
      key: 'Ref_No',
      width: 100,
    },
    {
      title: 'Life(%)',
      dataIndex: 'life',
      key: 'Ma_NCC',
      width: 100,
    },
    {
      title: 'Chứng Từ',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.so_Kien}</div>,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.so_Luong}</div>,
            };
          },
        },
        {
          title: 'GW',
          dataIndex: 'tong_GW',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tong_GW}</div>,
            };
          },
        },
        {
          title: 'NW',
          dataIndex: 'tong_NW',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tong_NW}</div>,
            };
          },
        },
        {
          title: 'CBM',
          dataIndex: 'tong_CBM',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <div>{record.tong_CBM}</div>,
            };
          },
        },
      ],
    },
    {
      title: 'Thực Nhận',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.so_Kien_Receive}</div>,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.so_Kien_Receive}</div>,
            };
          },
        },
        {
          title: 'GW',
          dataIndex: 'tong_GW_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_GW_Receive}</div>,
            };
          },
        },
        {
          title: 'NW',
          dataIndex: 'tong_NW_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_NW_Receive}</div>,
            };
          },
        },
        {
          title: 'CBM',
          dataIndex: 'tong_CBM_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_CBM_Receive}</div>,
            };
          },
        },
      ],
    },
  ];

  if (ASNDetail && ASNDetail.length !== 0) {
    mapASNDetail = ASNDetail.map((item, index) => ({
      key: index,
      ...item,
      ngay_Nhap_Kho: item.ngay_Nhap_Kho
        ? formarDateTimeddmmyyy(item.ngay_Nhap_Kho.slice(0, 10))
        : '',
      ngay_San_Xuat: item.ngay_San_Xuat
        ? formarDateTimeddmmyyy(item.ngay_San_Xuat.slice(0, 10))
        : '',
      ngay_Het_Han: item.ngay_Het_Han
        ? formarDateTimeddmmyyy(item.ngay_Het_Han.slice(0, 10))
        : '',
    }));
  }

  return (
    <>
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
                label="Số phiếu"
                span={4}
              >
                <p style={{ fontWeight: 'bolder', color: 'red' }}>
                  {props.datadetail.so_Phieu_Nhap_Kho || ''}
                </p>
              </Descriptions.Item>
              <Descriptions.Item
                label="Alt No"
                span={4}
              >
                {props.datadetail.altNo || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Người nhận hàng"
                span={4}
              >
                {props.datadetail.nguoi_nhan || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Ngày giờ nhận hàng"
                span={4}
              >
                {props.datadetail.ngay_gio_nhan || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Ghi chú"
                span={4}
              >
                {props.datadetail.ghi_chu || ''}
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
                label="Ngày nhập kho"
                span={3}
              >
                {props.datadetail.ngay_Nhap_Kho || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Loại hình nhập"
                span={3}
              >
                {mapASNDetail.length !== 0 &&
                mapASNDetail[0].loai_Hinh_Nhap_Kho_Text
                  ? mapASNDetail[0].loai_Hinh_Nhap_Kho_Text
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Nhà cung cấp"
                span={3}
              >
                {mapASNDetail.length !== 0 && mapASNDetail[0].ten_NCC
                  ? mapASNDetail[0].ten_NCC
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Trạng thái nhập kho"
                span={3}
              >
                {props.datadetail.trang_Thai_Nhap_Kho_Text === 'Received' ? (
                  <span className="label label-primary">
                    {props.datadetail.trang_Thai_Nhap_Kho_Text}
                  </span>
                ) : (
                  ''
                )}
                {props.datadetail.trang_Thai_Nhap_Kho_Text === 'Complete' ? (
                  <span className="label label-success">
                    {props.datadetail.trang_Thai_Nhap_Kho_Text}
                  </span>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item
                label="Tổng mã hàng"
                span={3}
              >
                {mapASNDetail.length !== 0 ? mapASNDetail.length : ''}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Table
          columns={columns}
          bordered
          style={{ borderRadius: '20px' }}
          dataSource={props.isASN ? detailDataASN : mapASNDetail}
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
    </>
  );
};
export default ModalDetailSystemImport;
