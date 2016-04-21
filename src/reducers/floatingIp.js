import { handleActions } from 'redux-actions';
import {
  FETCH_FLOATING_IPS_REQUEST,
  FETCH_FLOATING_IPS_SUCCESS,
  FETCH_FLOATING_IPS_FAILURE,
  FILTER_FLOATING_IPS,
} from '../constants/floatingIp';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_FLOATING_IPS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_FLOATING_IPS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_FLOATING_IPS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_FLOATING_IPS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
