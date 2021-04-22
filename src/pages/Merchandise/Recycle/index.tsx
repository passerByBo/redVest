import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Form, Divider } from 'antd';
import ProTable from '@ant-design/pro-table';
import { getProductList } from '@/services/merchandise/product';
import { history } from 'umi';
type ProductListItem = {
  id: string,
  productName: string,
  shopId: string,
  shopName: string,
  topicName: string,
  productNo: string,
  categories: string,
  productSpecify: string,
  productBrand: string,
  productBrandId: string,
  shelfOnDate: string,
  salePrice: string,
  shareRatio: string,
  [key: string]: string,
}
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const Recycle: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '商品编码',
      dataIndex: 'code',
    },
    {
      title: '商品分类名称',
      dataIndex: 'code',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
      width: 300,
      render: ((_, item) => {
        return (
          <a onClick={() => { }}>{_}</a>
        )
      })
    },
    {
      title: '商品主图',
      dataIndex: 'imgUrl',
      search: false
    },
    {
      title: '商品副标题',
      dataIndex: 'subTitle',
      search: false
    },
    {
      title: '商铺名称',
      dataIndex: 'shopName',
      valueType: 'textarea',
    },
    {
      title: '商品品牌',
      dataIndex: 'productBrand',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: '',
      search: false,
    },
    {
      title: '包含SKU数',
      dataIndex: 'productBrand',
      search: false,
    },
    {
      title: 'SKU告急库存',
      dataIndex: 'productBrand',
      search: false,
    },
    {
      title: '销售价格',
      dataIndex: 'salePrice',
      valueType: 'textarea',
      search: false,
    },
    {
      title: 'SPU销量',
      dataIndex: 'bbb',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a>还原</a>
          <Divider type="vertical" />
          <a >删除</a>
        </>
      )
    }
  ]

  return (
    <PageContainer
      header={{
        title: '商品回收站',
      }}>
      <ProTable<ProductListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={{ labelWidth: 120 }}
        request={getProductList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
          },
        }}
      >

      </ProTable>
    </PageContainer>
  )
}

export default Recycle;
