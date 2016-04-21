import {
  FETCH_NOTIFICATION_LISTS_REQUEST,
  FETCH_NOTIFICATION_LISTS_SUCCESS,
  FETCH_NOTIFICATION_LISTS_FAILURE,
  FILTER_NOTIFICATION_LISTS,
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
