import { request } from 'umi';

export async function getThematicGroupList(
  params?: {
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
 *
 *  */
export async function addThematicGroup(body, options?: { [key: string]: any }) {
  return request('/product/specialGroup', {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}
/**
 * 编辑专题组
 *
 *  */
 export async function editThematicGroup(body, options?: { [key: string]: any }) {
  return request('/product/specialGroup', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

export async function getThematicGroupDetail(params:{id:string},options?: { [key: string]: any }){
  return request(`/product/specialGroup/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  });
}


export async function deleteThematicGroup(id:string,options?: { [key: string]: any }){
  return request(`/product/specialGroup/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

