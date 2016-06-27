import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { redirectToApp, redirectToLogin } from '../utils/route';

import InstanceRoutes from './instances';
import NetworkRoutes from './networks';
import SubnetRoutes from './subnets.jsx';
import SnapshotRoutes from './snapshots';
import FloatingIpRoutes from './floatingIps';
import PortRoutes from './ports';
import BareMetalRoutes from './bareMetals';
import SecurityGroupRoutes from './securityGroup';
import KeypairRoutes from './keypairs.jsx';
import RouterRoutes from './routers';
import AlarmRoutes from './alarm.jsx';
import FirewallRoutes from './firewalls.jsx';
import OperationsRoutes from './operation.jsx';
import VolumeRoutes from './volumes.jsx';
import BackupRoutes from './backups';
import NotificationRoutes from './notifications';
import NotificationListRoutes from './notificationLists';
import Users from './user.jsx';
import billRoutes from './bills';
import Pools from './pool.jsx';
import App from '../containers/App';
import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';

function redirectToLoginOnChange(prevState, nextState, replace) {
  redirectToLogin(nextState, replace);
}

export default (
  <Route path="/">
    <IndexRoute component={Login} onEnter={redirectToApp} />
    <Route path="sign-up" component={SignUp} onEnter={redirectToApp} />
    <Route
      path="app"
      component={App}
      onChange={redirectToLoginOnChange}
      onEnter={redirectToLogin}
    >
      <IndexRoute component={Dashboard} />
      {InstanceRoutes}
      {NetworkRoutes}
      {FloatingIpRoutes}
      {PortRoutes}
      {SecurityGroupRoutes}
      {SnapshotRoutes}
      {RouterRoutes}
      {VolumeRoutes}
      {BackupRoutes}
      {NotificationRoutes}
      {NotificationListRoutes}
      {billRoutes}
      {KeypairRoutes}
      {SubnetRoutes}
      {AlarmRoutes}
      {FirewallRoutes}
      {OperationsRoutes}
      {BareMetalRoutes}
      {Users}
      {Pools}
    </Route>
  </Route>
);
