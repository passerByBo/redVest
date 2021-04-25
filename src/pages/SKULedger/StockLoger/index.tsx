import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import React, { useRef } from 'react';
import { history } from 'umi';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import { ExportOutlined } from '@ant-design/icons';
const StockLoger: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns = [
    {
      title: '操作时间',
      dataIndex: 'updatedAt',
      search: false
    },
    {
      title: '操作人',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '原库存',
      dataIndex: 'callNo',
      search: false
    },
    {
      title: '修改后库存',
      dataIndex: 'callNo',
      search: false
    },
    {
      title: '备注',
      dataIndex: 'callNo',
      search: false
    },
  ]

  const { location: { pathname, query } } = history;


  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
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
      <FooterToolbar
        extra={
          <div>
            <b style={{ marginRight: 20 }}>合计</b>
            <Space >
              <span>原库存总量：300</span>
              <span>修改后库存总量：2300</span>
            </Space>
          </div>
        }
      >
      </FooterToolbar>
    </PageContainer>
  )
}

export default StockLoger;
