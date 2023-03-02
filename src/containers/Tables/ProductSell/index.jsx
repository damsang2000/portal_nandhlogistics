import { Space, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import TonKhoApi from '../../../api/TonKhoApi';
import { useDebounce } from '../../../hook';
import usePagination from '../../../hook/usePagination';
import { Changeloading } from '../../../redux/actions/loadingAction';
import ContenNoData from '../../../shared/components/ContenNoData';
import CustomLoading from '../../../shared/components/CustomLoading';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import InputColumns from '../../../shared/components/InputColumns';

const ProductSell = () => {
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
      width: 50,
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
      width: 200,
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
      width: 30,
    },
    {
      title: 'Số lượng còn lại',
      dataIndex: 'so_Luong_Con_Lai',
      width: 30,
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
    {
      title: 'Mã loại sản phẩm',
      dataIndex: 'ma_Loai_San_Pham',
      width: 50,
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
      <Space>
        <CustomTitleAndColor level={2}>Sản phẩm đang bán</CustomTitleAndColor>
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
export default ProductSell;
