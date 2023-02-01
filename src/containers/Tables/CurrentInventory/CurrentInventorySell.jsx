import { Space, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import KhoApi from '../../../api/KhoAPI';
import TonKhoApi from '../../../api/TonKhoApi';
import { useDebounce } from '../../../hook';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import InputColumns from '../../../shared/components/InputColumns';
import { formarDateTimeddmmyyy } from '../../../shared/helpers';

const CurrentInventorySell = () => {
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

  const [currentInventory, setCurrentInventory] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const loading = useSelector((state) => state.loading);
  const { Title } = Typography;
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let mapCurrentInventory = [];

  // ! state debounced
  const [numberTicket, setNumberTicket] = useState(null);
  const [itemCode, setItemCode] = useState(null);
  const [itemName, setItemName] = useState(null);
  const debouncedNumberTicket = useDebounce(numberTicket, 500);
  const debouncedItemCode = useDebounce(itemCode, 500);
  const debouncedItemName = useDebounce(itemName, 500);

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchAgingReport = async () => {
      try {
        const data = {
          sortName: null,
          isAsc: true,
          page: page,
          pageCount: PageSize,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
          ma_San_Pham: debouncedItemCode || null,
          ten_San_Pham: debouncedItemName || null,
        };
        const response = await TonKhoApi.getListCurrentSell(data);
        setCurrentInventory(response.result);
        console.log(response.result);
        dispatch(Changeloading({ loading: false }));
        setTotal(response.total);
      } catch (error) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchAgingReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    debouncedNumberTicket,
    debouncedItemCode,
    debouncedItemName,
  ]);
  const columns = [
    {
      title: (
        <InputColumns
          fHandle={setItemCode}
          title="Mã Hàng"
          setpage={setpage}
        />
      ),
      dataIndex: 'ma_San_Pham',
      width: 120,
    },
    {
      title: (
        <InputColumns
          fHandle={setItemName}
          setpage={setpage}
        >
          <p
            style={{
              color: 'rgba(0, 0, 0, 0.88)',
              fontWeight: '600',
            }}
          >
            Tên Hàng
          </p>
        </InputColumns>
      ),
      dataIndex: 'ten_San_Pham',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (ten_San_Pham) => (
        <Tooltip
          placement="topLeft"
          title={ten_San_Pham}
        >
          <span style={{ color: '#3742fa', cursor: 'pointer' }}>
            {ten_San_Pham}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Tên ĐVT',
      dataIndex: 'ten_Don_Vi_Tinh',
      width: 70,
    },
    {
      title: 'Tồn Onhand',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien_Ton',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Ton} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong_Ton',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Luong_Ton} />,
            };
          },
        },
      ],
    },
    {
      title: 'Đơn đặt',
      children: [
        {
          title: 'Ctn',
          dataIndex: 'so_Kien_Don',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Kien_Don} />,
            };
          },
        },
        {
          title: 'Qty',
          dataIndex: 'so_Luong_Don',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.so_Luong_Don} />,
            };
          },
        },
      ],
    },
    {
      title: 'Đã Pick hàng',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'so_Kien_Xuat',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <div className="center-text">{record.so_Kien_Xuat}</div>
              ),
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'so_Luong_Xuat',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <div className="center-text">{record.so_Luong_Xuat}</div>
              ),
            };
          },
        },
      ],
    },
    {
      title: 'Xuất kho',
      children: [
        {
          title: 'Ctn',
          dataIndex: 'so_Kien_Ra_Kho',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <div className="center-text">{record.so_Kien_Ra_Kho}</div>
              ),
            };
          },
        },
        {
          title: 'Qty',
          dataIndex: 'so_Luong_Ra_Kho',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <div className="center-text">{record.so_Luong_Ra_Kho}</div>
              ),
            };
          },
        },
      ],
    },
    {
      title: 'Tồn kho đã trừ đơn đặt',
      children: [
        {
          title: 'Ctn',
          dataIndex: 'so_Kien_Con_Lai',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <div className="center-text">{record.so_Kien_Con_Lai}</div>
              ),
            };
          },
        },
        {
          title: 'Qty',
          dataIndex: 'so_Luong_Con_Lai',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: (
                <div className="center-text">{record.so_Luong_Con_Lai}</div>
              ),
            };
          },
        },
      ],
    },
    // {
    //   title: 'Kiện',
    //   dataIndex: 'so_Kien_Ton',
    //   width: 70,
    //   render(text, record) {
    //     return {
    //       props: {
    //         style: { background: 'rgba(112, 111, 211,0.3)' },
    //       },
    //       children: <CustomQuantity value={record.so_Kien_Ton} />,
    //     };
    //   },
    // },
    // {
    //   title: 'SL',
    //   dataIndex: 'so_Luong_Ton',
    //   width: 70,
    //   render(text, record) {
    //     return {
    //       props: {
    //         style: { background: 'rgba(112, 111, 211,0.3)' },
    //       },
    //       children: <CustomQuantity value={record.so_Luong_Ton} />,
    //     };
    //   },
    // },
    // {
    //   title: 'Đơn giá',
    //   dataIndex: 'don_Gia',
    //   width: 120,
    // },
    // {
    //   title: 'Ngày NK',
    //   dataIndex: 'ngay_Nhap_Kho',
    //   width: 110,
    // },
    // {
    //   title: 'Số Ngày Lưu Kho',
    //   dataIndex: 'so_Ngay_Luu_Kho',
    //   width: 90,
    //   render(text, record) {
    //     return {
    //       props: {
    //         style: { background: 'rgba(112, 111, 211,0.3)' },
    //       },
    //       children: <CustomQuantity value={record.so_Ngay_Luu_Kho} />,
    //     };
    //   },
    // },
    // {
    //   title: 'Số Ngày HSD',
    //   dataIndex: 'so_Ngay_HSD',
    //   width: 100,
    // },
    // {
    //   title: 'Mã Loại Hàng',
    //   dataIndex: 'ma_Loai_San_Pham',
    //   width: 100,
    // },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'Trang_Thai_Xuat_Kho_HTML',
    //   key: 'trang_thai_quet_barcode',
    //   // eslint-disable-next-line react/no-danger
    //   render: Trang_Thai_Xuat_Kho_HTML => <div dangerouslySetInnerHTML={createMarkup(Trang_Thai_Xuat_Kho_HTML)} />,
    // },
  ];

  if (currentInventory && currentInventory.length !== 0) {
    mapCurrentInventory = currentInventory.map((item, index) => ({
      key: index,
      ...item,
    }));
  }

  return (
    <>
      <Space>
        <CustomTitleAndColor level={2}>Tồn hiện tại</CustomTitleAndColor>
      </Space>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        // expandable={{
        //   rowExpandable: (record) => true,
        //   expandedRowRender: (record) => (
        //     <table>
        //       <thead className="ant-table-thead">
        //         <tr>
        //           <th className="ant-table-cell">GW</th>
        //           <th className="ant-table-cell">CBM</th>
        //           <th className="ant-table-cell">Ngày Hết Hạn</th>
        //           <th className="ant-table-cell">Life</th>
        //         </tr>
        //       </thead>
        //       <tr className="ant-table-row">
        //         <td>{record.gw}</td>
        //         <td>{record.cbm}</td>
        //         <td>{record.ngay_Het_Han}</td>
        //         <td>{record.life}</td>
        //       </tr>
        //     </table>
        //   ),
        // }}
        dataSource={mapCurrentInventory}
        scroll={{ x: 1200 }}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          pageSizeOptions: pageOption,
          position: position,
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
    </>
  );
};
export default CurrentInventorySell;
