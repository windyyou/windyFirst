import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Snapshots from '../components/Snapshots';
import List from '../containers/Snapshots/List';

export default(
  <Route path="/snapshots" component={Snapshots}>
    <IndexRoute component={List} />
  </Route>
);
