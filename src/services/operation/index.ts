import { request } from 'umi';

/**
 * 省市区-列表查询
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
 * 省市区-删除
 */
export async function removeArea(params: { ids: string }) {
    return request(`/operations/provinces/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 省市区-新建
 */
export async function addArea(body: any) {
    return request('/operations/provinces', {
        method: 'POST',
        data: {
            ...body,
        }
    });
}

/**
 * 提现-列表
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
 * 提现-审核
 */
export async function updateWithdrawList(params: any) {
    return request('/operations/extractApply', {
        method: 'put',
        data: {
            ...params,
        },
    });
}

/**
 * 快递模板-列表
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

/**
 * 快递模板-是否启用
 */
export async function updateExpressList(params: any) {
    return request('/operations/expressTemplate', {
        method: 'put',
        data: {
            ...params,
        },
    });
}

/**
 * 快递模板-删除
 */

export async function removeExpressList(params: { ids: string }) {
    return request(`/operations/expressTemplate/${params.ids}`, {
        method: 'delete',
    });
}

