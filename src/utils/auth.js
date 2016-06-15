import isNil from 'lodash/isNil';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function loggedIn() {
  // const jwtDecode = require('jwt-decode');
  const token = getToken();
  if (isNil(token)) {
    return false;
  }

  // const jwtDecode = require('jwt-decode');
  // const exp = jwtDecode(token).exp;
  const exp = '2016-10-12T00:00:00+08:00';

  return Date.now() < new Date(exp);
}
