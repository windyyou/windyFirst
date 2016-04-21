import { handleActions } from 'redux-actions';
import {
  FETCH_SECURITY_GROUPS_REQUEST,
  FETCH_SECURITY_GROUPS_SUCCESS,
  FETCH_SECURITY_GROUPS_FAILURE,
  FILTER_SECURITY_GROUPS,
} from '../constants/securityGroup';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
  filter: '',
};

export default handleActions({
  [FETCH_SECURITY_GROUPS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_SECURITY_GROUPS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_SECURITY_GROUPS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_SECURITY_GROUPS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
