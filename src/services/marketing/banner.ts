import { request } from 'umi';

export async function getBrandList(
    params: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/product/brand/list', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
}


export async function updateBrand(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/product/brand', {
        method: 'PUT',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function addBrand(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/product/brand', {
        method: 'POST',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function getBrandDetail(
    params: { [key: string]: unknown },
    options?: { [key: string]: unknown },
) {
    console.log('params', params)
    return request(`/product/brand/${params.id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

export async function deleteBrand(id: string, options?: { [key: string]: any }) {
    return request(`/product/brand/${id}`, {
        method: 'DELETE',
        ...(options || {}),
    });
}