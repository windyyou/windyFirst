import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON } from '../utils/fetchUtils';

const API = '/api/notifications';

export function fetchNotifications(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchNotification(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function putNotification(params = { id: '' }) {
  const { id } = params;
  const url = `${API}/${id}`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function postNotification(params) {
  const url = `${API}`;
  return fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteNotification(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
