import React, { useRef, useState } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule } from '@/services/ant-design-pro/rule';
const ExpressModel: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState([]);

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            search: false,
        },
        {
            title: '单据编号',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '单据名称',
            dataIndex: 'callNo',
            valueType: 'textarea',
        },
        {
            title: '是否启用',
            dataIndex: 'callNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [<a onClick={() => { }}>编辑</a>, <a onClick={() => { }}>删除</a>],
        },
    ]
    return (
        <PageContainer
            header={{
                title: '快递单模板',
            }}
        >
            <ProTable<API.RuleListItem, API.PageParams>
                actionRef={actionRef}
                rowKey="key"
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                        }}
                    >
                        <ExportOutlined />导出
                    </Button>,
                ]}
                request={rule}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows)
                    },
                }}
            />
            {
                selectedRowsState?.length > 0 && (
                    <FooterToolbar
                        extra={
                            <div>
                                已选择{' '}
                                <a
                                    style={{
                                        fontWeight: 600,
                                    }}
                                >
                                    {selectedRowsState.length}
                                </a>{' '}
                                项 &nbsp;&nbsp;
                                <span>
                                </span>
                            </div>
                        }
                    >
                        <Button type='primary' danger>批量删除</Button>
                    </FooterToolbar>
                )
            }
        </PageContainer>
    )
}

export default ExpressModel;
