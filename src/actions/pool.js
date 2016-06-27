import {
  FETCH_POOLS_REQUEST,
  FETCH_POOLS_SUCCESS,
  FETCH_POOLS_FAILURE,

  FETCH_POOL_CONFIG_REQUEST,
  FETCH_POOL_CONFIG_SUCCESS,
  FETCH_POOL_CONFIG_FAILURE,

  CREATE_POOL_REQUEST,
  CREATE_POOL_SUCCESS,
  CREATE_POOL_FAILURE,

  UPDATE_POOL_STACK_REQUEST,
  UPDATE_POOL_STACK_SUCCESS,
  UPDATE_POOL_STACK_FAILURE,

  CREATE_POOL_STACK_REQUEST,
  CREATE_POOL_STACK_SUCCESS,
  CREATE_POOL_STACK_FAILURE,
} from '../constants/pool';
import * as poolAPI from '../api/pool';
import { fetchStacks, fetchStack } from './stack';

export function fetchPools(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_POOLS_REQUEST,
      FETCH_POOLS_SUCCESS,
      FETCH_POOLS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: poolAPI.fetchPools(params),
    },
  });
}

export function fetchPoolConfig() {
  return dispatch => dispatch({
    types: [
      FETCH_POOL_CONFIG_REQUEST,
      FETCH_POOL_CONFIG_SUCCESS,
      FETCH_POOL_CONFIG_FAILURE,
    ],
    payload: {
      promise: poolAPI.fetchPoolConfig(),
    },
  });
}

export function createPool(params) {
  return dispatch => dispatch({
    types: [
      CREATE_POOL_REQUEST,
      CREATE_POOL_SUCCESS,
      CREATE_POOL_FAILURE,
    ],
    payload: {
      promise: poolAPI.createPool(params),
    },
  });
}

export function updatePoolStack(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_POOL_STACK_REQUEST,
      UPDATE_POOL_STACK_SUCCESS,
      UPDATE_POOL_STACK_FAILURE,
    ],
    payload: {
      promise: poolAPI.updatePoolStack(params)
       .then(data => {
         dispatch(fetchStack(params.id));
         return data;
       }),
    },
  });
}

export function createPoolStack(params) {
  return dispatch => dispatch({
    types: [
      CREATE_POOL_STACK_REQUEST,
      CREATE_POOL_STACK_SUCCESS,
      CREATE_POOL_STACK_FAILURE,
    ],
    payload: {
      promise: poolAPI.createPoolStack(params)
        .then(data => {
          dispatch(fetchStacks());
          return data;
        }),
    },
  });
}

