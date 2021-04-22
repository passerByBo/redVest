import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Input } from 'antd';
import React, { useRef } from 'react';
import { getProductList } from '@/services/merchandise/product';
import { SaveOutlined } from '@ant-design/icons';
import { history } from 'umi';
const List: React.FC = (props) => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: 'SKU编码',
      dataIndex: 'code',
      search: false,
    },
    {
      title: '商品分类名称',
      dataIndex: 'code',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
    },
    {
      title: 'SKU规格属性',
      dataIndex: 'imgUrl',
    },
    {
      title: '商品数量',
      dataIndex: 'subTitle',
      search: false
    },
    {
      title: '单位',
      dataIndex: 'shopName',
      valueType: 'textarea',
      search: false
    },
    {
      title: '销售价',
      dataIndex: 'productBrand',
      valueType: 'textarea',
      search: false

    },
    {
      title: '成本价',
      dataIndex: '',
      search: false,
    },
    {
      title: '划线价',
      dataIndex: '',
      search: false,
    },
    {
      title: 'SKU库存数量',
      dataIndex: 'productBrand',
      search: false,
      render: (_, record) => (
        <a onClick={() => { history.push(`/sku/list/stock-logger?id=${record.id}`) }}>{_}</a>
      )
    },
    {
      title: '出库数量',
      dataIndex: 'productBrand',
      search: false,
      render: (_, record) => (
        <a onClick={() => { history.push(`/sku/list/checklist?id=${record.id}`) }}>{_}</a>
      )
    },
    {
      title: '库存预警值',
      dataIndex: 'salePrice',
      valueType: 'textarea',
      search: false,
      render: (_, record) => (
        <Input type='number' defaultValue={_} size="small" />
      )
    },
    {
      title: '库存金额',
      dataIndex: 'salePrice',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'textarea',
    },
  ]


  const { location: { pathname } } = history;

  const { children } = props;

  return (
    <>
      {
        pathname === '/sku/list' ? <PageContainer title='SKU台账列表'>
          <ProTable
            actionRef={actionRef}
            rowKey="key"
            search={{ labelWidth: 120 }}
            request={getProductList}
            toolBarRender={() => [
              <Button type="primary" key="primary" onClick={() => { }}>
                <SaveOutlined />保存
              </Button>
            ]}
            columns={columns}
            rowSelection={{
              onChange: (_, selectedRows) => {

              },
            }}

          />
        </PageContainer> : children
      }
    </>

  )
}

export default List;
