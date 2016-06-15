import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Alarms from '../components/Alarms';
import List from '../containers/Alarms/List';
import New from '../containers/Alarms/New';
import Step1 from '../components/Alarms/New/Step1';
import Step2 from '../components/Alarms/New/Step2';
import Step3 from '../components/Alarms/New/Step3';
import Detail from '../components/Alarms/Detail';

export default(
  <Route path="alarms" component={Alarms}>
    <IndexRoute component={List} />
    <Route path="new" component={New}>
      <IndexRoute component={Step1} />
      <Route path="step-1" component={Step1} />
      <Route path="step-2" component={Step2} />
      <Route path="step-3" component={Step3} />
    </Route>
    <Route path=":key" component={Detail} />
  </Route>
);
