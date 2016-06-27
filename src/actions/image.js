import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
} from '../constants/images';
import * as imageAPI from '../api/image';

export function fetchImages(params) {
  return dispatch => dispatch({
    types: [
      FETCH_IMAGES_REQUEST,
      FETCH_IMAGES_SUCCESS,
      FETCH_IMAGES_FAILURE,
    ],
    payload: {
      promise: imageAPI.fetchImages(params),
    },
  });
}
