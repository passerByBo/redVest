import { request } from 'umi';

export async function getSpecModelList(
  params: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/specModel/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function addSpecModelList(
  body: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/specModel', {
    method: 'POST',
    data: { ...body },
    ...(options || {}),
  });
}




export async function updateSpecMode(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/brand', {
    method: 'PUT',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function getSpecModeDetail(
  params: { [key: string]: unknown },
  options?: { [key: string]: unknown },
) {
  console.log('params', params)
  return request(`/product/brand/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function deleteSpecMode(id:string,options?: { [key: string]: any }){
  return request(`/product/brand/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
