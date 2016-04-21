import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON } from '../utils/fetchUtils';

const API = '/api/images';

export function fetchImages(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
