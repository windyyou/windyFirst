import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Users from '../components/Users';
import List from '../containers/Users/List';
import Detail from '../components/Users/Detail';

export default (
  <Route path="users" component={Users}>
    <IndexRoute component={List} />
    <Route path=":key" component={Detail} />
  </Route>
);
