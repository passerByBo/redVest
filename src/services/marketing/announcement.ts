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
    return request('/marketing/journalismInfo/list', {
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
    return request('/marketing/journalismInfo', {
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
    return request(`/marketing/journalismInfo/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 更新
 */
export async function updateRule(params: any) {
    return request('/marketing/journalismInfo', {
        method: 'put',
        data: {
            ...params,
        },
    });
}
