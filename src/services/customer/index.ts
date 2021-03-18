import { request } from 'umi';

export async function getShopInfoList(
    params: {
        current?: number;
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request('/customer/shopInfo/list', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

export async function getRegiseperInfoList(
    params: {
        current?: number;
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request('/customer/regiseperinfo/list', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}