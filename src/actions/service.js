import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
} from '../constants/service';
import * as serviceAPI from '../api/service';

export function fetchServices(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SERVICES_REQUEST,
      FETCH_SERVICES_SUCCESS,
      FETCH_SERVICES_FAILURE,
    ],
    payload: {
      promise: serviceAPI.fetchServices(params),
    },
  });
}
