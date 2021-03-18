import { Request, Response } from 'express';
import { parse } from 'url';
//商品数据类型
type ProductBrandListItem = {
    id: string,
    topicName: string,
    productBrandId: string,
    isEffective: string,
    isShow: string,
    isRecommented: string,
    [key: string]: string,
}
const PgenProductBrandList = (current: number, pageSize: number) => {
    const productListSource = [];
    let topicNameArr = ['浴室', '门厅', '客厅', '卧室', '厨房', '卫生间', '儿童房']
    for (let i = 0; i < pageSize; i++) {
        let randIndex = Math.round(Math.random() * 6);
        const index = (current - 1) * 10 + i;
        productListSource.push({
            id: 'XSAD-SWDA-AADW' + index,
            topicName: topicNameArr[randIndex],
            productBrandId: index,
            imageType: '下载附件',
            isEffective: ['是', '否'][i % 2],
            isShow: ['是', '否'][i % 2],
            isRecommented: ['是', '否'][i % 2],
        });
    }

    productListSource.reverse();
    return productListSource;
};

let orderListDataSource = PgenProductBrandList(1, 100);
async function getProductBrandList(req: Request, res: Response, u: string) {
    let realUrl = u;
    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    const params = (parse(realUrl, true).query as unknown) as ProductBrandListItem & {
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
    'GET /product/brand/list': getProductBrandList,
};
