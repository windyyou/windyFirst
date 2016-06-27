import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,

  FILTER_NOTIFICATIONS,

  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAILURE,

  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAILURE,

  CREATE_NOTIFICATION_REQUEST,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILURE,

  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,

  MARK_NOTIFICATION_AS_READ_REQUEST,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  MARK_NOTIFICATION_AS_READ_FAILURE,
} from '../constants/notification';
import * as notificationAPI from '../api/notification';

export function fetchNotifications(params, refresh) {
  return dispatch => dispatch({
    types: [
      FETCH_NOTIFICATIONS_REQUEST,
      FETCH_NOTIFICATIONS_SUCCESS,
      FETCH_NOTIFICATIONS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: notificationAPI.fetchNotifications(params),
    },
  });
}

export function markRead(id) {
  return dispatch => dispatch({
    types: [
      MARK_NOTIFICATION_AS_READ_REQUEST,
      MARK_NOTIFICATION_AS_READ_SUCCESS,
      MARK_NOTIFICATION_AS_READ_FAILURE,
    ],
    payload: {
      promise: notificationAPI.markRead(id)
        .then(data => {
          dispatch(fetchNotifications());

          return data;
        }),
    },
  });
}

export function filterNotifications(filter) {
  return {
    type: FILTER_NOTIFICATIONS,
    payload: filter,
  };
}

export function fetchNotification(id) {
  return dispatch => dispatch({
    types: [
      FETCH_NOTIFICATION_REQUEST,
      FETCH_NOTIFICATION_SUCCESS,
      FETCH_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: notificationAPI.fetchNotification(id)
        .then(data => {
          dispatch(markRead(id));

          return data;
        }),
    },
  });
}

export function putNotification(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_NOTIFICATION_REQUEST,
      UPDATE_NOTIFICATION_SUCCESS,
      UPDATE_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: notificationAPI.updateNotification(params),
    },
  });
}

export function postNotification(params) {
  return dispatch => dispatch({
    types: [
      CREATE_NOTIFICATION_REQUEST,
      CREATE_NOTIFICATION_SUCCESS,
      CREATE_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: notificationAPI.createNotification(params),
    },
  });
}

export function deleteNotification(id) {
  return dispatch => dispatch({
    types: [
      DELETE_NOTIFICATION_REQUEST,
      DELETE_NOTIFICATION_SUCCESS,
      DELETE_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: notificationAPI.deleteNotification(id),
    },
  });
}
