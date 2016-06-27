import isNil from 'lodash/isNil';
import different from 'lodash/difference';

const jwtDecode = require('jwt-decode');

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function decode(encodedToken) {
  try {
    const token = JSON.parse(jwtDecode(encodedToken).sub).token;

    // a valid token should have the following keys
    if (token && different([
      'tokenId',
      'userAccount',
      'isAdmin',
      'exp',
    ], Object.keys(token)).length === 0) return token;
    return {};
  } catch (e) {
    return {};
  }
}

export function loggedIn() {
  const token = getToken();
  if (isNil(token)) {
    return false;
  }

  // TODO: dummy code
  const exp = '2016-10-12T00:00:00+08:00';
  // const exp = decode(token).exp;

  return Date.now() < new Date(exp);
}
