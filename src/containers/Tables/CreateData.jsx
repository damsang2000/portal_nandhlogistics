import React, { useMemo } from 'react';

const CreateTableData = () => {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        disableGlobalFilter: true,
        width: 65,
      },
      {
        Header: 'Mã Hàng',
        accessor: 'first',
      },
      {
        Header: 'Mã SP NCC',
        accessor: 'last',
        disableGlobalFilter: true,
      },
      {
        Header: 'Barcode Thùng',
        accessor: 'user',
        disableGlobalFilter: true,
      },
      {
        Header: 'Tên Hàng',
        accessor: 'user1',
        disableGlobalFilter: true,
        width: 200,
      },
      {
        Header: 'Loại Hàng',
        accessor: 'user2',
        disableGlobalFilter: true,
      },
      {
        Header: 'ĐVT',
        accessor: 'dvt',
        disableGlobalFilter: true,
      },
      {
        Header: 'ĐVT thùng',
        accessor: 'dvtthung',
        disableGlobalFilter: true,
      },
      {
        Header: 'QC Thùng',
        accessor: 'qc_thung',
        disableGlobalFilter: true,
      },
      {
        Header: 'QC Pallet',
        accessor: 'qc_pallet',
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: 'GW',
        accessor: 'gw',
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: 'NW',
        accessor: 'nw',
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: 'CBM',
        accessor: 'cbm',
        disableGlobalFilter: true,
        disableSortBy: true,
      },
    ],
    [],
  );

  const getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  const data = [];
  const rows = () => {
    for (let i = 1; i < 36; i += 1) {
      data.push({
        id: i,
        first: ['TDX3042', 'TDX3041  ', 'TDX3046'][Math.floor((Math.random() * 3))],
        last: ['Morrison', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
        user: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
        user1: ['Thang Dắt Xe Thông Minh 30x42CM', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
        user2: ['Gia Dụng', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
        dvt: ['Cái', 'Chiếc', 'Máy'][Math.floor((Math.random() * 3))],
        dvtthung: ['Chiếc', 'Thùng', 'Carton'][Math.floor((Math.random() * 3))],
        qc_thung: ['1', '2', '3', '4'][Math.floor((Math.random() * 4))],
        qc_pallet: ['88,888', '99,999', '99,999'][Math.floor((Math.random() * 3))],
        gw: '',
        nw: '',
        cbm: '',
      });
    }
  };

  rows();
  const reactTableData = { tableHeaderData: columns, tableRowsData: data };
  return reactTableData;
};

export default CreateTableData;
