import { request } from 'umi';

/**
 * 查询列表-卡券制作
 */
export async function getArticleSortList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/marketing/consumerCoupon/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}

/**
 * 查询列表-消费券使用范围列表
 */
export async function getCounponRangeList(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/product/special/typeList', {
        method: 'get',
        params: {
            ...params,
        }
    });
}

/**
 * 查询列表-消费券使用范围列表
 */
export async function getCounponRangeListAdded(
    params: {
        pageSize?: number;
        pageNum?: number;
    },
) {
    return request('/marketing/consumerAllevPoverty/list', {
        method: 'get',
        params: {
            ...params,
        }
    });
}

/**
 * 删除-消费券使用范围列表
 */
export async function removeCounponRangeList(params: { ids: string }) {
    return request(`/marketing/consumerAllevPoverty/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 新建-消费券使用范围
 */
export async function addCounponRangeList(body: any) {
    return request('/marketing/consumerAllevPoverty', {
        method: 'post',
        data: {
            ...body,
        }
    });
}


/**
 * 新建
 */
export async function addArticleSortList(body: any) {
    return request('/marketing/consumerCoupon', {
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
    return request(`/marketing/consumerCoupon/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 更新
 */
export async function updateRule(params: any) {
    return request('/marketing/consumerCoupon', {
        method: 'put',
        data: {
            ...params,
        },
    });
}
