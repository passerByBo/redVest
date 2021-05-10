import { request } from 'umi';

export async function getSKUList(
  params: {
    pageNum?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/info/skulist', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
