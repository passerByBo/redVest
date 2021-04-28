import { request } from 'umi';

export async function queryCurrentUser( options?: { [key: string]: any }) {
  return request('/getInfo', {
    method: 'get',
    ...(options || {}),
  });
}
