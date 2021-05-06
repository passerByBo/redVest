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

/** 商品类型列表 */
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

/** 品牌类型列表 */
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

  export async function addBrand(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
  ) {
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
    console.log('params', params)
    return request(`/product/brand/${params.id}`, {
      method: 'GET',
      ...(options || {}),
    });
  }

  export async function deleteBrand(id:string,options?: { [key: string]: any }){
    return request(`/product/brand/${id}`, {
      method: 'DELETE',
      ...(options || {}),
    });
  }








/** 品牌类型列表 */
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

/** 品牌类型列表 */
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
