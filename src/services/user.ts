import extend from 'umi-request';

// 登录
export async function login(param) {
  return extend.post('/api/login', { data: param });
}

// 注册
export async function registry(param) {
  return extend.post('/api/registry', { data: param });
}

// 请求个人信息
export async function showUserInfo(param) {
  return extend.post('/api/showUserInfo', { data: param });
}

// 修改个人信息
export async function updateUserInfo(param) {
  return extend.post('/api/updateUserInfo', { data: param });
}
