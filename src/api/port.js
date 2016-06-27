import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/ports';

export function fetchPorts(param = {}) {
  const url = paramToQuery(API, param);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchPort(id) {
  const url = `${API}/${id}`;

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createPort(params) {
  return fetch(API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deletePort(id) {
  const url = `${API}/${id}`;

  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updatePort(params) {
  const url = `${API}/${params.id}`;

  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
