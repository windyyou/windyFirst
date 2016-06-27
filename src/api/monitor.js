import 'whatwg-fetch';
import { checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/monitors';
export function fetchMonitors(params = { resource: '', id: '', type: '' }) {
  const url = `${API}/${params.resource}/${params.id}/${params.type}`;

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
