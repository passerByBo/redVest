import React, { useRef, useState } from 'react';
import { ImportOutlined, ExportOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Drawer, Progress, Tag, Table } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { orderList } from '@/services/order';
import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';
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
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
    },
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

  const productTableCoulumn = [{
    title: '商品名称',
    dataIndex: 'productName',
  }, {
    title: '货号',
    dataIndex: 'itemNo.',
  }, {
    title: '配送单号',
    dataIndex: 'deliveryNumber',
  }, {
    title: '配送方式',
    dataIndex: 'deliveryMethod',
  }, {
    title: '配送时间',
    dataIndex: 'deliveryTime',
  }, {
    title: '价格',
    dataIndex: 'price',
  }, {
    title: '数量',
    dataIndex: 'count',
  }, {
    title: '小计',
    dataIndex: 'subtotal',
  }, {
    title: '操作',
    render: () => <Button type="primary" size="small">操作</Button>
  }
  ]


  const productTableData = [
    {
      id: '1',
      productName: '中国蓝星BLUESTAR芳香球50粒/盒 洁厕球厕所卫生间小便池除臭除异味清香香精球樟脑丸空气清新剂 五彩香球',
      itemNo: '芳香球',
      deliveryNumber: 'XSFA-ASWD-AAAA',
      deliveryMethod: '顺丰快递',
      deliveryTime: '2021-3-14',
      price: 109.00,
      count: 1,
      subtotal: 109.00
    },
    {
      id: '2',
      productName: '中国蓝星BLUESTAR芳香球50粒/盒 洁厕球厕所卫生间小便池除臭除异味清香香精球樟脑丸空气清新剂 五彩香球',
      itemNo: '芳香球',
      deliveryNumber: 'XSFA-ASWD-AAAA',
      deliveryMethod: '顺丰快递',
      deliveryTime: '2021-3-14',
      price: 109.00,
      count: 1,
      subtotal: 109.00
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
        width={1000}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => {}} type="primary">
              发货
            </Button>
          </div>
        }
      >

        <ProCard style={{ marginTop: 8 }} gutter={8} title="基本信息">
          <ProDescriptions
            column={2}
            dataSource={{
              receiver: 'xxxxxxxxx1',
              status: '已支付',
              orderTime: '2021-03-11',
              paymentTime: '2021-03-11',
              paymentMethod: '微信支付',
              ownedBusiness: '红背心自营商城'
            }}
            columns={[
              {
                title: '订单号',
                key: 'receiver',
                dataIndex: 'receiver',
              },
              {
                title: '订单状态',
                key: 'status',
                dataIndex: 'status',
              },
              {
                title: '下单时间',
                key: 'orderTime',
                dataIndex: 'orderTime',
                valueType: 'date',
              },
              {
                title: '付款时间',
                key: 'paymentTime',
                dataIndex: 'paymentTime',
                valueType: 'date',
              },
              {
                title: '支付方式',
                key: 'paymentMethod',
                dataIndex: 'paymentMethod',
              },
              {
                title: '所属商家',
                key: 'ownedBusiness',
                dataIndex: 'ownedBusiness',
              },
            ]}
          >
          </ProDescriptions>
        </ProCard>

        <ProCard style={{ marginTop: 8 }} gutter={8} title="收货人信息">
          <ProDescriptions
            column={2}
            actionRef={actionRef}
            // bordered
            formProps={{
              onValuesChange: (e, f) => console.log(f),
            }}
            dataSource={{
              receiver: '用户1',
              consigneePhone: '1324444444',
              address: '茶张路和团结南路十字西南角',
              postcode: '719000',
            }}

            editable={{}}
            columns={[
              {
                title: '收货人',
                key: 'receiver',
                dataIndex: 'receiver',
              },
              {
                title: '联系方式',
                key: 'consigneePhone',
                dataIndex: 'consigneePhone',
              },
              {
                title: '收货地址',
                key: 'address',
                dataIndex: 'address',
              },
              {
                title: '邮编',
                key: 'postcode',
                dataIndex: 'postcode',
              },
            ]}
          >
          </ProDescriptions>
        </ProCard>

        <ProCard style={{ marginTop: 8 }} gutter={8} title="商品信息">
          <Table
            columns={productTableCoulumn}
            dataSource={productTableData}
            bordered
            pagination={false}
          />
        </ProCard>

        <ProCard style={{ marginTop: 8 }} direction="column" gutter={8} title="费用信息">
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span>商品总金额:￥ 109.00 元 - 折扣：￥ 0.00 元 + 发票税额：￥ 0.00 元 + 配送费用：￥ 0.00 元 + 保价费用：￥ 0.00 元 + 包装费用：￥ 0.00 元 + 贺卡费用：￥ 0.00 元</span>
            <span>= 订单总金额:￥ 109.00 元</span>
            <span>- 已付款金额:￥ 0.00 元 - 使用余额：￥ 0.00 元 - 使用消费码：￥ 0.00 元 - 使用积分：￥ 0.00 元 - 使用红包：￥ 0.00 元</span>
            <span>= 应付款金额:￥ 109.00 元</span>
          </div>

        </ProCard>
      </Drawer >
    </PageContainer >
  )
}

export default Order;
