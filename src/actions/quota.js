import {
  FETCH_QUOTAS_REQUEST,
  FETCH_QUOTAS_SUCCESS,
  FETCH_QUOTAS_FAILURE,
} from '../constants/quota';
import * as quotaAPI from '../api/quota';

export function fetchQuotas(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_QUOTAS_REQUEST,
      FETCH_QUOTAS_SUCCESS,
      FETCH_QUOTAS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: quotaAPI.fetchQuotas(params),
    },
  });
}
