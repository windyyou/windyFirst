import React from 'react';
import { Route, IndexRoute } from 'react-router';
import New from '../containers/Volumes/New';
import Detail from '../components/Volumes/Detail';
import Volumes from '../components/Volumes';
import List from '../containers/Volumes/List';

export default (
  <Route path="volumes" component={Volumes}>
    <IndexRoute component={List} />
    <Route path="new" component={New} />
    <Route path=":key" component={Detail} />
  </Route>
);
