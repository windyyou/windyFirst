import {
  FETCH_QUOTAS_REQUEST,
  FETCH_QUOTAS_SUCCESS,
  FETCH_QUOTAS_FAILURE,
} from '../constants/quota';
import * as quotaAPI from '../api/quota';

export function fetchQuotas(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_QUOTAS_REQUEST,
      FETCH_QUOTAS_SUCCESS,
      FETCH_QUOTAS_FAILURE,
    ],
    payload: {
      promise: quotaAPI.fetchQuotas(params),
    },
  });
}
