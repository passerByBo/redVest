import { request } from 'umi';

export async function getProductList(
    params: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendProduct/list', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
}


export async function updateProduct(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendProduct', {
        method: 'PUT',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function addProduct(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendProduct', {
        method: 'POST',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function getProductDetail(
    params: { [key: string]: unknown },
    options?: { [key: string]: unknown },
) {
    console.log('params', params)
    return request(`/mall/recommendProduct/${params.id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

export async function deleteProduct(id: string, options?: { [key: string]: any }) {
    return request(`/mall/recommendProduct/${id}`, {
        method: 'DELETE',
        ...(options || {}),
    });
}