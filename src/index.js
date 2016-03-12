import './styles/base.less';
import 'antd/style/index.less';
import './styles/customize.less';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes/routes';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
);
