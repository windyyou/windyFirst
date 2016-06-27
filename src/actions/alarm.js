import {
  FETCH_ALARMS_REQUEST,
  FETCH_ALARMS_SUCCESS,
  FETCH_ALARMS_FAILURE,

  FETCH_ALARM_CONFIG_REQUEST,
  FETCH_ALARM_CONFIG_SUCCESS,
  FETCH_ALARM_CONFIG_FAILURE,

  FILTER_ALARMS,

  FETCH_ALARM_REQUEST,
  FETCH_ALARM_SUCCESS,
  FETCH_ALARM_FAILURE,

  UPDATE_ALARM_FAILURE,
  UPDATE_ALARM_REQUEST,
  UPDATE_ALARM_SUCCESS,

  SELECT_ALARM_RESOURCE_TYPE,

  CREATE_ALARM_REQUEST,
  CREATE_ALARM_SUCCESS,
  CREATE_ALARM_FAILURE,

  DELETE_ALARM_REQUEST,
  DELETE_ALARM_SUCCESS,
  DELETE_ALARM_FAILURE,

  ADD_ALARM_NOTIFICATION_REQUEST,
  ADD_ALARM_NOTIFICATION_SUCCESS,
  ADD_ALARM_NOTIFICATION_FAILURE,

  ADD_ALARM_RESOURCE_REQUEST,
  ADD_ALARM_RESOURCE_SUCCESS,
  ADD_ALARM_RESOURCE_FAILURE,

  ADD_ALARM_RULE_REQUEST,
  ADD_ALARM_RULE_SUCCESS,
  ADD_ALARM_RULE_FAILURE,

  DELETE_ALARM_NOTIFICATION_REQUEST,
  DELETE_ALARM_NOTIFICATION_SUCCESS,
  DELETE_ALARM_NOTIFICATION_FAILURE,

  DELETE_ALARM_RESOURCE_REQUEST,
  DELETE_ALARM_RESOURCE_SUCCESS,
  DELETE_ALARM_RESOURCE_FAILURE,

  DELETE_ALARM_RULE_REQUEST,
  DELETE_ALARM_RULE_SUCCESS,
  DELETE_ALARM_RULE_FAILURE,
} from '../constants/alarm';
import * as alarmAPI from '../api/alarm';

export function fetchAlarms(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_ALARMS_REQUEST,
      FETCH_ALARMS_SUCCESS,
      FETCH_ALARMS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: alarmAPI.fetchAlarms(params),
    },
  });
}

export function fetchAlarmConfig() {
  return dispatch => dispatch({
    types: [
      FETCH_ALARM_CONFIG_REQUEST,
      FETCH_ALARM_CONFIG_SUCCESS,
      FETCH_ALARM_CONFIG_FAILURE,
    ],
    payload: {
      promise: alarmAPI.fetchAlarmConfig(),
    },
  });
}

export function filterAlarms(filter) {
  return {
    type: FILTER_ALARMS,
    payload: filter,
  };
}

export function selectAlarmResourceType(type) {
  return {
    type: SELECT_ALARM_RESOURCE_TYPE,
    payload: type,
  };
}

export function fetchAlarm(id) {
  return dispatch => dispatch({
    types: [
      FETCH_ALARM_REQUEST,
      FETCH_ALARM_SUCCESS,
      FETCH_ALARM_FAILURE,
    ],
    payload: {
      promise: alarmAPI.fetchAlarm(id),
    },
  });
}

export function updateAlarm(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_ALARM_REQUEST,
      UPDATE_ALARM_SUCCESS,
      UPDATE_ALARM_FAILURE,
    ],
    payload: {
      promise: alarmAPI.updateAlarm(params),
    },
  });
}

export function createAlarm(params) {
  return dispatch => dispatch({
    types: [
      CREATE_ALARM_REQUEST,
      CREATE_ALARM_SUCCESS,
      CREATE_ALARM_FAILURE,
    ],
    payload: {
      promise: alarmAPI.createAlarm(params),
    },
  });
}

export function deleteAlarm(id) {
  return dispatch => dispatch({
    types: [
      DELETE_ALARM_REQUEST,
      DELETE_ALARM_SUCCESS,
      DELETE_ALARM_FAILURE,
    ],
    payload: {
      promise: alarmAPI.deleteAlarm(id)
        .then(data => {
          dispatch(fetchAlarms());
          return data;
        }),
    },
  });
}

export function addAlarmResource(params) {
  return dispatch => dispatch({
    types: [
      ADD_ALARM_RESOURCE_REQUEST,
      ADD_ALARM_RESOURCE_SUCCESS,
      ADD_ALARM_RESOURCE_FAILURE,
    ],
    payload: {
      promise: alarmAPI.addAlarmResource(params),
    },
  });
}

export function addAlarmRule(params) {
  return dispatch => dispatch({
    types: [
      ADD_ALARM_RULE_REQUEST,
      ADD_ALARM_RULE_SUCCESS,
      ADD_ALARM_RULE_FAILURE,
    ],
    payload: {
      promise: alarmAPI.addAlarmRule(params),
    },
  });
}

export function addAlarmNotification(params) {
  return dispatch => dispatch({
    types: [
      ADD_ALARM_NOTIFICATION_REQUEST,
      ADD_ALARM_NOTIFICATION_SUCCESS,
      ADD_ALARM_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: alarmAPI.addAlarmNotification(params),
    },
  });
}

export function deleteAlarmRule(params) {
  const { pid } = params;
  return dispatch => dispatch({
    types: [
      DELETE_ALARM_RULE_REQUEST,
      DELETE_ALARM_RULE_SUCCESS,
      DELETE_ALARM_RULE_FAILURE,
    ],
    payload: {
      promise: alarmAPI.deleteAlarmRule(params)
        .then(data => {
          dispatch(fetchAlarms(pid));
          return data;
        }),
    },
  });
}

export function deleteAlarmResource(params) {
  const { pid } = params;
  return dispatch => dispatch({
    types: [
      DELETE_ALARM_RESOURCE_REQUEST,
      DELETE_ALARM_RESOURCE_SUCCESS,
      DELETE_ALARM_RESOURCE_FAILURE,
    ],
    payload: {
      promise: alarmAPI.deleteAlarmResource(params)
        .then(data => {
          dispatch(fetchAlarm(pid));
          return data;
        }),
    },
  });
}

export function deleteAlarmNotification(params) {
  const { pid } = params;
  return dispatch => dispatch({
    types: [
      DELETE_ALARM_NOTIFICATION_REQUEST,
      DELETE_ALARM_NOTIFICATION_SUCCESS,
      DELETE_ALARM_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: alarmAPI.deleteAlarmNotification(params)
        .then(data => {
          dispatch(fetchAlarm(pid));
          return data;
        }),
    },
  });
}
