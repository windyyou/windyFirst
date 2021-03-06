import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Backups from '../components/Backups';
import List from '../containers/Backups/List';
import Detail from '../components/Backups/Detail';

export default(
  <Route path="backups" component={Backups}>
    <IndexRoute component={List} />
    <Route path=":key" component={Detail} />
  </Route>
);
