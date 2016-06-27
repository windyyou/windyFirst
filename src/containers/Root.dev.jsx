import React from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';

import routes from '../routes';

export default function Root(props) {
  return (
    <Provider store={props.store}>
      <div>
        <Router
          history={props.history}
          routes={routes}
          render={applyRouterMiddleware(useScroll())}
        />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};
