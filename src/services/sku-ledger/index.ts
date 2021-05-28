import { request } from 'umi';

export async function getSKUList(
  params: {
    pageNum?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/info/skulist', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getSkuOrder(
  params: {
    pageNum?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/info/skuorder', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function skuOrderExport(
  params: {
    [key: string]: any;
  },
  options?: { [key: string]: any },
) {
  //sku接口待开发
  return request('/product/info/skuExport', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
