import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactVis from '../../../Charts/ReactVis/index';
import Recharts from '../../../Charts/Recharts/index';

const chart = () => (
  <Switch>
    <Route
      path="/charts/react_vis"
      component={ReactVis}
    />
    <Route
      path="/charts/recharts"
      component={Recharts}
    />
  </Switch>
);
export default chart;
