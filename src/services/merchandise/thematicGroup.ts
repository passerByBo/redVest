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

/**
 * 新建专题组
 *  */
export async function addThematicGroup(body, options?: { [key: string]: any }) {
  console.log('options', options);
  return request('/product/specialGroup', {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}
