import { request } from 'umi';

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
 * 查询列表-卡券管理
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
 * 卡券管理新建&更新
 */
export async function updateItem(body: any) {
    return request('/marketing/consumerCoupon', {
        method: 'post',
        data: {
            ...body,
        }
    });
}

/**
 * 卡券管理删除
 */
export async function removeItem(params: { ids: string }) {
    return request(`/marketing/consumerCoupon/${params.ids}`, {
        method: 'delete',
    });
}

/**
 * 办理
 */
export async function handletransact(body: any) {
    return request('/marketing/consumerCoupon/handle', {
        method: 'post',
        data: {
            ...body,
        }
    });
}

/**
 * 卡券管理主表
 */
export async function getItemDetail(
    params: { [key: string]: unknown },
    options?: { [key: string]: unknown },
) {
    return request(`/marketing/consumerCoupon/${params.id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

//导出
export async function exportExcel(
    params: { id: string },
    options?: { [key: string]: any },
) {
    return request('/product/specialGroup/export', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
}
