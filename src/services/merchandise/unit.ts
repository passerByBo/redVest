import { request } from 'umi';

export async function getUnitList(
  params: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/unit/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function updateUnit(
  data: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/unit', {
    method: 'PUT',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function addUnit(data: { [key: string]: unknown }, options?: { [key: string]: any }) {
  return request('/product/unit', {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}


export async function deleteUnit(id: string, options?: { [key: string]: any }) {
  return request(`/product/unit/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function exportUnit(
  params: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/product/unit/export', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}


