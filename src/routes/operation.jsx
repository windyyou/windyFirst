import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Operations from '../components/Operations';
import List from '../containers/Operations/List.jsx';
import Detail from '../components/Operations/Detail';

export default(
  <Route path="operations" component={Operations}>
    <IndexRoute component={List} />
    <Route path=":key" component={Detail} />
  </Route>
);
