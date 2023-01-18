import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import TableEditAntd from './components/TableEditAntd';

const BasicTables = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('tables.basic_tables.title')}</h3>
          {/* <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
            information
          </h3> */}
        </Col>
      </Row>
      <Row>
        <TableEditAntd />
        {/* <BorderedTable />
        <HeadAccentTable />
        <ColoredStringTable />
        <ResponsiveTable /> */}
      </Row>
    </Container>
  );
};

export default BasicTables;
