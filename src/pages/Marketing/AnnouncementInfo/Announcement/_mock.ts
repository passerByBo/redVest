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
                '服装配饰@@1',
                '家庭装修@@1',
            ][i % 2] + `${index + 1}`,
            articleTitle: 'XXXXXXXXXXXXX',
            articleLevel: '1',
            outerLink: '享受生活',
            author: Math.floor(Math.random() * 2 + 1) + '',
            isShow: i % 2 === 0 ? '是' : '否',
            releaseTime: [
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
    console.log('body', body);
    const { method, articleName, articleTitle, key } = body;

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
                    articleName,
                    articleTitle,
                    articleLevel: '1',
                    outerLink: '享受生活',
                    author: Math.floor(Math.random() * 2 + 1) + '',
                    isShow: i % 2 === 0 ? '是' : '否',
                    releaseTime: [
                        '服装',
                        '家具'
                    ][i % 2]
                };
                tableListDataSource.unshift(newRule);
                return res.json(newRule);
            })();
            return;

        case 'update':
            (() => {
                let newRule = {};
                tableListDataSource = tableListDataSource.map((item) => {
                    if (item.key === key) {
                        newRule = { ...item, articleTitle, articleName };
                        return { ...item, articleTitle, articleName };
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
    'GET /api/announcement': getRule,
    'POST /api/announcement': postRule,
};