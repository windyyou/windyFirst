import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import router from './router';
import operation from './operation';
import quota from './quota';
import instance from './instance';
import billing from './billing';
import image from './image';
import keypair from './keypair';
import network from './network';
import floatingIp from './floatingIp';
import port from './port';
import snapshot from './snapshot';
import aggregation from './aggregation';
import monitor from './monitor';
import volume from './volume';
import subnet from './subnet';
import backup from './backup';
import bareMetal from './bareMetal';
import alarm from './alarm';
import firewall from './firewall';
import securityGroup from './securityGroup';
import notification from './notification';
import notificationList from './notificationList';
import bill from './bill';
import service from './service';
import auth from './auth';
import user from './user';
import pool from './pool';
import stack from './stack';

const rootReducer = combineReducers({
  router,
  image,
  keypair,
  network,
  subnet,
  floatingIp,
  port,
  snapshot,
  operation,
  quota,
  instance,
  billing,
  aggregation,
  monitor,
  volume,
  backup,
  bareMetal,
  securityGroup,
  routing,
  alarm,
  firewall,
  notification,
  notificationList,
  bill,
  service,
  auth,
  user,
  pool,
  stack,
});

export default rootReducer;
