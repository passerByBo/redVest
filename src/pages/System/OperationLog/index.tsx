import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getOperationList } from '@/services/system/operationLog';
import formatRequestListParams from '@/utils/formatRequestListParams';
const OperationLog: React.FC = () => {
    const columnsOperation = [
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
            valueType: 'textarea',
            search: false,
        }
    ]
    return (
        <PageContainer
            header={{
                title: '操作日志',
            }}
        >
            <ProTable
                headerTitle="操作日志"
                rowKey="id"
                request={formatRequestListParams(getOperationList)}
                columns={columnsOperation}
            />
        </PageContainer>
    )
}
export default OperationLog;
