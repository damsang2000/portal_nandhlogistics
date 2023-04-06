import { Space, Table, Tooltip, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import TonKhoApi from '../../../api/TonKhoApi';
import { useDebounce } from '../../../hook';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import CustomQuantity from '../../../shared/components/CustomQuantity';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import ExportExcelInventory from '../../../shared/components/ExportExcelInventory';
import InputColumns from '../../../shared/components/InputColumns';
import ModalCurrentInventory from './Modal/ModalCurrentInventory';

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
  const idKho = useSelector((state) => state.idKho);
  const [open, setOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const [all, setAll] = useState(false);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let mapCurrentInventory = [];

  // ! state debounced
  const [numberTicket, setNumberTicket] = useState(null);
  const [productID, setProductID] = useState([]);
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
          chu_Hang_ID: all ? null : cookies.get('idchuhang'),
          kho_ID: Number(localStorage.getItem('kho_id')),
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
    idKho.idKho,
    page,
    PageSize,
    debouncedNumberTicket,
    debouncedItemCode,
    debouncedItemName,
    all,
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
      width: 150,
      fixed: 'left',
      render: (text, record, index) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => {
            setProductID(record.auto_ID);
            setOpen(true);
          }}
          className="style-hover"
        >
          {record.ma_San_Pham}
        </p>
      ),
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
      width: 100,
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
  ];

  if (currentInventory && currentInventory.length !== 0) {
    mapCurrentInventory = currentInventory.map((item, index) => ({
      key: index,
      ...item,
    }));
  }

  return (
    <>
      <Space direction="vertical">
        <CustomTitleAndColor level={2}>Tồn hiện tại</CustomTitleAndColor>
        <Space
          style={{
            marginBottom: '10px',
          }}
          direction="vertical"
        >
          <CustomTitleAndColor level={4}>Xuất file</CustomTitleAndColor>
          <ExportExcelInventory
            page={page}
            pageCount={PageSize}
            chu_Hang_ID={all ? null : cookies.get('idchuhang')}
            kho_ID={Number(localStorage.getItem('kho_id'))}
            ma_San_Pham={debouncedItemCode || null}
            ten_San_Pham={debouncedItemName || null}
            filename="bao_cao_ton_kho"
          />
        </Space>
      </Space>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
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
      <ModalCurrentInventory
        open={open}
        setCloseOpen={() => setOpen(false)}
        productID={productID}
      />
    </>
  );
};
export default CurrentInventorySell;
