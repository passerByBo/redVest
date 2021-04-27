import { request } from 'umi';

export async function getThematicGroupList(
  params: {
    pageSize?: number;
    pageNum?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/product/specialGroup/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
