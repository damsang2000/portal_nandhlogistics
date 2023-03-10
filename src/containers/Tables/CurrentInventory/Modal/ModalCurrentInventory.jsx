import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import TonKhoApi from '../../../../api/TonKhoApi';
import Cookies from 'universal-cookie';
import InputColumns from '../../../../shared/components/InputColumns';
import usePagination from '../../../../hook/usePagination';
import { useDebounce } from '../../../../hook';
import ContenNoData from '../../../../shared/components/ContenNoData';
import { formarDateTimeddmmyyy } from '../../../../shared/helpers';
import CustomQuantity from '../../../../shared/components/CustomQuantity';

const ModalCurrentInventory = ({ open, setCloseOpen, productID }) => {
  const cookies = new Cookies();
  const [currentInventoryDetail, setCurrentInventoryDetail] = useState([]);
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const itemCodeDebounced = useDebounce(itemCode, 500);
  const itemNameDebounced = useDebounce(itemName, 500);
  let mapCurrentInventory = [];
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
    if (productID) {
      const data = {
        sortName: null,
        isAsc: false,
        page: page,
        pageCount: PageSize,
        chu_Hang_ID: cookies.get('idchuhang'),
        kho_ID: Number(localStorage.getItem('kho_id')),
        san_Pham_ID: productID,
        so_Phieu_Xuat_Kho: null,
        ngay_Xuat_Kho: null,
        ma_San_Pham: itemCodeDebounced,
        ten_San_Pham: itemNameDebounced,
        so_AWB: null,
      };

      const fetchCurrentInventoryDetail = async () => {
        const response = await TonKhoApi.getListCurrentSellDetail(data);
        setTotal(response.total);
        setCurrentInventoryDetail(response.result);
      };
      fetchCurrentInventoryDetail();

      return () => {};
    }
  }, [productID, itemCodeDebounced, itemNameDebounced]);

  if (currentInventoryDetail && currentInventoryDetail.length !== 0) {
    mapCurrentInventory = currentInventoryDetail.map((item, index) => ({
      key: index,
      ...item,
      ngay_Xuat_Kho: formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10)),
    }));
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'auto_ID',
      width: 100,
    },
    {
      title: 'S??? phi???u',
      dataIndex: 'so_Phieu_Xuat_Kho',
      width: 130,
    },
    {
      title: 'Ng??y xu???t',
      dataIndex: 'ngay_Xuat_Kho',
      width: 130,
    },
    {
      title: 'Master Do',
      dataIndex: 'so_DO_Tong',
      width: 130,
    },
    {
      title: 'S??? AWB',
      dataIndex: 'so_AWB',
      width: 100,
    },
    {
      title: (
        <InputColumns
          fHandle={setItemCode}
          title="M?? SP"
          setpage={setpage}
        />
      ),
      dataIndex: 'ma_San_Pham',
      width: 100,
    },
    {
      title: (
        <InputColumns
          fHandle={setItemName}
          title="T??n H??ng"
          setpage={setpage}
        />
      ),
      dataIndex: 'ten_San_Pham',
      width: 150,
    },
    {
      title: 'N??i Xu???t ?????n',
      dataIndex: 'ten_Sieu_Thi',
      width: 100,
    },
    {
      title: 'Ki???n',
      dataIndex: 'so_Kien_Xuat',
      width: 50,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.so_Kien_Xuat} />,
        };
      },
    },
    {
      title: 'SL',
      dataIndex: 'so_Luong_Xuat',
      width: 50,
      render(text, record) {
        return {
          props: {
            style: { background: 'rgba(112, 111, 211,0.3)' },
          },
          children: <CustomQuantity value={record.so_Luong_Xuat} />,
        };
      },
    },
    {
      title: 'T??n ??VT',
      dataIndex: 'ten_Don_Vi_Tinh',
      width: 50,
    },
  ];
  return (
    <Modal
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
      className="custom-modal"
      title="T???n kho ???? tr??? ????n ?????t chi ti???t"
      open={open}
      footer={null}
      onCancel={setCloseOpen}
    >
      <Table
        columns={columns}
        dataSource={mapCurrentInventory}
        locale={{
          emptyText: <ContenNoData desc="Kh??ng c?? d??? li???u" />,
        }}
        pagination={{
          total: Total,
          onChange: getData,
          current: page,
          pageSize: PageSize,
          onShowSizeChange: getDataSize,
          position: position,
          pageSizeOptions: pageOption,
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

export default ModalCurrentInventory;
