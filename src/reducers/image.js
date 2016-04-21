import { handleActions } from 'redux-actions';
import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from '../constants/images';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
};

export default handleActions({
  [FETCH_IMAGES_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_IMAGES_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_IMAGES_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
