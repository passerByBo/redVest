import React, { useRef } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
const Withdrawal: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: '提现人ID',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '提现人姓名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '申请日期',
      dataIndex: 'updatedAt',
      valueType: 'textarea',
    },
    {
      title: '本次提现金额',
      dataIndex: 'pre',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '累计提现金额',
      dataIndex: 'pre',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '提现方式',
      dataIndex: 'status',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '审核结果',
      dataIndex: 'status',
      valueType: 'textarea',
    },
    {
      title: '到账日期',
      dataIndex: 'updatedAt',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'desc',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a>审核</a>
      ]
    }
  ]
  return (
    <PageContainer
      header={{
        title: '提现管理',
      }}
    >
      <ProTable<API.RuleListItem, API.PageParams>
        search={{
          labelWidth: 120,
        }}
        headerTitle="提现管理"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
            }}
          >
            <ExportOutlined /> 导出
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

export default Withdrawal;
