import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import operation from './operation';
import quota from './quota';
import billing from './billing';
import instance from './instance';

const rootReducer = combineReducers({
  operation,
  quota,
  instance,
  billing,
  routing,
});

export default rootReducer;
