import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';

import LogIn from '../../Account/LogIn/index';
import WrappedRoutes from './WrappedRoutes';
import Congratulations from '../../Tables/Congratulations/Congratulations';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route
          exact
          path="/"
          component={LogIn}
        />
        <Route
          exact
          path="/congratulations"
          component={Congratulations}
        />
        <Route
          path="/"
          component={WrappedRoutes}
        />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
