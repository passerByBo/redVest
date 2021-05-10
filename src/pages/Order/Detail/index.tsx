import { DownOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { PageContainer, GridContent, RouteContext } from '@ant-design/pro-layout';
import { Dropdown, Menu, Descriptions, Button, Card, Steps, Divider, Table, Modal, message } from 'antd';
import { useModel, useRequest, history } from 'umi';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './style.less';
import { getOrderDetails, goShip, updateDeliveryInfo } from '@/services/order';
import ProSkeleton from '@ant-design/pro-skeleton';
import numeral from 'numeral';
import ProTable from '@ant-design/pro-table';
import { ProductListItem } from '@/pages/Merchandise/Thematic';
import { ModifyExpressModel } from '../components/Model';

export interface OrderDetailProps {
  remarkOrder(current: any, callback: Function): void;
  refund(current: any, callback: Function): void
}

enum orderStatusEnum {
  '已关闭' = -1,
  '已取消' = -1,
  '待付款' = 1,
  '待发货' = 2,
  '待收货' = 2,
  '已完成'
}

const ButtonGroup = Button.Group;
const { Step } = Steps;




const productColumns = [
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '规格',
    dataIndex: 'productSpec',
    key: 'productSpec',
  },
  {
    title: '货号',
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: '价格',
    key: 'productPrice',
    dataIndex: 'productPrice',
  },
  {
    title: '数量',
    key: 'productCount',
    dataIndex: 'productCount',
  },
  {
    title: '小计',
    key: 'subtotal',
    dataIndex: 'subtotal',
  },
  {
    title: '物流公司',
    key: 'deliveryType',
    dataIndex: 'deliveryType',
  },
  {
    title: '物流单号',
    key: 'deliveryNo',
    dataIndex: 'deliveryNo',
  },

];

const logColumns = [
  {
    title: '操作时间',
    dataIndex: 'operateDate',
    key: 'operateDate',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
  },
  {
    title: '发货状态',
    key: 'deliveryStatus',
    dataIndex: 'deliveryStatus',
  },
  {
    title: '操作详情',
    key: 'operateDetail',
    dataIndex: 'operateDetail',
  },
];

const Detail: React.FC<OrderDetailProps> = (props) => {

  const [selectedProductRows, setSelectedProductRows] = useState<ProductListItem[]>([]);
  const [modifyExpressModelvisible, setModifyExpressModelvisible] = useState(false);
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const orderNo = useMemo(() => {
    let pathname = history.location.pathname;
    let orderNo = pathname.substring(pathname.lastIndexOf('/') + 1);
    return orderNo;
  }, [])

  const { order } = useModel('order', (ret: any) => ({
    order: ret.order
  }));

  const { loading, run } = useRequest(getOrderDetails.bind(null, { orderNo }), {
    manual: true,
    onSuccess: (result, params) => {
      setOrderDetail(result)
    }
  })
  useEffect(() => {
    run();
  }, [])

  const handleShip = useCallback(async () => {
    const hide = message.loading('正在发货');
    try {
      let res = await goShip({ id: orderDetail.id, orderNo: orderDetail.orderNo });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('发货失败，' + res.msg);
        return;
      }
      hide();
      message.success('发货成功')
    } catch (error) {
      hide();
      message.error('发货失败，请重试')
    }
  }, [])


  const handleFinish = useCallback(async (fields: any) => {
    let ids = selectedProductRows.map((item: any) => item.productId).join(',')
    fields.ids = ids;
    let hide = message.loading('物流信息修改中')
    try {
      let res = await updateDeliveryInfo(fields);
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('物流信息修改失败' + res.msg);
        return false;
      }
      hide();
      setModifyExpressModelvisible(false);
      message.success('物流信息修改成功！');
      run();
    } catch (error) {
      hide();
      message.error('物流信息修改失败请重试！');
      return false;
    }
    return true;
  }, [selectedProductRows])

  const handleEditDelibery = () => {
    if (!selectedProductRows || selectedProductRows.length <= 0) {
      message.error('请选择要修改的商品！')
      return;
    }
    setModifyExpressModelvisible(true);
  }

  const listenerRun = () => {
    run();
  }


  const description = (
    <RouteContext.Consumer>
      {
        ({ isMobile }) => (
          <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 3}>
            <Descriptions.Item label="订单状态">{orderDetail && orderDetail.orderStatus || order && order.orderStatus}</Descriptions.Item>
            <Descriptions.Item label="订单金额">{orderDetail && orderDetail.orderTotalPrice || order && order.orderTotalPrice}</Descriptions.Item>
            <Descriptions.Item label="支付方式">{orderDetail && orderDetail.payType || order && order.payType}</Descriptions.Item>
            <Descriptions.Item label="付款状态">{orderDetail && orderDetail.paymStatus || order && order.paymStatus}</Descriptions.Item>
            <Descriptions.Item label="下单时间">{orderDetail && orderDetail.placeorDate || order && order.placeorDate}</Descriptions.Item>
            <Descriptions.Item label="支付时间">{orderDetail && orderDetail.payTime || order && order.payTime}</Descriptions.Item>

            <Descriptions.Item label="用户备注">{orderDetail && orderDetail.userRemark}</Descriptions.Item>
            <Descriptions.Item label="商家备注">{orderDetail && orderDetail.shopRemark}</Descriptions.Item>

          </Descriptions>
        )
      }
    </RouteContext.Consumer>
  )

  const { remarkOrder, refund } = props;

  const mobileMenu = (
    <Menu>
      <Menu.Item onClick={() => {
        remarkOrder({ orderNo: orderDetail.orderNo, id: orderDetail.id }, listenerRun);
      }}>备注订单</Menu.Item>
      {/* 立即退款需要根据订单状态判断是否存在 */}
      <Menu.Item>立即退款</Menu.Item>
    </Menu>
  )

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
                onClick={() => {
                  if (orderDetail.orderStatus !== '待发货') {
                    message.error('订单状态为' + orderDetail.orderStatus + '不可以发货呦！')
                    return;
                  }
                  Modal.confirm({
                    title: '提示',
                    icon: <ExclamationCircleOutlined />,
                    content: '确认发货吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                      handleShip();
                    },
                  });
                }}
              >
                去发货
              </Dropdown.Button>
            )
          }

          return (
            <>
              <ButtonGroup>
                <Button onClick={() => {
                  remarkOrder({ orderNo: orderDetail.orderNo, id: orderDetail.id }, listenerRun);
                }}
                >备注订单</Button>
                <Button onClick={() => { refund('1231123123', listenerRun) }}>立即退款</Button>
              </ButtonGroup>
              <Button disabled={orderDetail && orderDetail.orderStatus !== '待发货'} type="primary" onClick={() => {
                Modal.confirm({
                  title: '提示',
                  icon: <ExclamationCircleOutlined />,
                  content: '确认发货吗？',
                  okText: '确认',
                  cancelText: '取消',
                  onOk() {
                    handleShip();
                  },
                });
              }}> 去发货</Button>
            </>
          )
        }
      }
    </RouteContext.Consumer >
  )

  return (
    <PageContainer
      title={`订单编号：` + orderNo}
      className={styles.pageHeader}
      content={description}
      extra={action}
    // loading={true}
    >
      {
        loading || orderDetail === null ?
          <ProSkeleton type="descriptions" /> :
          <GridContent className={styles.orderDetails}>
            <Card title="流程进度" style={{ marginBottom: 24 }}>
              <RouteContext.Consumer>
                {
                  ({ isMobile }) => (
                    <>
                      <Steps
                        direction={isMobile ? 'vertical' : 'horizontal'}
                        current={orderDetail && orderStatusEnum[orderDetail.orderStatus] as unknown as number}
                        labelPlacement="vertical"
                      >
                        <Step title="提交订单" description={orderDetail.placeorDate} />
                        <Step
                          description={orderDetail && orderDetail.payTime}
                          title={(orderStatusEnum[orderDetail.orderStatus] as unknown as number) === 1 ? '订单支付中' : '支付订单'}
                          icon={(orderStatusEnum[orderDetail.orderStatus] as unknown as number) === 1 && <LoadingOutlined />} />
                        {/* <Step title="支付订单" description="未支付"/> */}
                        <Step title="平台发货" description={orderDetail && orderDetail.deliveryTime}/>
                        <Step title="确认收货" description={orderDetail && orderDetail.shippingDate}/>
                      </Steps>
                      <Divider />

                      {/* <Steps
                        direction={isMobile ? 'vertical' : 'horizontal'}
                        current={1}
                        labelPlacement="vertical"
                        percent={30}>
                        <Step title="发起退款" description="2021-04-01 13:21:23" />
                        <Step title="退款处理" subTitle="2021-04-01 13:21:23" />
                        <Step title="退款成功" />
                        <Step title="订单关闭" />
                      </Steps> */}
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
                      <Descriptions.Item label="收货人">{orderDetail && orderDetail.consignee}</Descriptions.Item>
                      <Descriptions.Item label="收货人联系方式">{orderDetail.receiverPhone}</Descriptions.Item>
                      <Descriptions.Item label="收货地址">{orderDetail.shippingAddress}</Descriptions.Item>
                      <Descriptions.Item label="商品合计">{numeral(orderDetail.orderMoneyInfo.productTotalPrice).format('0,0.00')}</Descriptions.Item>
                      <Descriptions.Item label="运费">{numeral(orderDetail.orderMoneyInfo.orderTotalPrice).format('0,0.00')}</Descriptions.Item>
                      <Descriptions.Item label="订单总金额"><span style={{ color: 'red' }}>{numeral(orderDetail.orderMoneyInfo.freightAmount).format('0,0.00')}</span></Descriptions.Item>
                      <Descriptions.Item label="优惠券码">{numeral(orderDetail.orderMoneyInfo.consumeNoPaid).format('0,0.00')}</Descriptions.Item>
                      <Descriptions.Item label="余额抵扣">{numeral(orderDetail.orderMoneyInfo.accountBalance).format('0,0.00')}</Descriptions.Item>
                      <Descriptions.Item label="应付款金额">{numeral(orderDetail.orderMoneyInfo.amountPayable).format('0,0.00')}</Descriptions.Item>
                      <Descriptions.Item label="微信支付金额">{numeral(orderDetail.orderMoneyInfo.wxPaid).format('0,0.00')}</Descriptions.Item>


                    </Descriptions>
                  )
                }
              </RouteContext.Consumer>
            </Card>


            <Card title="商品信息" style={{ marginBottom: 24 }} bordered={false}>
              <ProTable
                tableAlertRender={false}
                bordered
                columns={productColumns}
                dataSource={orderDetail && orderDetail.productInfo}
                rowKey="id"
                pagination={false}
                options={false}
                search={false}
                rowSelection={{
                  onChange: (_, selectedRows) => {
                    setSelectedProductRows(selectedRows);
                  },
                }}
                toolBarRender={() => [
                  <Button type="primary" key="edit" onClick={() => handleEditDelibery()}>编辑</Button>,
                ]}
              />
            </Card>

            <Card title="操作信息" style={{ marginBottom: 24 }} bordered={false}>
              <Table bordered columns={logColumns} dataSource={orderDetail && orderDetail.orderOperateLogList} pagination={false} />
            </Card>
          </GridContent>
      }
      <ModifyExpressModel code={orderNo} onCancel={() => { setModifyExpressModelvisible(false) }} onFinish={handleFinish} visible={modifyExpressModelvisible} />
    </PageContainer >
  )

}

export default Detail;

