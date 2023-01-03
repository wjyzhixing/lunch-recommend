export interface Model {
  namespace: string;
  state?: Record<string, any>;
  effects?: Record<string, any>;
  reducers?: Record<string, any>;
}

export interface Action {
  type: string;
  payload?: any;
  [k: string]: any;
}
