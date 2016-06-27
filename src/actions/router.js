import {
  FETCH_ROUTERS_REQUEST,
  FETCH_ROUTERS_SUCCESS,
  FETCH_ROUTERS_FAILURE,

  FILTER_ROUTERS,

  FETCH_ROUTER_REQUEST,
  FETCH_ROUTER_SUCCESS,
  FETCH_ROUTER_FAILURE,

  DELETE_ROUTER_REQUEST,
  DELETE_ROUTER_SUCCESS,
  DELETE_ROUTER_FAILURE,

  UPDATE_ROUTER_REQUEST,
  UPDATE_ROUTER_SUCCESS,
  UPDATE_ROUTER_FAILURE,
} from '../constants/router';
import * as routerAPI from '../api/router';

export function fetchRouters(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_ROUTERS_REQUEST,
      FETCH_ROUTERS_SUCCESS,
      FETCH_ROUTERS_FAILURE,
    ],
    meta: {
      refresh,
    },
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

export function fetchRouter(id) {
  return dispatch => dispatch({
    types: [
      FETCH_ROUTER_REQUEST,
      FETCH_ROUTER_SUCCESS,
      FETCH_ROUTER_FAILURE,
    ],
    payload: {
      promise: routerAPI.fetchRouter(id),
    },
  });
}

export function deleteRouter(id) {
  return dispatch => dispatch({
    types: [
      DELETE_ROUTER_REQUEST,
      DELETE_ROUTER_SUCCESS,
      DELETE_ROUTER_FAILURE,
    ],
    payload: {
      promise: routerAPI.deleteRouter(id),
    },
  });
}

export function updateRouter(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_ROUTER_REQUEST,
      UPDATE_ROUTER_SUCCESS,
      UPDATE_ROUTER_FAILURE,
    ],
    payload: {
      promise: routerAPI.updateRouter(params),
    },
  });
}
