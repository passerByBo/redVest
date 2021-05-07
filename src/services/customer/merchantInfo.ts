import { request } from 'umi';

/**
 * 查询列表
 */
export async function getList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/customer/shopInfo/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}

export async function getDetail(params: { id: string }, options?: { [key: string]: any }) {
    return request(`/customer/shopInfo/${params.id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

export async function getMerchantList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/product/info/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}