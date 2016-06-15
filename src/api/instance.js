import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/instances';

export function fetchInstances(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchInstanceConfig() {
  const url = `${API}/config`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchInstance(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createInstance(params) {
  const url = `${API}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteInstance(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteKeypair(param) {
  const url = `${API}/${param.pid}/kaypairs/${param.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteSnapshot(param) {
  const url = `${API}/${param.instanceId}/snapshots/${param.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteNetwork(param) {
  const url = `${API}/${param.pid}/networks/${param.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteVolume(param) {
  const url = `${API}/${param.pid}/volumes/${param.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updateInstance(param) {
  const { id } = param;
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(param),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addSnapshot(param) {
  const url = `${API}/${param.instanceId}/snapshots`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(param),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addKeypair(param) {
  const url = `${API}/${param.pid}/keypairs`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(param),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addVolume(param) {
  const url = `${API}/${param.pid}/volumes`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(param),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addNetwork(param) {
  const url = `${API}/${param.pid}/networks`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(param),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
