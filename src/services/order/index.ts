import { request } from 'umi';

export async function orderList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {})
  })
}
