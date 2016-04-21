import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Disks from '../components/Disks';
import List from '../containers/Disks/List';

export default (
  <Route path="/disks" component={Disks}>
    <IndexRoute component={List} />
  </Route>
);
