import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';

import { getLoginList } from '@/services/system/operationLog';
import formatRequestListParams from '@/utils/formatRequestListParams';

type TableListItem = {
    infoId: string;
    ipaddr: string;
    loginLocation: string;
    loginTime: string;
    msg: string;
    os: string;
    status: string;
};

const columnsOperation: ProColumns<TableListItem>[] = [
    {
        title: '序号',
        dataIndex: 'infoId',
        valueType: 'textarea',
        search: false,
    },
    {
        title: '登录地址',
        dataIndex: 'ipaddr',
        valueType: 'textarea',
    },
    {
        title: '登录地点',
        dataIndex: 'loginLocation',
        valueType: 'textarea',
    },
    {
        title: '访问时间',
        dataIndex: 'loginTime',
        valueType: 'textarea',
        search: false,
    },
    {
        title: '提示消息',
        dataIndex: 'msg',
        valueType: 'textarea',
        search: false,
    },
    {
        title: '操作系统',
        dataIndex: 'os',
        valueType: 'textarea',
        search: false,
    },
    {
        title: '登录状态',
        dataIndex: 'status',
        valueEnum: {
            0: { text: '成功' },
            1: { text: '失败' },
        },
    }
]

const OperationLog: React.FC = () => {
    return (
        <PageContainer
            header={{
                title: '登录日志',
            }}
        >
            <ProTable<TableListItem>
                headerTitle="登录日志"
                rowKey="infoId"
                bordered
                request={formatRequestListParams(getLoginList)}
                columns={columnsOperation}
            />
        </PageContainer>
    )
}
export default OperationLog;
