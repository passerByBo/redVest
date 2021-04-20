import React, { useState, useRef } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Button, Drawer, Descriptions, Modal, Table, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';

const BusinessInfo: React.FC = () => {
  const [statusKey, setStatusKey] = useState<string>('1');

  const [productsListVisible, setProductsListVisible] = useState<boolean>(false);
  const [ordersListVisible, setOrdersListVisible] = useState<boolean>(false);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const onTabChange = (key: string) => {
    setStatusKey(key)
  };

  const columnProducts = [
    {
      title: '范围类别（专题组名称）',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '范围名称（专题名称）',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '备注',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];


  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '商户状态',
      dataIndex: 'status',
      valueType: 'textarea',
      search: false,
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '商户名称',
      dataIndex: 'name',
      valueType: 'textarea',
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      valueType: 'textarea',
      search: false,
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '企业名称',
      dataIndex: 'name',
      valueType: 'textarea',
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '授权联系人',
      dataIndex: 'status',
      valueType: 'textarea',
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '授权联系人电话',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '授权联系人邮箱',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '商品列表',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
      render: (dom, entity) => {
        return <a onClick={() => setProductsListVisible(true)}>{dom}</a>;
      },
    },
    {
      title: '订单列表',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
      render: (dom, entity) => {
        return <a onClick={() => setOrdersListVisible(true)}>{dom}</a>;
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [<a key="link" onClick={() => setDetailVisible(true)}>查看详情</a>],
    },
  ];
  return (
    <PageContainer
      header={{
        title: '商家信息管理',
      }}
      tabList={[
        {
          tab: '审核通过商家',
          key: 'passed',
        },
        {
          tab: '审核未通过商家',
          key: 'unpassed',
        }
      ]}
      onTabChange={onTabChange}
    >
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="商家信息管理"
        actionRef={actionRef}
        options={{ search: false, fullScreen: false, reload: true, setting: false, density: false }}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => { }}>
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => { },
        }}
      />

      <Drawer title="查看详情" width={600} onClose={() => setDetailVisible(false)} visible={detailVisible}>
        <ProDescriptions column={1}  >
          <ProDescriptions.Item label="单据编号">这是一段文本</ProDescriptions.Item>
          <ProDescriptions.Item label="申请时间">这是一段文本</ProDescriptions.Item>
          <ProDescriptions.Item label="企业名称">这是一段文本</ProDescriptions.Item>
          <ProDescriptions.Item label="企业类型">这是一段文本</ProDescriptions.Item>
          <ProDescriptions.Item label="主营业务">这是一段文本</ProDescriptions.Item>
          <ProDescriptions.Item label="纳税人识别号">这是一段文本</ProDescriptions.Item>
          <ProDescriptions.Item label="所在省">这是一段文本</ProDescriptions.Item>
          <ProDescriptions.Item label="所在市" valueType="money">100</ProDescriptions.Item>
          <ProDescriptions.Item label="详细地址" valueType="percent">100</ProDescriptions.Item>
        </ProDescriptions>
      </Drawer>

      <Modal
        title="商品列表"
        visible={productsListVisible}
        width={1000}
        footer={null}
        onCancel={() => setProductsListVisible(false)}
      >
        <Table
          columns={columnProducts}
          dataSource={data}
          bordered
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)
          }}
          rowKey='key' />
      </Modal>

      <Modal
        title="订单列表"
        visible={ordersListVisible}
        width={1000}
        footer={null}
        onCancel={() => setOrdersListVisible(false)}
      >
        <Table
          columns={columnProducts}
          dataSource={data}
          bordered
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)
          }}
          rowKey='key' />
      </Modal>

    </PageContainer>
  );
};

export default BusinessInfo;
