import { request } from 'umi';

export async function getImgGroupList(params?: any, options?: { [key: string]: any }) {
  return request('/product/imagMaterialLibGroup/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getImgList(
  params?: {
    pageNum?: number;
    pageSize?: number;
  },
  other?: { [key: string]: any },
) {
  return request('/product/imagMaterialLib/list', {
    method: 'GET',
    params: { ...params, ...(other || {}) },
  });
}

export async function addGroup(body?: any, options?: { [key: string]: any }) {
  return request('/product/imagMaterialLibGroup', {
    method: 'POST',
    data: { ...body },
    ...(options || {}),
  });
}

export async function uploadPictures(formData: any, options?: { [key: string]: any }) {
  return request('/product/imagMaterialLib', {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

export async function deletePictures(params: { ids: string }) {
  return request('/product/imagMaterialLib/' + params.ids, {
    method: 'DELETE',
  });
}
