import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/volumes';

export function fetchVolumes(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchVolumeConfig() {
  const url = `${API}/config`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchVolume(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createVolume(params) {
  const data = {
    volume: {
      name: params.name,
      description: params.description,
      type: params.type,
      multiattach: params.share,
      size: params.size,
    },
  };

  return fetch(API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteBackup(params) {
  const url = `${API}/${params.pid}/backups/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function addBackup(params) {
  const url = '/api/backups';
  const data = {
    backup: {
      name: params.name,
      volume_id: params.volumeId,
    },
  };

  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updateVolume(params) {
  const url = `${API}/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteVolume(id) {
  const url = `${API}/${id}`;

  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
