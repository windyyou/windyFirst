import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { scrollToLeftTop } from '../utils/domUtils';

import App from './../containers/App';
import Dashboard from './../components/Dashboard';

import Instances from './instances';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} onLeave={scrollToLeftTop} />
    {Instances}
  </Route>
);
