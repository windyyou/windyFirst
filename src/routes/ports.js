import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Ports from '../components/Ports';
import List from '../containers/Ports/List';
import Detail from '../components/Ports/Detail';

export default (
  <Route path="ports" component={Ports}>
    <IndexRoute component={List} />
    <Route path=":key" component={Detail} />
  </Route>
);
