import querystring from 'query-string';
import { LOGIN_API as authAPI } from '../api/auth';
import { removeToken, getToken } from '../utils/auth';

function authError(response) {
  return !(new RegExp(`${authAPI}$`)).test(response.url) && response.status === 401;
}

export function parseJSON(response) {
  return response.json();
}

export function checkStatus(response) {
  if (!response.ok) {
    // redirect to login when authentication error
    if (authError(response)) {
      removeToken();
      window.location.replace('/');
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response;
}

export function paramToQuery(url, params) {
  if (!Object.keys(params).length) {
    return url;
  }

  return `${url}?${querystring.stringify(params)}`;
}

export function fetchOptions() {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-ApiAuth-Token': getToken(),
    },
    credentials: 'same-origin',
  };
}
