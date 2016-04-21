import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FILTER_NOTIFICATIONS,
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAILURE,
  PUT_NOTIFICATION_REQUEST,
  PUT_NOTIFICATION_SUCCESS,
  PUT_NOTIFICATION_FAILURE,
  POST_NOTIFICATION_REQUEST,
  POST_NOTIFICATION_SUCCESS,
  POST_NOTIFICATION_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
} from '../constants/notification';
import * as notificationAPI from '../api/notification';

export function fetchNotifications(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_NOTIFICATIONS_REQUEST,
      FETCH_NOTIFICATIONS_SUCCESS,
      FETCH_NOTIFICATIONS_FAILURE,
    ],
    payload: {
      promise: notificationAPI.fetchNotifications(params),
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
  return (dispatch) => dispatch({
    types: [
      FETCH_NOTIFICATION_REQUEST,
      FETCH_NOTIFICATION_SUCCESS,
      FETCH_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: notificationAPI.fetchNotification(id),
    },
  });
}

export function putNotification(params) {
  return (dispatch) => dispatch({
    types: [
      PUT_NOTIFICATION_REQUEST,
      PUT_NOTIFICATION_SUCCESS,
      PUT_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: notificationAPI.putNotification(params),
    },
  });
}

export function postNotification(params) {
  return (dispatch) => dispatch({
    types: [
      POST_NOTIFICATION_REQUEST,
      POST_NOTIFICATION_SUCCESS,
      POST_NOTIFICATION_FAILURE,
    ],
    payload: {
      promise: notificationAPI.postNotification(params),
    },
  });
}

export function deleteNotification(id) {
  return (dispatch) => dispatch({
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
