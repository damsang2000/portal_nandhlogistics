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

const BorderedTable = () => {
  const { t } = useTranslation('common');

  return (
    <Col md={12} lg={12} xl={6}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{t('tables.basic_tables.bordered_table')}</CardTitle>
            <CardSubhead>
              Use default table with a prop <span className="red-text">bordered</span>
            </CardSubhead>
          </CardTitleWrap>
          <Table bordered responsive>
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
                  <td>{item.first}</td>
                  <td>{item.last}</td>
                  <td>{item.username}</td>
                  <td><Badge bg={item.status}>{item.badge}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BorderedTable;
