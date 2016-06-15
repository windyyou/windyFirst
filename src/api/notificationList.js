import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/notification-lists';

export function fetchNotificationLists(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchNotificationList(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updateNotificationList(params) {
  const { id } = params;
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteNotificationList(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createNotificationList(params) {
  const url = `${API}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify({
      ...params,
    }),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteNotificationListTerminal(params) {
  const { pid, id } = params;
  const url = `${API}/${pid}/terminals/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createNotificationListTerminal(params) {
  const { pid } = params;
  delete params.pid;
  const url = `${API}/${pid}/terminals`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
