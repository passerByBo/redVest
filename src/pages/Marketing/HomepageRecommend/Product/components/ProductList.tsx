import React from 'react';
import ProTable from '@ant-design/pro-table';
import { getLoginList } from '@/services/system/operationLog';
import formatRequestListParams from '@/utils/formatRequestListParams';
export type UpdateFormProps = {
    useData: (values: any) => void;
};
const OperationLog: React.FC<UpdateFormProps> = (props) => {

    const { useData } = props;

    const columnsOperation = [
        {
            title: '序号',
            dataIndex: 'operId',
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
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a onClick={() => { useData(record) }}>使用</a>
            ],
        },
    ]
    return (
        <ProTable
            headerTitle="操作日志"
            rowKey="loginTime"
            bordered
            toolBarRender={false}
            search={false}
            request={formatRequestListParams(getLoginList)}
            columns={columnsOperation}
        />
    )
}
export default OperationLog;
