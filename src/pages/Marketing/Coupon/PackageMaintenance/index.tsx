import React, { useState, useRef } from 'react';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule } from '@/services/ant-design-pro/rule';
import AddPackageModal from './components/AddPackageModal'

import type { TableListItem } from './data.d';
import { getArticleSortList, addArticleSortList, removeRule, updateRule } from '@/services/marketing/packageMaintenance';
import formatRequestListParams from '@/utils/formatRequestListParams';

const PackageMaintenance: React.FC = () => {
    const [statusKey, setStatusKey] = useState<string>('审核通过');
    const [addCouponModalVisible, setAddCouponModalVisible] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();

    const onFinish = () => {
        // handleAdd(newData);
        // if (actionRef.current) {
        //     actionRef.current.reload();
        // }
        setAddCouponModalVisible(false);
    };

    const onTabChange = (key: string) => {
        setStatusKey(key)
        actionRef.current?.reloadAndRest?.();
    };


    const toolBarRenderList = [
        (
            <Button type="primary" key="primary" onClick={() => { setAddCouponModalVisible(true) }}>
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
            dataIndex: 'billno',
            valueType: 'textarea',
        },
        {
            title: '套餐名称',
            dataIndex: 'mealName',
            valueType: 'textarea',
        },
        {
            title: '套餐标识',
            dataIndex: 'mealId',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否发布',
            dataIndex: 'isrelease',
            valueType: 'textarea',
        },
        {
            title: '创建人',
            dataIndex: 'applyman',
            valueType: 'textarea',
        },
        {
            title: '创建时间',
            dataIndex: 'applyDate',
            valueType: 'textarea',
        },
        {
            title: '时效状态',
            dataIndex: 'mealId',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '审核状态',
            dataIndex: 'mealId',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '有效起始日期',
            dataIndex: 'startDate',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '有效截止日期',
            dataIndex: 'endDate',
            valueType: 'textarea',
            search: false,
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
                title: '套餐维护',
            }}
            tabList={
                [
                    {
                        tab: '审核通过套餐',
                        key: '审核通过'
                    },
                    {
                        tab: '审核未通过套餐',
                        key: '审核未通过'
                    }
                ]
            }
            onTabChange={onTabChange}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle="套餐维护"
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 100,
                    defaultCollapsed: false
                }}
                toolbar={{ actions: toolBarRenderList }}
                request={formatRequestListParams(getArticleSortList, { status: statusKey })}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                    },
                }}
            />
            <AddPackageModal
                visible={addCouponModalVisible}
                onCancel={() => setAddCouponModalVisible(false)}
                onFinish={onFinish}
            />
        </PageContainer>
    )
}

export default PackageMaintenance;
