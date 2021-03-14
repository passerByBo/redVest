import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const EnterpriseInfo: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false
        },
        {
            title: '单位编号',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false
        },
        {
            title: '申请时间',
            dataIndex: 'createdAt',
            valueType: 'textarea',
            search: false
        },
        {
            title: '企业名称',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '企业类型',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '纳税人识别号',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '所在省',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false
        },
        {
            title: '所在市',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false
        },
        {
            title: '详细地址',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false
        },
        {
            title: '姓名',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false
        },
        {
            title: '职务',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false
        },
        {
            title: '手机号',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false
        },
        {
            title: '邮箱',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false
        },
        {
            title: '是否审核通过',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false
        }
    ]
    return (
        <PageContainer
            header={{
                title: '企业信息管理',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="企业信息管理"
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

export default EnterpriseInfo;
