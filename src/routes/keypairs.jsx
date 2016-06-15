import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Keypairs from '../components/Keypairs';
import List from '../containers/Keypairs/List';

export default (
  <Route path="keypairs" component={Keypairs}>
    <IndexRoute component={List} />
  </Route>
);
