import { request } from 'umi';

/**
 * 查询列表
 */
export async function getArticleSortList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },

) {
    return request('/marketing/consumerCoupon/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}

/**
 * 新建
 */
export async function addArticleSortList(body: any) {
    return request('/marketing/consumerCoupon', {
        method: 'post',
        data: {
            ...body,
        }
    });
}

/**
 * 删除
 */
export async function removeRule(params: { ids: string }) {
    return request(`/marketing/consumerCoupon/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 更新
 */
export async function updateRule(params: any) {
    return request('/marketing/consumerCoupon', {
        method: 'put',
        data: {
            ...params,
        },
    });
}
