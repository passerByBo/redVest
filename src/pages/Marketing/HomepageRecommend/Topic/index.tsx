import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const SharingRules: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '专题名称',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '专题描述',
            dataIndex: 'createAt',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '专题图片',
            dataIndex: 'createAt',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否有效',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '排序',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
    ]
    return (
        <PageContainer
            header={{
                title: '专题精选',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                search={false}
                headerTitle="专题精选"
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

export default SharingRules;
