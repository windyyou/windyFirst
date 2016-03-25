import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { scrollToLeftTop } from '../utils/domUtils';

import InstanceRoutes from './instances';

import App from '../containers/App';
import Dashboard from '../containers/Dashboard';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} onLeave={scrollToLeftTop} />
    {InstanceRoutes}
  </Route>
);
