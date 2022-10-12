import {} from '@/services/user';

export default {
  namespace: 'user',
  state: {
    username: '',
  },
  effects: {},
  reducers: {
    /* 更新状态（通用） */
    update: (state, { type, ...newState }) => ({
      ...state,
      ...newState,
    }),
  },
};
