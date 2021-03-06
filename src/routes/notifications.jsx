import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Notifications from '../components/Notifications';
import Detail from '../components/Notifications/Detail';
import List from '../containers/Notifications/List';

export default (
  <Route path="notifications" component={Notifications}>
    <IndexRoute component={List} />
    <Route path=":key" component={Detail} />
  </Route>
);
