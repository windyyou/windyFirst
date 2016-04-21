import React from 'react';
import { Route, IndexRoute } from 'react-router';

import FloatingIps from '../components/FloatingIps';
import List from '../containers/FloatingIps/List';

export default (
  <Route path="/floating-ips" component={FloatingIps}>
    <IndexRoute component={List} />
  </Route>
);
