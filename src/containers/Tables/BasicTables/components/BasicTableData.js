const BasicTableData = () => {
  const header = [
    { id: 1, title: '#' },
    { id: 2, title: 'Id' },
    { id: 3, title: 'Mã Hàng' },
    { id: 4, title: 'Mã SP NCC' },
    { id: 5, title: 'Barcode Thùng' },
    { id: 6, title: 'Tên Hàng' },
    { id: 7, title: 'Loại Hàng' },
    { id: 8, title: 'ĐVT' },
    { id: 9, title: 'ĐVT thùng' },
    { id: 9, title: 'QC thùng' },
    { id: 9, title: 'QC Pallet' },

  ];

  const headerResponsive = [
    { id: 1, title: '#' },
    { id: 2, title: 'First Name' },
    { id: 3, title: 'Last Name' },
    { id: 4, title: 'Username' },
    { id: 5, title: 'Age' },
    { id: 7, title: 'Date' },
    { id: 8, title: 'Location' },
    { id: 9, title: 'Status' },
  ];

  const rows = [{
    id: 1,
    auto_id: '16564277',
    ma_hang: 'TDX3042',
    ma_sp_ncc: '',
    barcode_thung: '',
    ten_hang: 'Thang Dắt Xe Thông Minh 30x42CM',
    loai_hang: 'Gia Dụng',
    dvt: 'cái',
    dvt_thung: 'chiếc',
    qc_thung: 1,
    qc_pallet: 1,
  }, {
    id: 2,
    auto_id: '16564277',
    ma_hang: 'TDX3042',
    ma_sp_ncc: '',
    barcode_thung: '',
    ten_hang: 'Thang Dắt Xe Thông Minh 30x42CM',
    loai_hang: 'Gia Dụng',
    dvt: 'cái',
    dvt_thung: 'chiếc',
  }, {
    id: 3,
    auto_id: '16564277',
    ma_hang: 'TDX3042',
    ma_sp_ncc: '',
    barcode_thung: '',
    ten_hang: 'Thang Dắt Xe Thông Minh 30x42CM',
    loai_hang: 'Gia Dụng',
    dvt: 'cái',
    dvt_thung: 'chiếc',
  }];

  const basicTableData = { tableHeaderData: header, tableHeaderResponsiveData: headerResponsive, tableRowsData: rows };
  return basicTableData;
};

export default BasicTableData;
