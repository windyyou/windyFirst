import React from 'react';
import { Route, IndexRoute } from 'react-router';

import SecurityGroups from '../components/SecurityGroups';
import List from '../containers/SecurityGroups/List';
import New from '../containers/SecurityGroups/New';

export default (
  <Route path="security-groups" component={SecurityGroups}>
    <IndexRoute component={List} />
    <Route path="new" component={New} />
  </Route>

);
