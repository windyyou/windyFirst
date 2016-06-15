import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Backups from '../components/Bills';
import List from '../containers/Bills/List';

export default(
  <Route path="bills" component={Backups}>
    <IndexRoute component={List} />
  </Route>
);
