import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Templates from '../components/Templates';
import List from '../containers/Templates/List';
import New from '../containers/Templates/New';

export default (
  <Route path="templates" component={Templates}>
    <IndexRoute component={List} />
    <Route path="new" component={New} />
  </Route>
);
