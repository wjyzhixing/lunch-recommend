import {
  getMyWifeFood,
  addMyWifeFood,
  deleteMyWifeFood,
  updateMyWifeFood,
  recommendMyWifeFood,
  deleteTag,
} from '@/services/food';

export default {
  namespace: 'food',
  state: {
    list: [],
  },
  effects: {
    // 获取已有食物列表
    *getMyWifeFood({ payload }, { call, put }) {
      const res = yield call(getMyWifeFood, payload);
      yield put({ type: 'update', list: res?.data });
      return res;
    },
    // 增加吃的食物
    *addMyWifeFood({ payload }, { call }) {
      console.log(payload);
      const res = yield call(addMyWifeFood, payload);
      return res;
    },
    // 删除吃的食物
    *deleteMyWifeFood({ payload }, { call }) {
      const res = yield call(deleteMyWifeFood, payload);
      return res;
    },
    // 更新吃的食物
    *updateMyWifeFood({ payload }, { call }) {
      const res = yield call(updateMyWifeFood, payload);
      return res;
    },
    // 算法推荐吃的食物
    *recommendMyWifeFood({ payload }, { call }) {
      const res = yield call(recommendMyWifeFood, payload);
      return res;
    },
    // 删除标签
    *deleteTag({ payload }, { call }) {
      const res = yield call(deleteTag, payload);
      return res;
    },
  },
  reducers: {
    /* 更新状态（通用） */
    update: (state, { type, ...newState }) => ({
      ...state,
      ...newState,
    }),
  },
};
