import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { PageContainer, GridContent, RouteContext } from '@ant-design/pro-layout';
import { Dropdown, Menu, Descriptions, Button, Card, Steps, Popover, Badge, Divider, Empty, Table } from 'antd';
import React from 'react';
import styles from './style.less';

export interface OrderDetailProps {
  remarkOrder(code: string): void;
  ship(code: string): void
  refund(code: string): void
  modifyExpress(code: string): void
}

const ButtonGroup = Button.Group;
const { Step } = Steps;
const description = (
  <RouteContext.Consumer>
    {
      ({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 3}>
          <Descriptions.Item label="订单状态">待发货</Descriptions.Item>
          <Descriptions.Item label="订单金额">￥1000.00</Descriptions.Item>
          <Descriptions.Item label="支付方式">微信支付</Descriptions.Item>
          <Descriptions.Item label="付款状态">已付款</Descriptions.Item>
          <Descriptions.Item label="下单时间">2021-03-22 15:18:21</Descriptions.Item>
          <Descriptions.Item label="支付时间">2021-03-22 15:18:21</Descriptions.Item>
          <Descriptions.Item label="配送方式">顺丰快递</Descriptions.Item>
          <Descriptions.Item label="用户备注">包邮我要白嫖</Descriptions.Item>
          <Descriptions.Item label="商家备注">免费包邮</Descriptions.Item>
        </Descriptions>
      )
    }
  </RouteContext.Consumer>
)

const mobileMenu = (
  <Menu>
    <Menu.Item>备注订单</Menu.Item>
    {/* 立即退款需要根据订单状态判断是否存在 */}
    <Menu.Item>立即退款</Menu.Item>
  </Menu>
)





const productColumns = [
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '规格',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '货号',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '价格',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '数量',
    key: 'tags',
    dataIndex: 'tags',
  },
];

const logColumns = [
  {
    title: '操作时间',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作人',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '订单状态',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '发货状态',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '操作详情',
    key: 'tags',
    dataIndex: 'tags',
  },
];

const Detail: React.FC<OrderDetailProps> = (props) => {
  console.log('props', props)

  const { remarkOrder, ship, refund, modifyExpress } = props;
  const action = (
    <RouteContext.Consumer>
      {
        ({ isMobile }) => {
          if (isMobile) {
            return (
              <Dropdown.Button
                type="primary"
                icon={<DownOutlined />}
                overlay={mobileMenu}
                placement="bottomRight"
              >
                去发货
              </Dropdown.Button>
            )
          }

          return (
            <>
              <ButtonGroup>
                <Button onClick={() => { remarkOrder('1231123123') }}>备注订单</Button>
                <Button onClick={() => { modifyExpress('1231123123') }}>修改快递</Button>
                <Button onClick={() => { refund('1231123123') }}>立即退款</Button>
              </ButtonGroup>
              <Button type="primary" onClick={() => { ship('1231123123') }}>去发货</Button>
            </>
          )
        }
      }
    </RouteContext.Consumer>
  )

  return (
    <PageContainer
      title="订单编号：ddddddddddddddd99"
      className={styles.pageHeader}
      content={description}
      extra={action}
    >
      <GridContent>
        <Card title="流程进度" style={{ marginBottom: 24 }}>
          <RouteContext.Consumer>
            {
              ({ isMobile }) => (
                <>
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    current={1}
                    labelPlacement="vertical"
                  >
                    <Step title="提交订单" description="2021-03-28 15:21:23" />
                    <Step status="process" title="订单支付中" icon={<LoadingOutlined />} />
                    {/* <Step title="支付订单" description="未支付"/> */}
                    <Step title="平台发货" />
                    <Step title="确认收货" />
                  </Steps>
                  <Divider />

                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    current={1}
                    labelPlacement="vertical"
                    percent={30}>
                    <Step title="发起退款" description="2021-04-01 13:21:23" />
                    <Step title="退款处理" subTitle="2021-04-01 13:21:23" />
                    <Step title="退款成功" />
                    <Step title="订单关闭" />
                  </Steps>
                </>

              )
            }
          </RouteContext.Consumer>
        </Card>

        <Card title="订单信息" style={{ marginBottom: 24 }} bordered={false}>
          <RouteContext.Consumer>
            {
              ({ isMobile }) => (
                <Descriptions column={isMobile ? 1 : 3}>
                  <Descriptions.Item label="收货人">大聪明</Descriptions.Item>
                  <Descriptions.Item label="收货人联系方式">13599990000</Descriptions.Item>
                  <Descriptions.Item label="收货地址">西安市茶张路十字</Descriptions.Item>
                  <Descriptions.Item label="物流公司名称">SF</Descriptions.Item>
                  <Descriptions.Item label="物流公司">顺丰快递</Descriptions.Item>
                  <Descriptions.Item label="商品合计">￥1100.00</Descriptions.Item>
                  <Descriptions.Item label="运费">￥20.00</Descriptions.Item>
                  <Descriptions.Item label="订单总金额"><span style={{ color: 'red' }}>￥1000.00</span></Descriptions.Item>
                  <Descriptions.Item label="优惠券码">￥10.00</Descriptions.Item>
                </Descriptions>
              )
            }
          </RouteContext.Consumer>
        </Card>


        <Card title="商品信息" style={{ marginBottom: 24 }} bordered={false}>
          <Table bordered columns={productColumns} dataSource={[]} />
        </Card>

        <Card title="操作信息" style={{ marginBottom: 24 }} bordered={false}>
          <Table bordered columns={logColumns} dataSource={[]} />
        </Card>
      </GridContent>
    </PageContainer >
  )

}

export default Detail;
