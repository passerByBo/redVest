import { request } from 'umi';

export async function getMerchandiseTypeList(
  params?: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/type/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function updateMerchandiseType(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/type', {
    method: 'PUT',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function addMerchandiseType(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/type', {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function getMerchandiseTypeDetail(
  params: { [key: string]: unknown },
  options?: { [key: string]: unknown },
) {
  console.log('params', params)
  return request(`/product/type/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function deleteMerchandiseType(id:string,options?: { [key: string]: any }){
  return request(`/product/type/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function exportMerchandiseType(
  params: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/product/type/export', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

