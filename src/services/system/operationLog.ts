import { request } from 'umi';

export async function getOperationList(
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

export async function getLoginList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/monitor/logininfor/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}