import {} from '@/services/user';
import { Model, Action } from '@/types/Model';

export interface UserState {
  username: string;
  id: number;
}

interface UserReducers {
  update: (state: UserState, action: Action) => UserState;
}

interface UserModel extends Model {
  state: UserState;
  reducers: UserReducers;
}

export default {
  namespace: 'user',
  state: {
    username: '',
  },
  reducers: {
    /* 更新状态（通用） */
    update: (state, { type, ...newState }) => ({
      ...state,
      ...newState,
    }),
  },
} as UserModel;
