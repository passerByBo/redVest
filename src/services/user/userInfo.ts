import { request } from 'umi';

export async function queryCurrentUser(token: string, options?: { [key: string]: any }) {
  return request('/getInfo', {
    method: 'get',
    headers: {
      Authorization: token,
    },
    ...(options || {}),
  });
}
