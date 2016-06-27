import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/alarms';

export function fetchAlarms(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchAlarmConfig() {
  const url = `${API}/config`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createAlarm(params) {
  const data = { ...params };
  delete data.isSend;

  return fetch(API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteAlarm(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchAlarm(id) {
  const url = `${API}/${id}`;

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updateAlarm(params) {
  const url = `${API}/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addAlarmNotification(params) {
  const url = `${API}/${params.pid}/notifications`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addAlarmResource(params) {
  const url = `${API}/${params.pid}/resources`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addAlarmRule(params) {
  const url = `${API}/${params.pid}/rules`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteAlarmResource(params) {
  const url = `${API}/${params.pid}/resources/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteAlarmRule(params) {
  const url = `${API}/${params.pid}/rules/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteAlarmNotification(params) {
  const url = `${API}/${params.pid}/notifications/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
