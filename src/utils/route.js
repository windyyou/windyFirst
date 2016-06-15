import { loggedIn } from './auth';

export function redirectToApp(state, replace) {
  if (loggedIn()) {
    let path = '/app';

    if (state && state.nextPathname && /\/app/.test(state.nextPathname)) {
      path = state.nextPathname;
    }

    replace(path);
  }
}

export function redirectToLogin(state, replace) {
  if (!loggedIn()) {
    let nextPathname;
    if (state && state.location) {
      nextPathname = state.location.pathname;
    }

    replace({
      pathname: '/',
      state: { nextPathname },
    });
  }
}
