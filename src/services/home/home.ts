import { request } from 'umi';

export async function getHomeData(body: any, options?: { [key: string]: any }) {
  return request('/mystore/homepageAnalysis', {
    method: 'GET',
    ...(options || {}),
  });
}
