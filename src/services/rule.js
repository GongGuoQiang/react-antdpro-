import request from '@/utils/request1';
import configs from '../../config/config';
let baserUrl = configs.baserUrl;
export async function getRuletypeNames() {
  return request(baserUrl + '/ruletypes');
}
