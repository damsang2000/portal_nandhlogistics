import { Table, Modal, Descriptions, Row, Col } from 'antd';
import Cookies from 'universal-cookie';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { formatDateTime, formarDateTimeddmmyyy } from '../../../helpers';
import OrderASNApi from '../../../../api/OrderASNApi';
import usePagination from '../../../../hook/usePagination';
import ContenNoData from '../../ContenNoData';

const ModalDetailASN = (props) => {
  //? state extension
  const cookies = new Cookies();

  //? state component
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

  //! state asn
  const [ASNDetail, setASNDetail] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  let mapASNDetail = [];

  //? function handle
  //! handle render html
  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }

  //* Columns table===================================================
  const columns = [
    {
      title: 'Mã hàng',
      dataIndex: 'ma_San_Pham',
      key: 'ma_San_Pham',
      width: 100,
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
  //* Map data=========================================================
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

  //* Call API=============================================================
  useEffect(() => {
    if (cookies.get('idchuhang') && props.id) {
      const fetchASNProduct = async () => {
        try {
          const data = {
            sortName: null,
            isAsc: true,
            page: page,
            pageCount: PageSize,
            date_From: localStorage.getItem('datefromimportDashboard')
              ? formatDateTime(localStorage.getItem('datefromimportDashboard'))
              : props.datefrom,
            date_To: localStorage.getItem('datetoimportDashboard')
              ? formatDateTime(localStorage.getItem('datetoimportDashboard'))
              : props.dateto,
            chu_Hang_ID: cookies.get('idchuhang'),
            kho_ID: 2631604,
            loai_Hinh_Nhap_Kho_ID: props.inputType,
            idKeHoach: props.id,
            trang_Thai_Nhap_Kho_ID: [...props.arrTrangThai],
          };
          const response = await OrderASNApi.getDetail(data);
          setASNDetail(response.result);
          setTotal(response.total);
        } catch (error) {
          // console.log('fail to fetch list item', error);
          // dispatch(Changeloading({ loading: false }));
        }
      };
      fetchASNProduct();
    }
  }, [idchuhang.idchuhang, page, PageSize, props.id]);

  //* render component=========================================================
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
                  {props.datadetail.so_phieu_nhap
                    ? props.datadetail.so_phieu_nhap
                    : ''}
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
                {mapASNDetail.length !== 0 ? mapASNDetail[0].ngay_Nhap_Kho : ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Loại hình nhập"
                span={3}
              >
                {props.datadetail.loai_hinh_nhap || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Nhà cung cấp"
                span={3}
              >
                {props.datadetail.ma_ncc || ''}
              </Descriptions.Item>
              <Descriptions.Item
                label="Trạng thái nhập kho"
                span={3}
              >
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    props.datadetail.trang_thai_nhap_kho
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item
                label="Tổng mã hàng"
                span={3}
              >
                {mapASNDetail.length !== 0 ? Total : ''}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Table
          columns={columns}
          bordered
          style={{ borderRadius: '20px' }}
          dataSource={mapASNDetail}
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
export default ModalDetailASN;
