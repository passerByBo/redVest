import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const Announcement: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '文章标题',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '文章分类',
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: '文章重要性',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '是否展示',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '外部链接',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '作者',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '发布时间',
            dataIndex: 'createdAt',
            valueType: 'textarea',
        },
    ]
    return (
        <PageContainer
            header={{
                title: '公告管理',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
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

export default Announcement;
