import {
  FETCH_AGGREGATIONS_REQUEST,
  FETCH_AGGREGATIONS_SUCCESS,
  FETCH_AGGREGATIONS_FAILURE,
} from '../constants/aggregation';
import * as aggregationAPI from '../api/aggregation';

export function fetchAggregations(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_AGGREGATIONS_REQUEST,
      FETCH_AGGREGATIONS_SUCCESS,
      FETCH_AGGREGATIONS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: aggregationAPI.fetchAggregations(params),
    },
  });
}
