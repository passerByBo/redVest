import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import React, { useRef } from 'react';
import { history } from 'umi';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import { ExportOutlined } from '@ant-design/icons';
const OutStockCount: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns = [
    {
      title: '订单号',
      dataIndex: 'name',
    },
    {
      title: '下单时间',
      dataIndex: 'desc',
      valueType: 'updatedAt',
      search: false
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      title: '成本价',
      dataIndex: 'callNo',
      search: false
    },
    {
      title: '销售价',
      dataIndex: 'callNo',
      search: false
    },
    {
      title: '数量',
      dataIndex: 'callNo',
      search: false
    },
    {
      title: '成本总价',
      dataIndex: 'callNo',
      search: false
    },
    {
      title: '销售总价',
      dataIndex: 'callNo',
      search: false
    },
  ]

  const { location: { query } } = history;


  return (
    <PageContainer title={`货号${query.id}出库清单`}>
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
             <b style={{marginRight: 20}}>合计</b>
             <Space >
               <span>数量：300</span>
               <span>成本总价：￥300123123123</span>
               <span>销售总价：￥300</span>
             </Space>
            </div>
          }
        >
        </FooterToolbar>
    </PageContainer>
  )
}

export default OutStockCount;
