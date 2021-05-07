import { request } from 'umi';

export async function getBannerList(
    params: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendRotation/list', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
}


export async function updateBanner(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendRotation', {
        method: 'PUT',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function addBanner(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendRotation', {
        method: 'POST',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function getBannerDetail(
    params: { [key: string]: unknown },
    options?: { [key: string]: unknown },
) {
    console.log('params', params)
    return request(`/mall/recommendRotation/${params.id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

export async function deleteBanner(id: string, options?: { [key: string]: any }) {
    return request(`/mall/recommendRotation/${id}`, {
        method: 'DELETE',
        ...(options || {}),
    });
}