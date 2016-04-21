import { handleActions } from 'redux-actions';
import {
  FETCH_INSTANCES_REQUEST,
  FETCH_INSTANCES_SUCCESS,
  FETCH_INSTANCES_FAILURE,
  FILTER_INSTANCES,
  FETCH_INSTANCE_REQUEST,
  FETCH_INSTANCE_SUCCESS,
  FETCH_INSTANCE_FAILURE,
} from '../constants/instance';

const INITIAL_STATE = {
  // 表示数据加载中
  isFetching: false,

  // 列表
  instanceList: [],

  // 错误信息
  error: null,

  // 搜索内容
  filter: '',

  // 创建时所需配置
  instanceConfig: null,

  // 当前对象及相关信息
  currentInstance: {
    keypairs: [],
    disks: [],
    networks: [],
    snapshots: [],
    createdAt: '',
    type: '',
    floatingIp: '',
    ip: '',
    image: '',
    status: '',
    name: '',
    id: '',
  },

  // 创建对象
  newInstance: null,

  // 修改对象
  updatedInstance: null,

  // 删除对象
  deletedInstance: null,
};

export default handleActions({
  [FETCH_INSTANCES_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_INSTANCES_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    instanceList: action.payload,
  }),

  [FETCH_INSTANCES_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_INSTANCES]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_INSTANCE_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_INSTANCE_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    currentInstance: action.payload,
  }),

  [FETCH_INSTANCE_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
