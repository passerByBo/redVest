import { request } from 'umi';
export async function getProductList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
){
  return request('/product/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {})
  })
}
