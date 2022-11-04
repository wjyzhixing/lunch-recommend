// import extend from 'umi-request';
import fetch from '@/utils/fetch';
//
// export async function postExample(param) {
//     return fetch.post('/api/postExample', { data: param });
// }

// 获取已有食物列表
export async function getMyWifeFood(param) {
  return fetch.post('/api/getMyWifeFood', { data: param });
}

// 增加吃的食物
export async function addMyWifeFood(param) {
  return fetch.post('/api/addMyWifeFood', { data: param });
}

// 删除吃的食物
export async function deleteMyWifeFood(param) {
  return fetch.post('/api/deleteMyWifeFood', { data: param });
}

// 更新吃的食物
export async function updateMyWifeFood(param) {
  return fetch.post('/api/updateMyWifeFood', { data: param });
}

// 算法推荐吃的食物
export async function recommendMyWifeFood(param) {
  return fetch.post('/api/recommendMyWifeFood', { data: param });
}

// 随机食物列表接口
export async function getRandomFoodList(param) {
  return fetch.post('/api/getRandomFoodList', { data: param });
}

// 修改随机食物列表接口
export async function updateRandomFoodList(param) {
  return fetch.post('/api/updateRandomFoodList', { data: param });
}

// 打标签
export async function addTagIfExpensive(param) {
  return fetch.post('/api/addTagIfExpensive', { data: param });
}

// 删除标签
export async function deleteTag(param) {
  return fetch.post('/api/deleteTag', { data: param });
}
