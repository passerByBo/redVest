import { request } from 'umi';

export async function getLabelList(
  params: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/wh/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function updateLabel(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/wh', {
    method: 'PUT',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function addLabel(data: { [key: string]: unknown }, options?: { [key: string]: any }) {
  return request('/product/wh', {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function getLabelDetail(
  params: { [key: string]: unknown },
  options?: { [key: string]: unknown },
) {
  console.log('params', params);
  return request(`/product/wh/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function deleteLabel(id: string, options?: { [key: string]: any }) {
  return request(`/product/wh/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function validLabel(body: any, options?: { [key: string]: any }) {
  return request(`/product/wh/updateStatus`, {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}
