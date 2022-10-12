import extend from 'umi-request';

// 登录
export async function login(param) {
  return extend.post('/api/login', { data: param });
}

// 注册
export async function registry(param) {
  return extend.post('/api/registry', { data: param });
}
