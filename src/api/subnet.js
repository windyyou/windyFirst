import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON } from '../utils/fetchUtils';

const API = '/api/subnets';

export function fetchSubnets(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchSubnetsCount(params = {}) {
  const countUrl = '/count';
  const url = paramToQuery(API + countUrl, params);

  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
