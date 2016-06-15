import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/stacks';

export function fetchStacks(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchStack(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteStack(id) {
  const url = `${API}/${id}`;

  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchStackConfig() {
  const url = `${API}/config`;

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updateStack(param) {
  const { id } = param;
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(param),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createStack(param) {
  const url = `${API}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',

    body: JSON.stringify({
      ...param,
    }),

  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
