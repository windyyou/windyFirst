import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotificationLists from '../components/NotificationLists';
import Detail from '../components/NotificationLists/Detail';
import List from '../containers/NotificationLists/List';
import New from '../containers/NotificationLists/New';

export default (
  <Route path="notification-lists" component={NotificationLists}>
    <IndexRoute component={List} />
    <Route path="new" component={New} />
    <Route path=":key" component={Detail} />
  </Route>
);
