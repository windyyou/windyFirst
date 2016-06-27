import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/notifications';

export function fetchNotifications(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchNotification(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function markRead(id, read = true) {
  return fetch(`${API}/${id}`, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify({
      read,

      // TODO: following lines are TEST ONLY, remove them all
      name: 'Icology',
      type: '其他',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan ' +
      'et viverra justo commodo. Proin sodales pulvinar tempor. ' +
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ' +
      'Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, ' +
      'sed rhoncus sapien nunc eget odio.',
      createdAt: '2016/03/25 04:51',
    }),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function updateNotification(params = { id: '' }) {
  const url = `${API}/${params.id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'PUT',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function createNotification(params) {
  return fetch(API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function deleteNotification(id) {
  const url = `${API}/${id}`;
  return fetch(url, {
    ...fetchOptions(),
    method: 'DELETE',
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
