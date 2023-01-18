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
import ModalDetailAsn from '../../../../shared/components/ModalDetailAsn';
import {
  formarDateTimeddmmyyy,
  formatDateTime,
} from '../../../../shared/helpers';

// eslint-disable-next-line react/prop-types
const ImportToday = (props) => {
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

  const [ImportTable, setImportTable] = useState([]);
  const idchuhang = useSelector((state) => state.idchuhang);
  const cookies = new Cookies();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  let mapImportTable = [];

  // ? state filter
  const [numberTicket, setNumberTicket] = useState(null);
  const [maNCC, setMaNCC] = useState(null);

  // ? state debounced
  const debouncedTicket = useDebounce(numberTicket, 500);
  const debouncedNCC = useDebounce(maNCC, 500);

  // ?
  const [dataDetail, setdataDetail] = useState([]);

  // ! state modal
  const [openModalDetail, setopenModalDetail] = useState(false);

  useEffect(() => {
    dispatch(Changeloading({ loading: true }));
    const fetchImportToday = async () => {
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
          ma_NCC: debouncedNCC || null,
          so_Phieu_Nhap_Kho: debouncedTicket || null,
        };
        const response = await SystemApi.getSystemNhapInDay(data);
        setTotal(response.total);
        setImportTable(response.result);
        dispatch(Changeloading({ loading: false }));
      } catch (err) {
        dispatch(Changeloading({ loading: false }));
      }
    };
    fetchImportToday();
    return () => {
      setTotal(0);
      setImportTable([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idchuhang.idchuhang,
    props.ImportExportToday,
    debouncedNCC,
    debouncedTicket,
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
      dataIndex: 'so_Phieu_Nhap_Kho',
      key: 'so_Phieu_Nhap_Kho',
      width: 150,
      render: (text, record) => (
        <p
          style={{ color: '#ff4861', fontWeight: 'bold', cursor: 'pointer' }}
          c
          className="style-hover"
          onClick={() => {
            setdataDetail(record);
            setopenModalDetail(true);
          }}
        >
          {record.so_Phieu_Nhap_Kho}
        </p>
      ),
    },
    {
      title: 'Ngày NK',
      dataIndex: 'ngay_Nhap_Kho',
      width: 150,
    },

    {
      title: 'Chứng Từ',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(112, 111, 211,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong} />,
            };
          },
        },
        {
          title: 'GW',
          dataIndex: 'gW_TT',
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
      title: 'Thực Nhận',
      children: [
        {
          title: 'Kiện',
          dataIndex: 'tong_So_Kien_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Kien_Receive} />,
            };
          },
        },
        {
          title: 'SL',
          dataIndex: 'tong_So_Luong_Receive',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.tong_So_Luong_Receive} />,
            };
          },
        },
        {
          title: 'GW',
          dataIndex: 'gW_KH',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.gW_KH} />,
            };
          },
        },
        {
          title: 'CBM',
          dataIndex: 'cbM_KH',
          render(text, record) {
            return {
              props: {
                style: { background: 'rgba(255, 218, 121,0.3)' },
              },
              children: <CustomQuantity value={record.cbM_KH} />,
            };
          },
        },
      ],
    },
    {
      title: (
        <InputColumns
          fHandle={setMaNCC}
          title="Mã NCC"
          setpage={setpage}
        />
      ),
      dataIndex: 'ma_NCC',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_Thai_Nhap_Kho_Text',
      key: 'trang_thai_quet_barcode',
      // eslint-disable-next-line react/no-danger, consistent-return
      render: (trang_Thai_Nhap_Kho_Text) => {
        if (trang_Thai_Nhap_Kho_Text === 'Received') {
          return (
            <span className="label label-primary">
              {trang_Thai_Nhap_Kho_Text}
            </span>
          );
        }
        if (trang_Thai_Nhap_Kho_Text === 'Complete') {
          return (
            <span className="label label-success">
              {trang_Thai_Nhap_Kho_Text}
            </span>
          );
        }
        if (trang_Thai_Nhap_Kho_Text === 'Putaway') {
          return (
            <span className="label label-putaway">
              {trang_Thai_Nhap_Kho_Text}
            </span>
          );
        }
      },
    },
  ];

  if (ImportTable && ImportTable.length !== 0) {
    mapImportTable = ImportTable.map((item, index) => ({
      key: index,
      ...item,
      ngay_Nhap_Kho: item.ngay_Nhap_Kho
        ? formarDateTimeddmmyyy(item.ngay_Nhap_Kho.slice(0, 10))
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
        locale={{
          emptyText: <ContenNoData desc="Không có dữ liệu" />,
        }}
        expandable={{
          rowExpandable: (record) => true,
          expandedRowRender: (record) => (
            <table>
              <thead className="ant-table-thead">
                <tr>
                  <th className="ant-table-cell">GW</th>
                  <th className="ant-table-cell">NW</th>
                  <th className="ant-table-cell">CBM</th>
                </tr>
              </thead>
              <tr className="ant-table-row">
                <td>{record.tong_GW}</td>
                <td>{record.tong_NW}</td>
                <td>{record.tong_CBM}</td>
              </tr>
            </table>
          ),
        }}
        dataSource={mapImportTable}
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
        //   scroll={{ x: 1000 }}
      />
      <ModalDetailAsn
        open={openModalDetail}
        id={dataDetail.auto_ID}
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
        arrTrangThai={[1, 3]}
        title="Chi tiết phiếu nhập kho"
        datadetail={dataDetail}
        callBackCanCel={() => setopenModalDetail(false)}
      />
    </>
  );
};
export default ImportToday;
