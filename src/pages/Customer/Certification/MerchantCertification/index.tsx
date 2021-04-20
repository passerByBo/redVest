import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Modal, Input, Form, Select, Table, Card, Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import type { MerchantCertificationListItem } from './data';
import FlowStep from './components/FlowStep'

const MerchantCertification: React.FC = () => {

    const [flowStepVisible, setFlowStepVisible] = useState<boolean>(false);
    const [statusKey, setStatusKey] = useState<string>('1');
    const [btnIndex, setBtnIndex] = useState<number>(0);
    const onTabChange = (key: string) => {
        setStatusKey(key)
    };

    const onBtnClick = (item: number) => {
        setBtnIndex(item);
        setFlowStepVisible(true);
    };

    const onCancel = () => {
        setFlowStepVisible(false);
    };

    const columns: ProColumns<MerchantCertificationListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
        },
        {
            title: '来自',
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: '标题',
            dataIndex: 'name',
            valueType: 'textarea'
        },
        {
            title: '类型',
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
        },
        {
            title: '审核结果',
            dataIndex: 'name',
            valueType: 'textarea',
            search: statusKey === '1' ? false : undefined,
            hideInTable: statusKey === '1'
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            hideInTable: statusKey !== '3',
            render: (_, record) => [
                <a onClick={() => { onBtnClick(0) }}>跟踪</a>,
                <a onClick={() => { onBtnClick(1) }}>催办</a>,
                <a onClick={() => { onBtnClick(2) }}>撤销</a>],
        },
    ]


    return (
        <>
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
                    }
                ]}
                onTabChange={onTabChange}
            >
                <ProTable
                    headerTitle="商家认证管理"
                    options={{ search: false, fullScreen: false, reload: true, setting: false, density: false }}
                    rowKey="key"
                    search={{
                        labelWidth: 100,
                        defaultCollapsed: false,
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
            <FlowStep visible={flowStepVisible} onCancel={onCancel} btnIndex={btnIndex} />
        </>
    )
}
export default MerchantCertification;
