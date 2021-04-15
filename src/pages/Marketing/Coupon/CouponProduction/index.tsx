import React, { useRef } from 'react';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';


const CouponProduction: React.FC = () => {


    const actionRef = useRef<ActionType>();

    const onTabChange = (key: string) => {
        console.log(key);
    };

    const toolBarRenderList = [
        (
            <Button type="primary" key="primary" onClick={() => { }}>
                <PlusOutlined />新建
            </Button>
        ), (
            <Button key="delete" danger onClick={() => { }}>
                <DeleteOutlined />删除
            </Button>
        ), (
            <Button key="export" onClick={() => { }}>
                <ExportOutlined />导出
            </Button>
        )
    ]








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
            title: '卡券名称',
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: '使用类型',
            dataIndex: 'name',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '卡券数量',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '单一卡券金额',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '采购总金额',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '时效状态',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '审核状态',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '有效期开始日期',
            dataIndex: 'createdAt',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '有效期结束日期',
            dataIndex: 'createdAt',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '创建人',
            dataIndex: 'createdAt',
            valueType: 'textarea',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            valueType: 'textarea',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a onClick={() => { }}>编辑</a>,
                <a onClick={() => { }}>下架</a>
            ],
        },
    ]
    return (
        <PageContainer
            header={{
                title: '卡券制作',
            }}
            tabList={
                [
                    {
                        tab: '审核通过卡券',
                        key: 'passed'
                    },
                    {
                        tab: '审核未通过卡券',
                        key: 'denied'
                    }
                ]
            }
            onTabChange={onTabChange}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="卡券制作"
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 100,
                    defaultCollapsed: false
                }}
                toolbar={{ actions: toolBarRenderList }}
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

export default CouponProduction;
