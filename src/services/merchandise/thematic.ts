import { request } from 'umi';

export async function getThematicList(
  params: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/special/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function updateThematic(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/special', {
    method: 'PUT',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function addThematic(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/special', {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function getThematicDetail(
  params: { [key: string]: unknown },
  options?: { [key: string]: unknown },
) {
  console.log('params', params)
  return request(`/product/special/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function deleteThematic(id:string,options?: { [key: string]: any }){
  return request(`/product/special/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function exportThematic(
  params: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/product/special/export', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}


