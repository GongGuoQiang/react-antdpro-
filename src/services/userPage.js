import request from '@/utils/request';
import { rootPath } from '../../config/config';

export async function queryStoreData(params) {
  //添加或编辑
  return request(`${rootPath}/user/store`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryDelData(params) {
  //删除用户
  return request(`${rootPath}/user/destroy`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
//2月 770+1400=2100
//总支出：1255+网费充值100+200=1555元+房租1400=2955元===》  {其他：地铁200+蜂蜜110+3.8红包165+体检124=599元+生活费=660元}
//1600+500+1200+1400=4700元
export async function queryListData(params) {
  //获得用户列表
  return request(`${rootPath}/user/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryProvince() {
  //获得省份列表
  return request(`${rootPath}/province`);
}

export async function queryCity(params) {
  //获得对应城市
  return request(`${rootPath}/city`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
