import React from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { Router } from 'react-router';

import routes from '../routes';

export default function Root(props) {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <div>
        <Router history={history} routes={routes} />
        <DevTools />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};
