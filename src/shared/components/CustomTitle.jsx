/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Typography } from 'antd';
import { colorText } from '@/utils/palette';

const { Title } = Typography;

export const CustomTitle = styled(Title)`
  display: flex !important;
  align-items: center;
  margin-bottom: 0px !important;
  color: #34495e !important;
  font-size: 15px !important;
`;

export const CustomTitleAndColor = styled(Title)`
  color: ${colorText} !important;
`;
