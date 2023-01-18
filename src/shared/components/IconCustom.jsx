import styled from 'styled-components';
import { MenuOutlined } from '@ant-design/icons';

// eslint-disable-next-line import/prefer-default-export
export const IconCustom = styled(MenuOutlined)`
  display: inline-block;
  cursor: pointer;
  font-size:18px;
  width: 100%;
  &:hover{
    color: red;
  }
`;

