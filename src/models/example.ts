import {
  getMyWifeFood,
  addMyWifeFood,
  deleteMyWifeFood,
  updateMyWifeFood,
  recommendMyWifeFood,
  deleteTag,
} from '@/services/example';
import { HttpResult } from '@/types/HttpResult';
import { Model, Action } from '@/types/Model';
import { Effect, UserState } from 'umi';

export interface ExampleState {
  list: any[];
}

interface ExampleReducers {
  update: (state: ExampleState, action: Action) => ExampleState;
}

type ExampleEffects = {
  [key: string]: Effect;
};

interface ExampleModel extends Model {
  state: ExampleState;
  reducers: ExampleReducers;
  effects: ExampleEffects;
}

export default {
  namespace: 'example',
  state: {
    list: [],
  },
  effects: {
    // 获取已有食物列表
    *getMyWifeFood(
      { payload = {} },
      { call, put, select },
    ): Generator<any, any, any> {
      const { username }: UserState = yield select(
        (state: any) => state.user as UserState,
      );

      const res = yield call(getMyWifeFood, {
        ...payload,
        username: payload.username || username,
      });
      yield put({ type: 'update', list: res?.data });
      return res;
    },
    // 增加吃的食物
    *addMyWifeFood(
      { payload },
      { call },
    ): Generator<HttpResult, any, HttpResult> {
      const res = yield call(addMyWifeFood, payload);
      return res;
    },
    // 删除吃的食物
    *deleteMyWifeFood(
      { payload },
      { call },
    ): Generator<HttpResult, any, HttpResult> {
      const res = yield call(deleteMyWifeFood, payload);
      return res;
    },
    // 更新吃的食物
    *updateMyWifeFood(
      { payload },
      { call },
    ): Generator<HttpResult, any, HttpResult> {
      const res = yield call(updateMyWifeFood, payload);
      return res;
    },
    // 算法推荐吃的食物
    *recommendMyWifeFood(
      { payload },
      { call },
    ): Generator<HttpResult, any, HttpResult> {
      const res = yield call(recommendMyWifeFood, payload);
      return res;
    },
    // 删除标签
    *deleteTag({ payload }, { call }): Generator<HttpResult, any, HttpResult> {
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
} as ExampleModel;
