import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';

import { getOperationList } from '@/services/system/operationLog';
import formatRequestListParams from '@/utils/formatRequestListParams';

type TableListItem = {
    operId: string;
    operName: string;
    operTime: string;
    operUrl: string;
    operatorType: number;
};

const columnsOperation: ProColumns<TableListItem>[] = [
    {
        title: '编号',
        dataIndex: 'operId',
        valueType: 'textarea',
        search: false,
    },
    {
        title: '操作人',
        dataIndex: 'operName',
        valueType: 'textarea',
    },
    {
        title: '操作日期',
        dataIndex: 'operTime',
        valueType: 'textarea',
    },
    {
        title: 'IP地址',
        dataIndex: 'operUrl',
        valueType: 'textarea',
    },
    {
        title: '操作记录',
        dataIndex: 'operatorType',
        search: false,
        valueEnum: {
            0: { text: '其它' },
            1: { text: '后台用户' },
            2: { text: '手机端用户' },
        },
    }
]
const OperationLog: React.FC<TableListItem> = () => {
    return (
        <PageContainer
            header={{
                title: '操作日志',
            }}
        >
            <ProTable<TableListItem>
                headerTitle="操作日志"
                rowKey="operId"
                bordered
                request={formatRequestListParams(getOperationList)}
                columns={columnsOperation}
            />
        </PageContainer>
    )
}
export default OperationLog;
