import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Pools from '../components/Pools';
import List from '../containers/Pools/List';
import stackNew from '../containers/Pools/Stacks/New';
import stackStep1 from '../components/Pools/Stacks/New/Step1';
import stackStep2 from '../components/Pools/Stacks/New/Step2';
import stackStep3 from '../components/Pools/Stacks/New/Step3';
import stackStep4 from '../components/Pools/Stacks/New/Step4';
import stackDetail from '../components/Pools/Stacks/Detail';
import New from '../containers/Pools/New';
import Step1 from '../components/Pools/New/Step1';
import Step2 from '../components/Pools/New/Step2';

export default (
  <Route path="pools" component={Pools}>
    <IndexRoute component={List} />
    <Route path="new" component={New}>
      <IndexRoute component={Step1} />
      <Route path="step-1" component={Step1} />
      <Route path="step-2" component={Step2} />
    </Route>
    <Route path=":poolId/stacks/new" component={stackNew}>
      <IndexRoute component={stackStep1} />
      <Route path="step-1" component={stackStep1} />
      <Route path="step-2" component={stackStep2} />
      <Route path="step-3" component={stackStep3} />
      <Route path="step-4" component={stackStep4} />
    </Route>
    <Route path=":poolId/stacks/:key" component={stackDetail} />
  </Route>
);
