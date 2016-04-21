import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Subnets from '../components/Subnets';
import List from '../containers/Subnets/List';

export default (
  <Route path="/subnets" component={Subnets}>
    <IndexRoute component={List} />
  </Route>
);
