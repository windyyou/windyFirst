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
  const url = `${API}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify({
      ...params,
      resource: [
        {
          id: '56fa52491b882e83369084f9',
          name: '11',
          status: '正常',
          add: true,
        },
        {
          id: '56fa52491f97403f1f899da7',
          name: '111',
          status: '数据不足',
          add: true,
        },
      ],
      enable: '启用',
      status: '数据不足',
      createdAt: '2016-03-03 04:27:21',
      describe: 'xxx',
    }),
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
  const { pid, id } = params;
  const url = `${API}/${pid}/resources/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteAlarmRule(params) {
  const { pid, id } = params;
  const url = `${API}/${pid}/rules/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteAlarmNotification(params) {
  const { pid, id } = params;
  const url = `${API}/${pid}/notifications/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
