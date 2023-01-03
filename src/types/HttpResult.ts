export interface HttpResult<T = any> {
  code: number;
  data: T;
  result: string;
  message: string;
}
