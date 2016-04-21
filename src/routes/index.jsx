import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { scrollToLeftTop } from '../utils/domUtils';

import InstanceRoutes from './instances';
import NetworkRoutes from './networks';
import SubnetRoutes from './subnets.jsx';
import SnapshotRoutes from './snapshots';
import FloatingIpRoutes from './floatingIps';
import VirtualNicRoutes from './virtualNics';
import BareMetalRoutes from './bareMetals';
import SecurityGroupRoutes from './securityGroup';
import KeypairRoutes from './keypairs.jsx';
import RouterRoutes from './routers';
import AlarmRoutes from './alarm.jsx';
import FirewallRoutes from './firewalls.jsx';
import DiskRoutes from './disks.jsx';
import BackupRoutes from './backups';
import NotificationRoutes from './notifications';
import NotificationListRoutes from './notificationLists';
import App from '../containers/App';
import Dashboard from '../containers/Dashboard';

export default (
  <Route path="/" component={App} onChange={scrollToLeftTop}>
    <IndexRoute component={Dashboard} />
    {InstanceRoutes}
    {NetworkRoutes}
    {FloatingIpRoutes}
    {VirtualNicRoutes}
    {SecurityGroupRoutes}
    {SnapshotRoutes}
    {RouterRoutes}
    {DiskRoutes}
    {BackupRoutes}
    {NotificationRoutes}
    {NotificationListRoutes}
    {KeypairRoutes}
    {SubnetRoutes}
    {AlarmRoutes}
    {FirewallRoutes}
    {BareMetalRoutes}
  </Route>
);
