import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/quotas';

export function fetchQuotas(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
