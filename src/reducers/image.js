import { handleActions } from 'redux-actions';
import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from '../constants/images';

const INITIAL_STATE = {
  list: {
    isFetching: false,
    error: null,
    data: [],
  },
  current: {
    isFetching: false,
    error: null,
    data: {
      id: '',
    },
  },
};

export default handleActions({
  [FETCH_IMAGES_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_IMAGES_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_IMAGES_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),
}, INITIAL_STATE);
