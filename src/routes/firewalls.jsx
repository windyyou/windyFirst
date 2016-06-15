import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Firewalls from '../components/Firewalls';
import List from '../containers/Firewalls/List.jsx';

export default(
  <Route path="firewalls" component={Firewalls}>
    <IndexRoute component={List} />
  </Route>
);
