import { request } from 'umi';

export async function getAreaList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/monitor/operlog/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}