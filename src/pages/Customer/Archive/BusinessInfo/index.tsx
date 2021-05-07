//商家信息管理
import React, { useState, useRef } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Button, Drawer, Descriptions, Modal, Table, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

import { getList, getDetail } from '@/services/customer/merchantInfo';
import formatRequestListParams from '@/utils/formatRequestListParams';

type ThematicGroupListItem = {
  id: string,
  compName: string,
}

const BusinessInfo: React.FC = () => {
  const [statusKey, setStatusKey] = useState<string>('passed');

  const [productsListVisible, setProductsListVisible] = useState<boolean>(false);
  const [ordersListVisible, setOrdersListVisible] = useState<boolean>(false);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<ThematicGroupListItem>();

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

  const detailColumns = [
    {
      title: '单据编号',
      key: 'billno',
      dataIndex: 'billno',
    },
    {
      title: '申请时间',
      dataIndex: 'applydate',
    },
    {
      title: '企业名称',
      dataIndex: 'compName',
    },
    {
      title: '企业类型',
      dataIndex: 'companytype',
    },
    {
      title: '主营业务',
      dataIndex: 'mainBusiness',
    },
    {
      title: '纳税人识别号',
      dataIndex: 'companyregnum',
    },
    {
      title: '所在省',
      dataIndex: 'inprovinces',
    },
    {
      title: '所在市',
      dataIndex: 'incities',
    },
    {
      title: '详细地址',
      dataIndex: 'adressOffice',
    },
  ]


  const columns: ProColumns<ThematicGroupListItem>[] = [
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
      dataIndex: 'shopName',
      valueType: 'textarea',
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '申请时间',
      dataIndex: 'applydate',
      valueType: 'textarea',
      search: false,
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '企业名称',
      dataIndex: 'compName',
      valueType: 'textarea',
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '授权联系人',
      dataIndex: 'authorizedUsername',
      valueType: 'textarea',
      sorter: (a, b) => 2 - 1,
    },
    {
      title: '授权联系人电话',
      dataIndex: 'authorizedUserTel',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '授权联系人邮箱',
      dataIndex: 'authorizedUserMail',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '商品列表',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
      hideInTable: statusKey !== 'passed',
      render: (dom, entity) => {
        return <a onClick={() => setProductsListVisible(true)}>商品列表</a>;
      },
    },
    {
      title: '订单列表',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
      hideInTable: statusKey !== 'passed',
      render: (dom, entity) => {
        return <a onClick={() => setOrdersListVisible(true)}>订单列表</a>;
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [<a key="link" onClick={() => { setDetailVisible(true); setCurrentRow(record) }}>查看详情</a>],
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
      <ProTable
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
        request={formatRequestListParams(getList, { status: '审核通过' })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => { },
        }}
      />

      <Drawer title="查看详情" width={800} onClose={() => setDetailVisible(false)} visible={detailVisible}>
        <ProDescriptions
          column={2}
          request={getDetail}
          params={{
            id: currentRow?.id,
          }}
          columns={detailColumns}
        >

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
