import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';
//订单数据类型
interface OrderListItem {
  id: string,
  orderNumber: string,
  orderTime: string,
  userName: string,
  receiver: string,
  consigneePhone: string,
  province: string,
  city: string,
  area: string,
  address: string,
  paymentMethod: string,
  ownedBusiness: string,
  totalAmount: string,
  amountsPayable: string,
  status: string,
}
const genOrderList = (current: number, pageSize: number) => {
  const orderListSource = [];
  let statusList = ['待付款', '待发货', '待收货', '已完成', '已关闭', '已取消'];
  for (let i = 0; i < pageSize; i++) {
    let randIndex = Math.round(Math.random() * 6);
    const index = (current - 1) * 10 + i;
    orderListSource.push({
      id: 'ddddddddddddddd' + index,
      orderNumber: 'xxxxxxxxxxxxxxx' + index,
      orderTime: moment().format('YYYY-MM-DD'),
      userName: '红背心' + index,
      receiver: '红背心商城',
      consigneePhone: '13223453456' + (index % 2),
      province: '陕西省',
      city: '西安市',
      area: '高新区',
      address: '茶张路团结南路十字西南角',
      paymentMethod: index % 2 ? '支付宝' : '微信',
      ownedBusiness: '红背心自营',
      totalAmount: index * 2.34,
      amountsPayable: index * 2.34,
      status: statusList[randIndex],
    });
  }

  orderListSource.reverse();
  return orderListSource;
};
let orderListDataSource = genOrderList(1, 100);
function getOrderList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as OrderListItem &  {
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
  'GET /order/list': getOrderList,
};
