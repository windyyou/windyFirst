import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON } from '../utils/fetchUtils';

const API = '/api/bare-metals';

export function fetchBareMetals(param = {}) {
  const url = paramToQuery(API, param);

  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
