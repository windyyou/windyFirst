import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/networks';
export function fetchNetworks(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchNetwork(id) {
  const url = `${API}/${id}`;

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteNetwork(id) {
  const url = `${API}/${id}`;

  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updateNetwork(params) {
  const url = `${API}/${params.id}`;

  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createNetwork(params) {
  return fetch(API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
