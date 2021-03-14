import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const MerchantCertification: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
        },
        {
            title: '来自',
            dataIndex: 'desc',
            valueType: 'textarea',
            search: false
        },
        {
            title: '标题',
            dataIndex: 'name',
            valueType: 'textarea'
        },
        {
            title: '接收时间',
            dataIndex: 'updatedAt',
            valueType: 'textarea',
            search: false
        },
        {
            title: '期限',
            dataIndex: 'updatedAt',
            valueType: 'textarea',
            search: false
        }
    ]
    return (
        <PageContainer
            header={{
                title: '商家认证管理',
            }}
            tabList={[
                {
                    tab: '代办',
                    key: '1',
                },
                {
                    tab: '已办',
                    key: '2',
                },
                {
                    tab: '发起',
                    key: '3',
                },
                {
                    tab: '说明',
                    key: '4',
                },
            ]}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="企业认证管理"
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

export default MerchantCertification;
