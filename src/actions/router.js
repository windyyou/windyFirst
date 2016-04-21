import {
  FETCH_ROUTERS_REQUEST,
  FETCH_ROUTERS_SUCCESS,
  FETCH_ROUTERS_FAILURE,
  FILTER_ROUTERS,
} from '../constants/router';
import * as routerAPI from '../api/router';

export function fetchRouters(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_ROUTERS_REQUEST,
      FETCH_ROUTERS_SUCCESS,
      FETCH_ROUTERS_FAILURE,
    ],
    payload: {
      promise: routerAPI.fetchRouters(params),
    },
  });
}

export function filterRouters(filter) {
  return {
    type: FILTER_ROUTERS,
    payload: filter,
  };
}
