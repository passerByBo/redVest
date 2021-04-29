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

// 获取商家认证管理列表
export async function getMerchantCertificateList(
    params: {
        current?: number;
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request('/customer/shopInfo/applyList', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}