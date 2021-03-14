import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const Area: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '代码',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '上级代码',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '中文名称',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '省级名称',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '地级市名称',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '县级名称',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '邮政编码',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '有效性',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
    ]
    return (
        <PageContainer
            header={{
                title: '省市区管理',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                search={false}
                headerTitle="省市区管理"
                actionRef={actionRef}
                rowKey="key"
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

export default Area;
