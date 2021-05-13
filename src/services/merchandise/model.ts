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

export async function addSpecModel(
  body: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/specModel/add', {
    method: 'POST',
    data: { ...body },
    ...(options || {}),
  });
}




export async function updateSpecMode(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/specModel', {
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
  return request(`/product/specModel/specDetail`, {
    method: 'GET',
    params:{...params},
    ...(options || {}),
  });
}

export async function deleteSpecMode(id:string,options?: { [key: string]: any }){
  return request(`/product/brand/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


export async function disableModel(body?:any,options?: { [key: string]: any }){
  return request('/product/specModel/disable', {
    method: 'POST',
    data: { ...body },
    ...(options || {}),
  });
}
