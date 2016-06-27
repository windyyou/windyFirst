import { handleActions } from 'redux-actions';
import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
} from '../constants/service';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },
};

export default handleActions({
  [FETCH_SERVICES_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_SERVICES_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_SERVICES_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),
}, INITIAL_STATE);
