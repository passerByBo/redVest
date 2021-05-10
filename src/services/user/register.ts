import { request } from 'umi';

export async function getProvinceList(params?: any, options?: { [key: string]: any }) {
  return request('/operations/provinces/getProvinceList', {
    method: 'GET',
    params: {...params},
    ...(options || {}),
  });
}


export async function register(body: any, options?: { [key: string]: any }){
  return request('/customer/shopInfo/register', {
    method: 'POST',
    data: {...body},
    ...(options || {}),
  });
}
