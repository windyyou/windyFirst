import 'whatwg-fetch';
import { checkStatus, parseJSON, fetchOptions } from '../utils/fetch';
import { decode } from '../utils/auth';

export const LOGIN_API = '/api/auth/tokens';
export const SIGN_UP_API = '/api/auth/sign-up';

export function login(credentials) {
  return fetch(LOGIN_API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(credentials),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => {
      // const token = json.token;
      // const userAccount = decode(token).userAccount;

      // TODO: the following 2 lines are dummy code
      const token = {
        user: {
          id: '1234567890',
          name: 'admin',
        },
        exp: '2016-01-12T00:00:00+08:00',
      };
      const userAccount = token.userAccount;
      // dummy code above

      return { token, userAccount };
    });
}

export function signUp(data) {
  return fetch(SIGN_UP_API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(data),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
