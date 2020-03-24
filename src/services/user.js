import request from '@/utils/request';
import { objToParam } from '@/utils/utils';
import configs from '../../config/config';
let baserUrl = configs.manifest.basePath;

// let baserUrl = 'http://myy-adminapi-test.moerlong.com/v1';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function getEnum() {
  return request(baserUrl + '/common/enum');
}
//分单队列数据
export async function getRuletypeNames() {
  return request(baserUrl + '/ruletypes');
}
// 获取分单队列配置数据
export async function getDataList(params) {
  return request(`${baserUrl}/ruletypes?${objToParam(params)}`);
}
// 删除分单队列配置数据
export const removeRuletypes = id => {
  return request(`${baserUrl}/ruletypes/${id}`, {
    method: 'delete',
  });
};
// 编辑分单队列配置数据
export const editRuletypes = params => {
  return request(`${baserUrl}/ruletypes/${params.id}`, {
    method: 'POST',
    data: {
      ...params.data,
    },
  });
};
// 添加分单队列配置数据
export const createRuletypes = params => {
  return request(`${baserUrl}/ruletypes/`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
};
