import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import SystemApi from '../../../../api/SystemApi';
import { useDebounce } from '../../../../hook';
import usePagination from '../../../../hook/usePagination';
import { Changeloading } from '../../../../redux/actions/loadingAction';
import ContenNoData from '../../../../shared/components/ContenNoData';
import CustomLoading from '../../../../shared/components/CustomLoading';
import CustomQuantity from '../../../../shared/components/CustomQuantity';
import InputColumns from '../../../../shared/components/InputColumns';
import {
  formarDateTimeddmmyyy,
  formatDateTime,
} from '../../../../shared/helpers';
import ModalDetailSystemExport from '../../SystemExportTable/ModalDetailSystemExport';

// eslint-disable-next-line react/prop-types
const ExportToday = (props) => {
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

  const [ExportTable, setExportTable] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const cookies = new Cookies();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [datadetail, setDataDetail] = useState([]);
  let mapExportTable = [];

  // eslint-disable-next-line react/prop-types
  // useImperativeHandle(ref, () => ({
  //   searchFilter() {
  //     setpage(1);
  //     dispatch(Changeloading({ loading: true }));
  //     fetch('http://api-stg.nandhlogistics.vn:2530/api/XuatNhapKhau/GetListPhieuXuatTrongNgay',
  //   {
  //     headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //     },
  //     method: 'POST',
  //     body: JSON.stringify({
  //         sortName: null,
  //         isAsc: true,
  //         page: page,
  //         pageCount: PageSize,
  //         // eslint-disable-next-line react/prop-types
  //         date: props.ImportExportToday,
  //         chu_Hang_ID: cookies.get('idchuhang'),
  //         kho_ID: 2631604,
  //         xem_Type_ID: 1,
  //       }),
  //     })
  //     .then(res => res.json())
  //     .then((data) => {
  //       setTotal(data.total);
  //       setExportTable(data.result);
  //       dispatch(Changeloading({ loading: false }));
  //     });
  //   },
  // }));

  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [market, setMarket] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedMarket = useDebounce(market, 500);

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchExportToday = async () => {
      try {
        const data = {
          sortName: null,
          isAsc: true,
          page: page,
          pageCount: PageSize,
          date: localStorage.getItem('dateimportexporttoday')
            ? localStorage.getItem('dateimportexporttoday')
            : // eslint-disable-next-line react/prop-types
              props.ImportExportToday,
          chu_Hang_ID: cookies.get('idchuhang'),
          kho_ID: 2631604,
          xem_Type_ID: 1,
          so_Phieu_Xuat_Kho: debouncedTicket || null,
          ten_Sieu_Thi_Full: debouncedMarket || null,
        };
        const response = await SystemApi.getSystemXuatInDay(data);
        setTotal(response.total);
        setExportTable(response.result);
        dispatch(Changeloading({ loading: false }));
      } catch (error) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchExportToday();
    return () => {
      setTotal(0);
      setExportTable([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    page,
    PageSize,
    props.ImportExportToday,
    debouncedTicket,
    debouncedMarket,
  ]);

  function createMarkup(trang_thai) {
    return { __html: trang_thai };
  }
  const columns = [
    {
      title: (
        <InputColumns
          fHandle={setNumberTicket}
          title="Số Phiếu"
          setpage={setpage}
        />
      ),
      dataIndex: 'so_Phieu_Xuat_Kho',
      key: 'so_Phieu_Xuat_Kho',
      width: 150,
      fixed: 'left',
      render: (text, record) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          className="style-hover"
          onClick={() => {
            setDataDetail(record);
            setOpen(true);
          }}
        >
          {record.so_Phieu_Xuat_Kho}
        </p>
      ),
      onFilter: (value, record) => record.so_Phieu_Xuat_Kho.includes(value),
    },
    {
      title: 'Ngày Xuất',
      dataIndex: 'ngay_Xuat_Kho',
      width: 150,
    },
    {
      title: 'Kế Hoạch',

      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien_Xuat',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien_Xuat} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong_Xuat',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong_Xuat} />,
            };
          },
        },
        {
          title: 'GW',
          dataIndex: 'gW_TT',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.gW_TT} />,
            };
          },
        },
        {
          title: 'CBM',
          dataIndex: 'cbM_TT',
          width: 60,
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.cbM_TT} />,
            };
          },
        },
      ],
    },
    {
      title: 'Đã Pick',

      children: [
        {
          title: 'Kiện',
          width: 60,
          dataIndex: 'tong_So_Kien_Pick',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_So_Kien_Pick}</div>,
            };
          },
        },
        {
          title: 'SL',
          width: 60,
          dataIndex: 'tong_So_Luong_Pick',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.tong_So_Luong_Pick}</div>,
            };
          },
        },
        {
          title: 'GW',
          width: 60,
          dataIndex: 'gW_KH',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.gW_KH}</div>,
            };
          },
        },
        {
          title: 'CBM',
          width: 60,
          dataIndex: 'cbM_KH',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <div>{record.cbM_KH}</div>,
            };
          },
        },
      ],
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'thoi_Diem_Auto_Pick_Hang',
      width: 150,
    },
    {
      title: 'Kết thúc',
      dataIndex: 'thoi_Diem_Ra_Khoi_Kho',
      width: 150,
    },
    {
      title: (
        <InputColumns
          fHandle={setMarket}
          title="Nơi xuất đến"
          setpage={setpage}
        />
      ),
      dataIndex: 'ten_Sieu_Thi_Full',
      width: 200,
    },

    // {
    //     title: 'Tên Hàng',
    //     dataIndex: 'Ten_San_Pham',
    //     width: 250,
    //     ellipsis: {
    //         showTitle: false,
    //       },
    //       render: Ten_San_Pham => (
    //         <Tooltip placement="topLeft" title={Ten_San_Pham}>
    //           {Ten_San_Pham}
    //         </Tooltip>
    //       ),
    // },
    // {
    //     title: 'Vị Trí',
    //     dataIndex: 'Ma_So_Vi_Tri',
    // },
    // {
    //     title: 'Người Tạo',
    //     dataIndex: 'Created_By',
    // },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'Trang_Thai_Nhap_Kho_Text',
    //   key: 'trang_thai_quet_barcode',
    //   // eslint-disable-next-line react/no-danger, consistent-return
    //   render: (Trang_Thai_Nhap_Kho_Text) => {
    //     if (Trang_Thai_Nhap_Kho_Text === 'Received') {
    //         return <span className="label label-primary">{Trang_Thai_Nhap_Kho_Text}</span>;
    //     }
    //     if (Trang_Thai_Nhap_Kho_Text === 'Complete') {
    //         return <span className="label label-success">{Trang_Thai_Nhap_Kho_Text}</span>;
    //     }
    //   },
    // },
  ];

  if (ExportTable && ExportTable.length !== 0) {
    mapExportTable = ExportTable.map((item, index) => ({
      key: index,
      ...item,
      ngay_Xuat_Kho: item.ngay_Xuat_Kho
        ? formarDateTimeddmmyyy(item.ngay_Xuat_Kho.slice(0, 10))
        : '',
      // eslint-disable-next-line max-len
      thoi_Diem_Auto_Pick_Hang: item.thoi_Diem_Auto_Pick_Hang
        ? `${formarDateTimeddmmyyy(item.thoi_Diem_Auto_Pick_Hang.slice(0, 10))}
       ${item.thoi_Diem_Auto_Pick_Hang.slice(11, 19)}`
        : '',
      // eslint-disable-next-line max-len
      thoi_Diem_Ra_Khoi_Kho: item.thoi_Diem_Ra_Khoi_Kho
        ? `${formarDateTimeddmmyyy(item.thoi_Diem_Ra_Khoi_Kho.slice(0, 10))}
       ${item.thoi_Diem_Ra_Khoi_Kho.slice(11, 19)}`
        : '',
    }));
  }

  return (
    <>
      <CustomLoading loading={loading.loading} />
      <Table
        columns={columns}
        bordered
        style={{ borderRadius: '20px' }}
        // expandable={{
        //   rowExpandable: (record) => true,
        //   expandedRowRender: (record) => (
        //     <table>
        //       <thead className="ant-table-thead">
        //         <tr>
        //           <th className="ant-table-cell">Bắt đầu</th>
        //           <th className="ant-table-cell">Kết thúc</th>
        //           <th className="ant-table-cell">Nơi Xuất Đến</th>
        //         </tr>
        //       </thead>
        //       <tr className="ant-table-row">
        //         <td>{record.thoi_Diem_Auto_Pick_Hang}</td>
        //         <td>{record.thoi_Diem_Ra_Khoi_Kho}</td>
        //         <td>{record.ten_Sieu_Thi_Full}</td>
        //       </tr>
        //     </table>
        //   ),
        // }}
        scroll={{ x: 1700 }}
        dataSource={mapExportTable}
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
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        //   scroll={{ x: 1000 }}
      />
      <ModalDetailSystemExport
        open={open}
        callBackCanCel={() => setOpen(false)}
        datefrom={
          localStorage.getItem('dateimportexporttoday')
            ? formatDateTime(localStorage.getItem('dateimportexporttoday'))
            : props.ImportExportToday
        }
        dateto={
          localStorage.getItem('dateimportexporttoday')
            ? formatDateTime(localStorage.getItem('dateimportexporttoday'))
            : props.ImportExportToday
        }
        title="Chi tiết phiếu xuất kho"
        id={datadetail.auto_ID}
        arrTrangThai={null}
        datadetail={datadetail}
      />
    </>
  );
};
export default ExportToday;
