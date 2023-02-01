import { Select, Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { marginLeft, right, left } from '@/utils/directions';
import { CustomSpan } from '../../../../shared/components/CustomSpan';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const TopbarKho = ({ refCurrent }) => {
  const { Option } = Select;
  return (
    <Space>
      <CustomSpan>Kho</CustomSpan>
      <Select
        defaultValue="1123"
        style={{
          width: 200,
          marginRight: '10px',
        }}
        className="select-custom"
        popupClassName="select-custom"
        onChange={handleChange}
      >
        <Option value="1123">An Phú Đông</Option>
      </Select>
    </Space>
  );
};

export default TopbarKho;

export const TopbarProfileWrap = styled.div`
  position: relative;
  margin-bottom: 0;
  ${marginLeft}: 0;

  @media screen and (max-width: 576px) {
    margin: inherit;
  }

  @media screen and (max-width: 320px) {
    margin: auto 0;
  }
`;
