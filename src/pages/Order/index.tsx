import React, { useRef, useState } from 'react';
import { ImportOutlined, ExportOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Drawer, Progress, Tag } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { orderList } from '@/services/order';
import ProList from '@ant-design/pro-list';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import TitleMark from './components/TitleMark';
//订单数据类型
interface OrderListItem {
  id: string,
  orderNumber: string,
  orderTime: string,
  userName: string,
  receiver: string,
  consigneePhone: string,
  province: string,
  city: string,
  area: string,
  address: string,
  paymentMethod: string,
  ownedBusiness: string,
  totalAmount: string,
  amountsPayable: string,
  status: string,
}

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [
    <a>邀请</a>,
    <a>操作</a>,
    <a>
      <EllipsisOutlined />
    </a>,
  ],
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

const Order: React.FC = () => {
  //查看订单详情
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<OrderListItem[]>([]);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<OrderListItem>();
  const columns: ProColumns<OrderListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNumber',
      valueType: 'textarea',
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      valueType: 'textarea',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'textarea',
    },
    {
      title: '收货人',
      dataIndex: 'receiver',
      valueType: 'textarea',
    },
    {
      title: '收货人电话',
      dataIndex: 'consigneePhone',
      valueType: 'textarea',
    },
    {
      title: '省',
      dataIndex: 'province',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '市',
      dataIndex: 'city',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '区',
      dataIndex: 'area',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '所属商家',
      dataIndex: 'ownedBusiness',
      valueType: 'textarea',
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '应付金额',
      dataIndex: 'orderNumber',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a onClick={() => {
          setCurrentRow(record);
          setShowDetail(true);
        }}>查看订单</a>,
        <a onClick={() => {

        }}>取消订单</a>
      ]
    }
  ]
  return (
    <PageContainer>
      <ProTable
        headerTitle="订单列表"
        actionRef={actionRef}
        rowKey="id"
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
            <ExportOutlined /> 待发货订单导出
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
            }}
          >
            <ImportOutlined /> 快递单号批量导入
          </Button>
        ]}
        request={orderList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
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
          <Button
            onClick={async () => {

            }}
          >
            批量干点啥
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <Drawer
        width={800}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >


      </Drawer >
    </PageContainer >
  )
}

export default Order;
