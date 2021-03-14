import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const Classification: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '分类名称',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '级别',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '上级分类名称',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '排序',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否显示在导航栏',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '关键字',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
    ]
    return (
        <PageContainer
            header={{
                title: '分类管理',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="分类管理"
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
                request={rule}
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
