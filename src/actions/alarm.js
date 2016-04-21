import {
  FETCH_ALARMS_REQUEST,
  FETCH_ALARMS_SUCCESS,
  FETCH_ALARMS_FAILURE,
  FILTER_ALARMS,
} from '../constants/alarm';
import * as alarmAPI from '../api/alarm';

export function fetchAlarms(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_ALARMS_REQUEST,
      FETCH_ALARMS_SUCCESS,
      FETCH_ALARMS_FAILURE,
    ],
    payload: {
      promise: alarmAPI.fetchAlarms(params),
    },
  });
}

export function filterAlarms(filter) {
  return {
    type: FILTER_ALARMS,
    payload: filter,
  };
}
