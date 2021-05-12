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
 * 新建（保存）
 */
export async function saveApply(body: any) {
    return request('/customer/shopInfo/insert', {
        method: 'POST',
        data: {
            ...body,
        }
    });
}

/**
 * 删除
 */
export async function removeRule(params: { ids: string }) {
    return request(`/customer/journalismType/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 更新
 */
export async function updateRule(params: any) {
    return request('/customer/journalismType', {
        method: 'put',
        data: {
            ...params,
        },
    });
}