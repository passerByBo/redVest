import { request } from 'umi';

/**
 * 省市区
 */
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

/**
 * 提现
 */
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

/**
 * 快递模板
 */

export async function getExpressList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/operations/expressTemplate/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}