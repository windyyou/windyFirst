import isPromise from '../utils/isPromise';
import isNil from 'lodash/isNil';
import notification from 'antd/lib/notification';
import message from '../utils/message';

export default () => next => action => {
  if (!(action.payload && isPromise(action.payload.promise))) {
    return next(action);
  }

  const { types, payload, meta } = action;

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const { promise, data } = payload;
  const [REQUEST, SUCCESS, FAILURE] = types;

  next({
    type: REQUEST,
    ...(!isNil(data) && { payload: data }),
    ...(!isNil(meta) && { meta }),
  });

  notification.config({
    top: 74,
    duration: 3,
  });

  // hide fetch success messages, cause they are too noisy...
  if (!/^FETCH/.test(REQUEST)) {
    notification.info({
      message: message(REQUEST),
      description: message(REQUEST),
    });
  }

  return promise.then(
    response => {
      next({
        type: SUCCESS,
        payload: response,
      });

      // hide fetch success messages, cause they are too noisy...
      if (!/^FETCH/.test(SUCCESS)) {
        notification.success({
          message: message(SUCCESS),
          description: message(SUCCESS),
        });
      }

      return response;
    }
  ).catch(
    error => {
      next({
        type: FAILURE,
        payload: error,
        error: true,
      });

      notification.error({
        message: message(FAILURE),
        description: error.message,
      });

      return error;
    }
  );
};
