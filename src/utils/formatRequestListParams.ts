export default function formatRequestListParams(request: Function, other?: any) {
  return async (params: any, sort: any, filter: any) => {

    const current = params.current;
    delete params.current;
    const res = await request({
      ...params,
      ...sort,
      ...filter,
      pageNum: current,
      ...other
    });
    return {
      data: res.data.rows || res.rows,
      success: true, //根据res判断为true还是false，false不会解析列表
      total: res.total,
    };
  };
}
