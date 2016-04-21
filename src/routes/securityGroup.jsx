import React from 'react';
import { Route, IndexRoute } from 'react-router';

import SecurityGroups from '../components/SecurityGroups';
import List from '../containers/SecurityGroups/List';

export default (
  <Route path="/security-groups" component={SecurityGroups}>
    <IndexRoute component={List} />
  </Route>

);
