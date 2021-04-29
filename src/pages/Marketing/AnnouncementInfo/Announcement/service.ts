import request from 'umi-request';
import type { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
    return request('/marketing/journalismType/list', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

export async function removeRule(params: { key: number[] }) {
    return request('/api/announcement', {
        method: 'POST',
        data: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addRule(params: TableListParams) {
    return request('/api/announcement', {
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateRule(params: TableListParams) {
    return request('/api/announcement', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        },
    });
}
