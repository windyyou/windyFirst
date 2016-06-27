import {
  FETCH_FLOATING_IPS_REQUEST,
  FETCH_FLOATING_IPS_SUCCESS,
  FETCH_FLOATING_IPS_FAILURE,

  FILTER_FLOATING_IPS,

  DELETE_FLOATING_IP_REQUEST,
  DELETE_FLOATING_IP_SUCCESS,
  DELETE_FLOATING_IP_FAILURE,
} from '../constants/floatingIp';
import * as floatingIpApi from '../api/floatingIp';

export function fetchFloatingIps(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_FLOATING_IPS_REQUEST,
      FETCH_FLOATING_IPS_SUCCESS,
      FETCH_FLOATING_IPS_FAILURE,
    ],
    meta: {
      refresh,
    },
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

export function deleteFloatingIp(id) {
  return dispatch => dispatch({
    types: [
      DELETE_FLOATING_IP_REQUEST,
      DELETE_FLOATING_IP_SUCCESS,
      DELETE_FLOATING_IP_FAILURE,
    ],
    payload: {
      promise: floatingIpApi.deleteFloatingIp(id).then(data => {
        dispatch(fetchFloatingIps());
        return data;
      }),
    },
  });
}
