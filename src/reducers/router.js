import { handleActions } from 'redux-actions';
import {
  FETCH_ROUTERS_REQUEST,
  FETCH_ROUTERS_SUCCESS,
  FETCH_ROUTERS_FAILURE,
  FILTER_ROUTERS,
} from '../constants/router';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
  filter: '',
};

export default handleActions({
  [FETCH_ROUTERS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_ROUTERS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_ROUTERS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_ROUTERS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
