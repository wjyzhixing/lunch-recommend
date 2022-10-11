import extend from 'umi-request';

//
// export async function postExample(param) {
//     return extend.post('/api/postExample', { data: param });
// }

// 获取已有食物列表
export async function getMyWifeFood(param) {
  return extend.get('/api/getMyWifeFood', { data: param });
}

// 增加吃的食物
export async function addMyWifeFood(param) {
  return extend.post('/api/addMyWifeFood', { data: param });
}

// 删除吃的食物
export async function deleteMyWifeFood(param) {
  return extend.post('/api/deleteMyWifeFood', { data: param });
}

// 更新吃的食物
export async function updateMyWifeFood(param) {
  return extend.post('/api/updateMyWifeFood', { data: param });
}

// 算法推荐吃的食物
export async function recommendMyWifeFood(param) {
  return extend.post('/api/recommendMyWifeFood', { data: param });
}

// 随机食物列表接口
export async function getRandomFoodList(param) {
  return extend.get('/api/getRandomFoodList', { data: param });
}

// 修改随机食物列表接口
export async function updateRandomFoodList(param) {
  return extend.post('/api/updateRandomFoodList', { data: param });
}
