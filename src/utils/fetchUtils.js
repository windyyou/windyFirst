import querystring from 'query-string';

export function parseJSON(response) {
  return response.json();
}

export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response;
}

export function paramToQuery(url, params) {
  if (!Object.keys(params)) {
    return url;
  }

  return `${url}?${querystring.stringify(params)}`;
}
