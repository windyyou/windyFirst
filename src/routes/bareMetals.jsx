import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BareMetals from '../components/BareMetals';
import List from '../containers/BareMetals/List';

export default (
  <Route path="bare-metals" component={BareMetals}>
    <IndexRoute component={List} />
  </Route>
);
