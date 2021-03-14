import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const BusinessInfo: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '商户名称',
            dataIndex: 'name',
            valueType: 'textarea',
            sorter: (a, b) => 2-1,
        },
        {
            title: '申请时间',
            dataIndex: 'createdAt',
            valueType: 'textarea',
            search: false,
            sorter: (a, b) => 2-1,
        },
        {
            title: '企业名称',
            dataIndex: 'name',
            valueType: 'textarea',
            sorter: (a, b) => 2-1,
        },
        {
            title: '所属代理商',
            dataIndex: 'status',
            valueType: 'textarea',
            sorter: (a, b) => 2-1,
        },
        {
            title: '联系方式',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
            sorter: (a, b) => 2-1,
        },
        {
            title: '商户状态',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
            sorter: (a, b) => 2-1,
        },
        {
            title: '操作',
            key: 'option',
            width: 120,
            valueType: 'option',
            render: (_, record) => [
                <a key="link">商品列表</a>,
                <a key="link">订单列表</a>,
            ],
        }
    ]
    return (
        <PageContainer
            header={{
                title: '商家信息管理',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="商家信息管理"
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

export default BusinessInfo;
