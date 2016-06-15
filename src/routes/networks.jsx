import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Networks from '../components/Networks';
import List from '../containers/Networks/List';
import Detail from '../components/Networks/Detail';
import New from '../containers/Networks/New';

export default (
  <Route path="networks" component={Networks}>
    <IndexRoute component={List} />
    <Route path="new" component={New} />
    <Route path=":key" component={Detail} />
  </Route>
);
