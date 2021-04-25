import { request } from 'umi';

export async function login(
  body: any, options?: { [key: string]: any }
) {
  return request('/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
