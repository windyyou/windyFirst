import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotificationLists from '../components/NotificationLists';
import List from '../containers/NotificationLists/List';

export default (
  <Route path="/notification-lists" component={NotificationLists}>
    <IndexRoute component={List} />
  </Route>
);
