import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Routers from '../components/Routers';
import List from '../containers/Routers/List';

export default(
  <Route path="/routers" component={Routers}>
    <IndexRoute component={List} />
  </Route>
);
