import React from 'react';
import { Route, IndexRoute } from 'react-router';

import VirtualNics from '../components/VirtualNics';
import List from '../containers/VirtualNics/List';

export default (
  <Route path="/virtual-nics" component={VirtualNics}>
    <IndexRoute component={List} />
  </Route>
);
