import 'whatwg-fetch';
import { checkStatus, parseJSON } from '../utils/fetchUtils';

const API = '/api/monitors';
export function fetchMonitors(params = { resource: '', id: '', type: '' }) {
  const { resource, id, type } = params;
  const url = `${API}/${resource}/${id}/${type}`;

  return fetch(url, {
    credentials: 'same-origin',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
