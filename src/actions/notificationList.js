import {
  FETCH_NOTIFICATION_LISTS_REQUEST,
  FETCH_NOTIFICATION_LISTS_SUCCESS,
  FETCH_NOTIFICATION_LISTS_FAILURE,

  FILTER_NOTIFICATION_LISTS,

  FETCH_NOTIFICATION_LIST_REQUEST,
  FETCH_NOTIFICATION_LIST_SUCCESS,
  FETCH_NOTIFICATION_LIST_FAILURE,

  UPDATE_NOTIFICATION_LIST_REQUEST,
  UPDATE_NOTIFICATION_LIST_SUCCESS,
  UPDATE_NOTIFICATION_LIST_FAILURE,

  DELETE_NOTIFICATION_LIST_REQUEST,
  DELETE_NOTIFICATION_LIST_SUCCESS,
  DELETE_NOTIFICATION_LIST_FAILURE,

  CREATE_NOTIFICATION_LIST_REQUEST,
  CREATE_NOTIFICATION_LIST_SUCCESS,
  CREATE_NOTIFICATION_LIST_FAILURE,

  DELETE_NOTIFICATION_LIST_TERMINAL_REQUEST,
  DELETE_NOTIFICATION_LIST_TERMINAL_SUCCESS,
  DELETE_NOTIFICATION_LIST_TERMINAL_FAILURE,

  CREATE_NOTIFICATION_LIST_TERMINAL_REQUEST,
  CREATE_NOTIFICATION_LIST_TERMINAL_SUCCESS,
  CREATE_NOTIFICATION_LIST_TERMINAL_FAILURE,
} from '../constants/notificationList';
import * as notificationListAPI from '../api/notificationList';

export function fetchNotificationLists(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_NOTIFICATION_LISTS_REQUEST,
      FETCH_NOTIFICATION_LISTS_SUCCESS,
      FETCH_NOTIFICATION_LISTS_FAILURE,
    ],
    payload: {
      promise: notificationListAPI.fetchNotificationLists(params),
    },
  });
}

export function filterNotificationLists(filter) {
  return {
    type: FILTER_NOTIFICATION_LISTS,
    payload: filter,
  };
}

export function fetchNotificationList(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_NOTIFICATION_LIST_REQUEST,
      FETCH_NOTIFICATION_LIST_SUCCESS,
      FETCH_NOTIFICATION_LIST_FAILURE,
    ],
    payload: {
      promise: notificationListAPI.fetchNotificationList(id),
    },
  });
}

export function updateNotificationList(params) {
  return (dispatch) => dispatch({
    types: [
      UPDATE_NOTIFICATION_LIST_REQUEST,
      UPDATE_NOTIFICATION_LIST_SUCCESS,
      UPDATE_NOTIFICATION_LIST_FAILURE,
    ],
    payload: {
      promise: notificationListAPI.updateNotificationList(params),
    },
  });
}

export function deleteNotificationList(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_NOTIFICATION_LIST_REQUEST,
      DELETE_NOTIFICATION_LIST_SUCCESS,
      DELETE_NOTIFICATION_LIST_FAILURE,
    ],
    payload: {
      promise: notificationListAPI.deleteNotificationList(id)
        .then((data) => {
          dispatch(fetchNotificationLists());
          return data;
        }),
    },
  });
}

export function createNotificationList(params) {
  return (dispatch) => dispatch({
    types: [
      CREATE_NOTIFICATION_LIST_REQUEST,
      CREATE_NOTIFICATION_LIST_SUCCESS,
      CREATE_NOTIFICATION_LIST_FAILURE,
    ],
    payload: {
      promise: notificationListAPI.createNotificationList(params),
    },
  });
}

export function deleteNotificationListTerminal(params) {
  return (dispatch) => dispatch({
    types: [
      DELETE_NOTIFICATION_LIST_TERMINAL_REQUEST,
      DELETE_NOTIFICATION_LIST_TERMINAL_SUCCESS,
      DELETE_NOTIFICATION_LIST_TERMINAL_FAILURE,
    ],
    payload: {
      promise: notificationListAPI.deleteNotificationListTerminal(params),
    },
  });
}

export function createNotificationListTerminal(params) {
  return (dispatch) => dispatch({
    types: [
      CREATE_NOTIFICATION_LIST_TERMINAL_REQUEST,
      CREATE_NOTIFICATION_LIST_TERMINAL_SUCCESS,
      CREATE_NOTIFICATION_LIST_TERMINAL_FAILURE,
    ],
    payload: {
      promise: notificationListAPI.createNotificationListTerminal(params),
    },
  });
}
