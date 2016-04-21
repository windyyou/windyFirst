import { handleActions } from 'redux-actions';
import {
  FETCH_DISKS_REQUEST,
  FETCH_DISKS_SUCCESS,
  FETCH_DISKS_FAILURE,
  FILTER_DISKS,
} from '../constants/disk';

const INITIAL_STATE = {
  // 通用标示
  isFetching: false,

  // 列表
  diskList: [],

  // 通用标示
  error: null,

  // 搜索内容
  filter: '',

  // 创建时所需配置
  diskConfig: null,

  // 创建对象
  newInstance: null,

  // 修改对象
  updatedInstance: null,

  // 删除对象
  deletedInstance: null,
};

export default handleActions({
  [FETCH_DISKS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_DISKS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    diskList: action.payload,
  }),

  [FETCH_DISKS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_DISKS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
