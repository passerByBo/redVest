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