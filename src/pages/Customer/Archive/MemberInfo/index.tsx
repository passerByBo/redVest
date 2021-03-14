import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const MemberInfo: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '注册日期',
            dataIndex: 'createdAt',
            valueType: 'textarea',
        },
        {
            title: '企业名称',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '企业类型',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '部门科室名称',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '会员姓名',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '账号',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '员工工号',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '手机号',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '邮箱',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '审核状态',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '表单唯一标识',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },{
            title: '用户类型',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },{
            title: '微信账号',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },{
            title: '企业ID',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },{
            title: '数据迁徙来源ID',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },{
            title: '部门科室ID',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },{
            title: '角色ID',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
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
                title: '会员信息管理',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="会员信息管理"
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

export default MemberInfo;
