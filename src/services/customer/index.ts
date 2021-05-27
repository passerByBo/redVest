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
) {
    return request('/customer/shopInfo/applyList', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

/**
 * 新建
 */
export async function updateItem(params: any) {
    return request('/customer/shopInfo/insert', {
        method: 'POST',
        data: {
            ...params,
        }
    });
}

/**
 * 办理
 */
export async function transactItem(params: any) {
    return request('/customer/shopInfo/handle', {
        method: 'POST',
        data: {
            ...params,
        }
    });
}

/**
 * 删除
 */
export async function removeItem(params: { ids: string }) {
    return request(`/customer/shopInfo/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 获取详情
 */
export async function getItemDetail(
    params: { [key: string]: unknown },
    options?: { [key: string]: unknown },
) {
    return request(`/customer/shopInfo/${params.id}`, {
        method: 'GET',
        ...(options || {}),
    });
}
