import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON } from '../utils/fetchUtils';

const API = '/api/instances';

export function fetchInstances(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchInstance(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
