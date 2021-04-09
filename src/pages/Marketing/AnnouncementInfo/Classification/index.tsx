import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';


const Classification: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const columns: ProColumns<TableListItem>[] = [
        {
            title: '序号',
            dataIndex: 'key',
            valueType: 'index',
            search: false,
        },
        {
            title: '文章分类名称',
            dataIndex: 'articleName',
            valueType: 'textarea',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '分类级别',
            dataIndex: 'sortLevel',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '上级分类名称',
            dataIndex: 'parentTypeName',
            valueType: 'textarea',
        },
        {
            title: '排序',
            dataIndex: 'sort',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否显示在导航栏',
            dataIndex: 'isShow',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '关键字',
            dataIndex: 'keywords',
            valueType: 'textarea',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a onClick={() => { console.log(_) }}>编辑</a>,
                <a onClick={() => { console.log(record) }}>删除</a>
            ],
        },
    ]
    return (
        <PageContainer
            header={{
                title: '文章分类管理',
            }}
        >
            <ProTable<TableListItem>
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                        }}
                    >
                        <PlusOutlined /> 新建
          </Button>,
                ]}
                request={(params) => queryRule({ ...params })}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                    },
                }}
            />
        </PageContainer>
    )
}

export default Classification;
