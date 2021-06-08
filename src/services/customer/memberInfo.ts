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
    return request('/customer/regisepersion/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}

//导出
export async function exportExcel(
    params: { id: string },
    options?: { [key: string]: any },
) {
    return request('/customer/regisepersion/export', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
}
