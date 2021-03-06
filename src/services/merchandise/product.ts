import { request } from 'umi';

export async function getProductList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getLoggerList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/info/proUpLog', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getSKUList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/info/skulist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getSepcModel() {
  return request('/product/specModel/product', {
    method: 'GET',
  });
}

export async function onAndOffShelves(
  body: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/product/info/updateProStatus', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

export async function getProductDetail(
  params: { productId?: string },
  options?: { [key: string]: string },
) {
  return request('/product/info/productDetail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function exportProduct(
  params: { [key: string]: any },
  options?: { [key: string]: any },
) {
  console.log('params',params)
  return request('/product/info/export', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function submitForm(body: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/product/info', {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

export async function editForm(body: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/product/info/edit', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

/** ?????????????????? */
export async function getProductTypeList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/type/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ?????????????????? */
export async function exportBrand(
  params: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/product/brand/export', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getBrandList(
  params: { [key: string]: unknown },
  options?: { [key: string]: any },
) {
  return request('/product/brand/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function updateBrand(
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

export async function addBrand(data: { [key: string]: unknown }, options?: { [key: string]: any }) {
  return request('/product/brand', {
    method: 'POST',
    data: {
      ...data,
    },
    ...(options || {}),
  });
}

export async function getBrandDetail(
  params: { [key: string]: unknown },
  options?: { [key: string]: unknown },
) {
  console.log('params', params);
  return request(`/product/brand/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function deleteBrand(id: string, options?: { [key: string]: any }) {
  return request(`/product/brand/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** ?????????????????? */
export async function getSpecialList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/special/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** ?????????????????? */
export async function getSpecialGroupList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/specialGroup/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**??????????????? */
export async function deleteRecycle(
  body: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/product/info/updateProStatus', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

export async function resetRecycle(body: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/product/info/updateProStatus', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}
