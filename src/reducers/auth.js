import { handleActions } from 'redux-actions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,

  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../constants/auth';
import { setToken } from '../utils/auth';

const INITIAL_STATE = {
  token: null,
  error: null,
  user: {
    id: '',
    name: '',
  },
  isFetching: false,
};

export default handleActions({
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [LOGIN_SUCCESS]: (state, action) => {
    const { token, user } = action.payload;
    setToken(token);

    return {
      ...state,
      token,
      user,
      isFetching: false,
    };
  },

  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
    user: INITIAL_STATE.user,
  }),

  [LOGOUT_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [LOGOUT_SUCCESS]: () => {
    window.location.replace('/');

    return INITIAL_STATE;
  },

  [SIGN_UP_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [SIGN_UP_SUCCESS]: () => INITIAL_STATE,

  [SIGN_UP_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
