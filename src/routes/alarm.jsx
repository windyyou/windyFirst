import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Alarms from '../components/Alarms';
import List from '../containers/Alarms/List';

export default(
  <Route path="/alarms" component={Alarms}>
    <IndexRoute component={List} />
  </Route>
);
