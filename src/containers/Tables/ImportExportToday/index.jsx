import { Button, DatePicker, Radio, Space, Tabs } from 'antd';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import useFormatDate from '../../../hook/useFormatDate';
import { CustomTitleAndColor } from '../../../shared/components/CustomTitle';
import { formarDateTimeddmmyyy, formatDateTime } from '../../../shared/helpers';
import ExportToday from './components/ExportToday';
import ImportToday from './components/ImportToday';

const ImportExportToday = () => {
  //! hook custom 7 date
  const [todayformat, todayformat7day, dateFormat1, date, dateFormat] =
    useFormatDate(7);
  // ? state component
  const childRef = useRef(null);

  // ? date

  const [DateImportExport, setDateImportExport] = useState(dateFormat1);
  // ? format date

  // ? onchage format value
  const onChangeValue = (value, dateString) => {
    const dateFormatImportExportToday = formatDateTime(dateString);
    localStorage.setItem('dateimportexporttoday', dateFormatImportExportToday);
  };

  const handlePropsDate = () => {
    setDateImportExport(localStorage.getItem('dateimportexporttoday'));
  };

  // ? array tab item
  const items = [
    {
      label: 'Nhập Kho',
      key: 1,
      children: (
        <ImportToday
          ref={childRef}
          ImportExportToday={DateImportExport}
        />
      ),
    },
    {
      label: 'Xuất Kho',
      key: 2,
      children: (
        <ExportToday
          ref={childRef}
          ImportExportToday={DateImportExport}
        />
      ),
    },
  ];

  return (
    <Container>
      <CustomTitleAndColor level={2}>
        Tình hình nhập xuất trong ngày
      </CustomTitleAndColor>
      <Space direction="vertical">
        <Space>
          <CustomTitleAndColor level={5}>Ngày</CustomTitleAndColor>
        </Space>
        <Space
          direction="horizontal"
          style={{ marginBottom: '10px' }}
        >
          <DatePicker
            className="createDateRangePicker"
            popupClassName="createDateRangePicker"
            defaultValue={
              localStorage.getItem('dateimportexporttoday')
                ? dayjs(
                    formarDateTimeddmmyyy(
                      localStorage.getItem('dateimportexporttoday')
                    ),
                    dateFormat
                  )
                : dayjs(date, dateFormat)
            }
            format={dateFormat}
            onChange={onChangeValue}
          />
          <Radio.Group
            style={{
              border: '1px solid #d9d9d9',
              padding: '4px 5px',
              borderRadius: '6px',
              backgroundColor: 'white',
            }}
            defaultValue="1"
          >
            <Radio
              value="1"
              className="custom-radio"
            >
              Ngày xuất
            </Radio>
            <Radio
              value="2"
              className="custom-radio"
            >
              Ngày ra kho
            </Radio>
          </Radio.Group>
          <Button
            type="primary"
            danger
            className="custom-button1"
            onClick={handlePropsDate}
          >
            Tìm kiếm
          </Button>
        </Space>
      </Space>
      <Row>
        <Tabs
          type="card"
          items={items}
        />
      </Row>
    </Container>
  );
};

export default ImportExportToday;
