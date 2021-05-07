import { request } from 'umi';

export async function getTopicList(
    params: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendSubject/list', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
}


export async function updateTopic(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendSubject', {
        method: 'PUT',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function addTopic(
    data: { [key: string]: unknown },
    options?: { [key: string]: any },
) {
    return request('/mall/recommendSubject', {
        method: 'POST',
        data: {
            ...data,
        },
        ...(options || {}),
    });
}

export async function getTopicDetail(
    params: { [key: string]: unknown },
    options?: { [key: string]: unknown },
) {
    console.log('params', params)
    return request(`/mall/recommendSubject/${params.id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

export async function deleteTopic(id: string, options?: { [key: string]: any }) {
    return request(`/mall/recommendSubject/${id}`, {
        method: 'DELETE',
        ...(options || {}),
    });
}