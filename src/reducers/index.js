import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import router from './router';
import operation from './operation';
import quota from './quota';
import instance from './instance';
import billing from './billing';
import config from './config';
import image from './image';
import keypair from './keypair';
import network from './network';
import floatingIp from './floatingIp';
import virtualNic from './virtualNic';
import snapshot from './snapshot';
import aggregation from './aggregation';
import monitor from './monitor';
import disk from './disk';
import subnet from './subnet';
import backup from './backup';
import bareMetal from './bareMetal';
import alarm from './alarm';
import firewall from './firewall';
import securityGroup from './securityGroup';
import notification from './notification';
import notificationList from './notificationList';

const rootReducer = combineReducers({
  router,
  config,
  image,
  keypair,
  network,
  subnet,
  floatingIp,
  virtualNic,
  snapshot,
  operation,
  quota,
  instance,
  billing,
  aggregation,
  monitor,
  disk,
  backup,
  bareMetal,
  securityGroup,
  routing,
  alarm,
  firewall,
  notification,
  notificationList,
});

export default rootReducer;
