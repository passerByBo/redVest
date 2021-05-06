import { request } from 'umi';

/**
 * 查询
 */
export async function getArticleSortList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/marketing/journalismType/list', {
        method: 'GET',
        params: {
            ...params,
        }
    });
}

/**
 * 新建
 */
export async function addArticleSortList(body: any) {
    return request('/marketing/journalismType', {
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
    return request(`/marketing/journalismType/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 更新
 */
export async function updateRule(params: any) {
    return request('/marketing/journalismType', {
        method: 'put',
        data: {
            ...params,
        },
    });
}
