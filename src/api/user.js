import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/users';

export function fetchUsers(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchUser(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function enableUser(params) {
  const url = `${API}/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function disableUser(params) {
  const url = `${API}/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function resetUserPassword(param) {
  const url = `${API}/${param.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(param),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
