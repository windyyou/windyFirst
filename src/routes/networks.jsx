import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Networks from '../components/Networks';
import List from '../containers/Networks/List';

export default (
  <Route path="/networks" component={Networks}>
    <IndexRoute component={List} />
  </Route>
);
