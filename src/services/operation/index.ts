import { request } from 'umi';

export async function getAreaList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/operations/provinces/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}

export async function getWithdrawList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/operations/extractApply/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}