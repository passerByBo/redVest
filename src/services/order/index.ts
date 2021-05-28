import { request } from 'umi';

export async function orderList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function goShip(
  params: {
    id?: string;
    orderNo?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/order/deliveryGoods', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function orderRemark(
  params: {
    id?: string;
    orderNo?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/order/updateOrder', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getOrderDetails(
  params: {
    orderNo: string;
  },
  options?: { [key: string]: any },
) {
  return request('/order/orderDetails', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getDeliveryType(options?: { [key: string]: any }) {
  return request('/order/getDeliveryType', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function updateDeliveryInfo(body: any, options?: { [key: string]: any }) {
  return request('/order/updateDeliveryInfo', {
    method: 'PUT',
    params: { ...body },
    ...(options || {}),
  });
}

export async function refundOrder(body?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/order/refundOrder', {
    method: 'POST',
    data: { ...body },
    ...(options || {}),
  });
}

export async function exportOrder(
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request('/order/cancel/export', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
