import request from '@/utils/request';
import configs from '../../config/config';
let baserUrl = configs.manifest.basePath;
export async function fakeAccountLogin(params) {
  return request(baserUrl + '/user/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
