import { request } from 'umi';

export async function getHomeData(options?: { [key: string]: any }) {
  return request('/mystore/homepageAnalysis', {
    method: 'GET',
    ...(options || {}),
  });
}
