import { request } from 'umi';

export async function getProvinceList(params: any, options?: { [key: string]: any }) {
  return request('/operations/provinces/getProvinceList', {
    method: 'POST',
    params: params,
    ...(options || {}),
  });
}
