import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const PackageMaintenance: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '单据编号',
            dataIndex: 'name',
            valueType: 'textarea',
        },
        {
            title: '套餐名称',
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: '套餐标识',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否发布',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '维护时间',
            dataIndex: 'createAt',
            valueType: 'textarea',
        },
        {
            title: '维护人',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        }
    ]
    return (
        <PageContainer
            header={{
                title: '套餐维护',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="套餐维护"
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

export default PackageMaintenance;
