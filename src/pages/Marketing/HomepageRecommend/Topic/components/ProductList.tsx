import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getThematicList } from '@/services/merchandise/thematic';
import formatRequestListParams from '@/utils/formatRequestListParams';

export type UpdateFormProps = {
    useData: (values: any) => void;
};

type TableListType = {
    specialName: string;
    specialDescribe: string;
    specialNameImg1: string;
    isValid: string;
    sort: string;
    id: string;
}

const ProductTable: React.FC<UpdateFormProps> = (props) => {
    const { useData } = props;
    const columnsOperation: ProColumns<TableListType>[] = [
        {
            title: '专题名称',
            dataIndex: 'specialName',
            valueType: 'textarea',
        },
        {
            title: '专题图片',
            dataIndex: 'specialNameImg1',
            valueType: 'textarea',
        },
        {
            title: '专题描述',
            dataIndex: 'specialDescribe',
            valueType: 'textarea',
        },
        {
            title: '是否有效',
            dataIndex: 'isValid',
            valueEnum: {
                Y: { text: '是' },
                N: { text: '否' },
            },

        },
        {
            title: '排序',
            dataIndex: 'sort',
            valueType: 'textarea',
            search: false,
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
            rowKey="id"
            bordered
            pagination={{
                pageSize: 10,
            }}
            toolBarRender={false}
            search={{ labelWidth: 'auto' }}
            request={formatRequestListParams(getThematicList)}
            columns={columnsOperation}
        />
    )
}
export default ProductTable;
