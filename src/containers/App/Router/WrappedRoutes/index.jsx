import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { colorBackgroundBody } from '@/utils/palette';
import { paddingLeft } from '@/utils/directions';
import Layout from '../../../Layout/index';
import OnLineMarketingDashboard from '../../../Dashboards/OnLineMarketing/index';
import Tables from './Tables';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <>
      <Layout />
      <ContainerWrap>
        <Route
          path="/dashboard"
          component={OnLineMarketingDashboard}
        />
        <Route
          path="/nh"
          component={Tables}
        />
      </ContainerWrap>
    </>
  );
};

// region STYLES

const ContainerWrap = styled.div`
  padding-top: 90px;
  min-height: 100vh;
  transition: padding-left 0.3s;

  ${paddingLeft}: 0;

  background: ${colorBackgroundBody};

  @media screen and (min-width: 576px) {
    ${paddingLeft}: 250px;
  }

  @media screen and (max-width: 576px) {
    padding-top: 150px;
  }
`;

// endregion
