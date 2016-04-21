import {
  FETCH_FLOATING_IPS_REQUEST,
  FETCH_FLOATING_IPS_SUCCESS,
  FETCH_FLOATING_IPS_FAILURE,
  FILTER_FLOATING_IPS,
} from '../constants/floatingIp';
import * as floatingIpApi from '../api/floatingIp';

export function fetchFloatingIps(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_FLOATING_IPS_REQUEST,
      FETCH_FLOATING_IPS_SUCCESS,
      FETCH_FLOATING_IPS_FAILURE,
    ],
    payload: {
      promise: floatingIpApi.fetchFloatingIps(params),
    },
  });
}

export function filterFloatingIps(filter) {
  return {
    type: FILTER_FLOATING_IPS,
    payload: filter,
  };
}
