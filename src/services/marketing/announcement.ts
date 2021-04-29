import { request } from 'umi';

/**
 * 查询列表
 */
export async function getArticleSortList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
    options?: { [id: string]: any },
) {
    return request('/marketing/journalismInfo/list', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/**
 * 新建
 */
export async function addArticleSortList(body, options?: { [key: string]: any }) {
    console.log('options', options);
    return request('/marketing/journalismType', {
        method: 'POST',
        data: {
            ...body,
        },
        ...(options || {}),
    });
}

/**
 * 删除
 */
export async function removeRule(params: { ids: string }) {
    return request('/marketing/journalismType', {
        method: 'POST',
        data: {
            ...params,
        },
    });
}

/**
 * 更新
 */
export async function updateRule(params) {
    return request('/marketing/journalismType', {
        method: 'POST',
        data: {
            ...params,
        },
    });
}
