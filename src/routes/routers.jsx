import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Routers from '../components/Routers';
import List from '../containers/Routers/List';
import Detail from '../components/Routers/Detail';

export default(
  <Route path="routers" component={Routers}>
    <IndexRoute component={List} />
    <Route path=":key" component={Detail} />
  </Route>
);
