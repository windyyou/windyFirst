import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { scrollToLeftTop } from '../utils/domUtils';

import Instances from '../components/Instances';
import List from '../containers/Instances/List';
import Detail from '../components/Instances/Detail';
import New from '../components/Instances/New';
import Step1 from '../components/Instances/New/Step1';
import Step2 from '../components/Instances/New/Step2';
import Step3 from '../components/Instances/New/Step3';

export default (
  <Route path="/instances" component={Instances}>
    <IndexRoute component={List} onLeave={scrollToLeftTop} />
    <Route path="new" component={New} onLeave={scrollToLeftTop}>
      <IndexRoute component={Step1} />
      <Route path="step-1" component={Step1} />
      <Route path="step-2" component={Step2} />
      <Route path="step-3" component={Step3} />
    </Route>
    <Route path=":key" component={Detail} onLeave={scrollToLeftTop} />
  </Route>
);
