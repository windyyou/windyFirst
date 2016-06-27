import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Subnets from '../components/Subnets';
import New from '../containers/Subnets/New';
import List from '../containers/Subnets/List';
import Detail from '../components/Subnets/Detail';

export default (
  <Route path="subnets" component={Subnets}>
    <IndexRoute component={List} />
    <Route path="new" component={New} />
    <Route path=":key" component={Detail} />
  </Route>
);
