import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/pools';

export function fetchPools(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchPoolConfig() {
  const url = `${API}/config`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createPool(params) {
  return fetch(API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createPoolStack(params) {
  const url = `${API}/${params.pid}/stacks`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updatePoolStack(params) {
  const url = `${API}/${params.pid}/stacks/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
