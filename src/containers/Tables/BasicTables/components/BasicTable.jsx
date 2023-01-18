import React from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '@/shared/components/Badge';
import { Col } from 'react-bootstrap';
import {
  Card, CardBody, CardTitleWrap, CardTitle, CardSubhead,
} from '@/shared/components/Card';
import { Table } from '@/shared/components/TableElements';
import BasicTableData from './BasicTableData';

const { tableHeaderData, tableRowsData } = BasicTableData();

const BasicTable = () => {
  const { t } = useTranslation('common');

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{t('tables.basic_tables.basic_table')}</CardTitle>
            {/* <CardSubhead>Use default table</CardSubhead> */}
          </CardTitleWrap>
          <Table responsive hover>
            <thead>
              <tr>
                {tableHeaderData.map(item => (
                  <th key={item.id}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRowsData.map(item => (
                <tr key={item.id}>    
                  <td>{item.id}</td>
                  <td>{item.auto_id}</td>
                  <td>{item.ma_hang}</td>
                  <td>{item.ma_sp_ncc}</td>
                  <td>{item.barcode_thung}</td>
                  <td>{item.ten_hang}</td>
                  <td>{item.loai_hang}</td>
                  <td>{item.dvt}</td>
                  <td>{item.dvt_thung}</td>
                  <td>{item.qc_thung}</td>
                  <td>{item.qc_pallet}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicTable;
