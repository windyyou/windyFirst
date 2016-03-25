import isPromise from '../utils/isPromise';
import isNil from 'lodash/isNil';

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
    ...(!isNil(meta) && meta),
  });

  return promise.then(
    response => next({
      type: SUCCESS,
      payload: response,
    })
  ).catch(
    error => next({
      type: FAILURE,
      payload: error,
      error: true,
    })
  );
};
