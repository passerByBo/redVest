import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { ExportOutlined } from '@ant-design/icons';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { getSkuOrder } from '@/services/sku-ledger';
const OutStockCount: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
    },
    {
      title: '下单时间',
      dataIndex: 'placeorDate',
      valueType: 'updatedAt',
      search: false
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
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
      dataIndex: 'supplyPrice',
      search: false
    },
    {
      title: '销售价',
      dataIndex: 'productPrice',
      search: false
    },
    {
      title: '数量',
      dataIndex: 'productCount',
      search: false
    },
    {
      title: '成本总价',
      dataIndex: 'supplyPriceTotal',
      search: false
    },
    {
      title: '销售总价',
      dataIndex: 'subtotal',
      search: false
    },
  ]

  const { location: { query } } = history;
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);

  return (
    <PageContainer title={`货号${(query as any).id}出库清单`}>
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        request={formatRequestListParams(getSkuOrder.bind(null, { productId: (query as any).id }))}
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
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <FooterToolbar
        extra={
          <div>
            <b style={{ marginRight: 20 }}>合计</b>
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
