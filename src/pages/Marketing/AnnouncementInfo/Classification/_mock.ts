// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { parse } from 'url';
import type { TableListItem, TableListParams } from './data.d';

const genList = (current: number, pageSize: number) => {
    const tableListDataSource: TableListItem[] = [];
    for (let i = 0; i < pageSize; i += 1) {
        const index = (current - 1) * 10 + i;
        tableListDataSource.push({
            key: index,
            articleName: [
                '服装配饰',
                '家庭装修',
            ][i % 2] + `${index + 1}`,
            desc: 'XXXXXXXXXXXXX',
            sortLevel: '1',
            parentTypeName: '享受生活',
            sort: Math.floor(Math.random() * 2 + 1) + '',
            isShow: i % 2 === 0 ? '是' : '否',
            keywords: [
                '服装',
                '家具'
            ][i % 2]
        });
    }
    tableListDataSource.reverse();
    return tableListDataSource;
};

let tableListDataSource = genList(1, 5);

function getRule(req: Request, res: Response, u: string) {
    let realUrl = u;
    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    const params = (parse(realUrl, true).query as unknown) as TableListParams;
    const result = {
        data: tableListDataSource,
        total: tableListDataSource.length,
        success: true,
        pageSize,
        current: parseInt(`${params.currentPage}`, 10) || 1,
    };
    return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
    let realUrl = u;
    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
    }

    const body = (b && b.body) || req.body;
    const { method, name, desc, key } = body;

    switch (method) {
        /* eslint no-case-declarations:0 */
        case 'delete':
            tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
            break;
        case 'post':
            (() => {
                const i = Math.ceil(Math.random() * 10000);
                const newRule = {
                    key: tableListDataSource.length,
                    href: 'https://ant.design',
                    avatar: [
                        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
                    ][i % 2],
                    name,
                    owner: '曲丽丽',
                    desc,
                    callNo: Math.floor(Math.random() * 1000),
                    status: (Math.floor(Math.random() * 10) % 2).toString(),
                    updatedAt: new Date(),
                    createdAt: new Date(),
                    progress: Math.ceil(Math.random() * 100),
                };
                // tableListDataSource.unshift(newRule);
                return res.json(newRule);
            })();
            return;

        case 'update':
            (() => {
                let newRule = {};
                tableListDataSource = tableListDataSource.map((item) => {
                    if (item.key === key) {
                        newRule = { ...item, desc, name };
                        return { ...item, desc, name };
                    }
                    return item;
                });
                return res.json(newRule);
            })();
            return;
        default:
            break;
    }

    const result = {
        list: tableListDataSource,
        pagination: {
            total: tableListDataSource.length,
        },
    };

    res.json(result);
}

export default {
    'GET /api/article': getRule,
    'POST /api/rule': postRule,
};
