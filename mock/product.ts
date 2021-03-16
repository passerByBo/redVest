import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';
//商品数据类型
type ProductListItem = {
  id: string,
  productName: string,
  shopId: string,
  shopName: string,
  topicName: string,
  productNo: string,
  categories: string,
  productSpecify: string,
  productBrand: string,
  productBrandId: string,
  shelfOnDate: string,
  salePrice: string,
  shareRatio: string,
  [key: string]: string,
}
const genProductList = (current: number, pageSize: number) => {
  const productListSource = [];
  let topicNameArr = ['浴室','门厅','客厅','卧室','厨房','卫生间','儿童房']
  for (let i = 0; i < pageSize; i++) {
    let randIndex = Math.round(Math.random() * 6);
    const index = (current - 1) * 10 + i;
    productListSource.push({
      id: 'XSAD-SWDA-AADW' + index,
      productName: '中国蓝星BLUESTAR除菌除臭剂50g*12块 双色蓝泡泡马桶除臭去异味神器厕所家用卫生间清香型味清洁剂宝' + index,
      shopId:'WDAS-KIJH-OIUN-0' + index,
      shopName: '红背心自营商城',
      topicName: topicNameArr[randIndex],
      productNo: '1231232'+ index,
      categories: '商城' + topicNameArr[randIndex],
      productSpecify: '鞋袜鞋柜除臭剂100ml',
      productBrand: '蓝星',
      productBrandId: index,
      shelfOnDate: '2021-01-14 16:43:40',
      salePrice:49.90 * randIndex +1,
      shareRatio: 5 * randIndex + '%',
    });
  }

  productListSource.reverse();
  return productListSource;
};

let orderListDataSource = genProductList(1, 100);
async function getProductList(req: Request, res: Response, u: string){
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as ProductListItem &  {
      sorter: any;
      filter: any;
    };
    let dataSource = [...orderListDataSource].slice(
      ((current as number) - 1) * (pageSize as number),
      (current as number) * (pageSize as number),
    );

    const sorter = JSON.parse(params.sorter || ('{}' as any));
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.orderNumber) {
    dataSource = dataSource.filter((data) => data?.orderNumber?.includes(params.orderNumber || ''));
  }
  const result = {
    data: dataSource,
    total: orderListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}



export default {
  'GET /product/info/list': getProductList,
};
