import React, { useRef, useState } from 'react';
import { ImportOutlined, ExportOutlined, InboxOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { goShip, orderList } from '@/services/order';
import { history, useModel } from 'umi';
import Detail from './Detail';
import { RemarkOrderModel, RefundModel } from './components/Model'
import formatRequestListParams from '@/utils/formatRequestListParams';

const { Dragger } = Upload;
//订单数据类型

export interface OrderListItem {
  id: string,
  orderNo: string,
  orderStatus: string,
  payType: string,
  paymStatus: string,
  placeorDate: string,
  payTime: string,
  shopName: string,
  consignee: string,
  receiverPhone: string,
  shippingAddress: string,
  inprovinces: string,
  incities: string,
  receiverRegion: string,
  orderCount: string,
  orderTotalPrice: string,
  amountPayable: string,
  username: string,
  userid: string,
  userTel: string,
}

['待付款', '待发货', '待收货', '已完成', '已关闭'];

const orderStatusEnum = {
  '-0': {
    text: '全部',
    value: 0
  },
  '0': {
    text: '待付款',
    value: 1,
    status: 'Warning'
  },
  '1': {
    text: '待发货',
    value: 2,
    status: 'Error'
  },
  '2': {
    text: '待收货',
    value: 3,
    status: 'Default'
  },
  '3': {
    text: '已完成',
    value: 4,
    status: 'Success'
  },
  '4': {
    text: '已关闭',
    value: 5,
    status: 'Processing'
  },
}

const payStatusEnum = {
  '1': {
    text: '待付款',
    value: '1',
  },
  '2': {
    text: '已退款/退款审核中',
    value: '2',
  },
  '3': {
    text: '已退款',
    value: '3',
  },
}


let callbackDetail: Function | null = null;

const Order: React.FC = (props) => {

  const { children } = props;
  console.log(children)

  //导入快递单号状态
  const [importVisible, setImportVisible] = useState(false); RefundModel

  const [remarkOrderVisible, setRemarkOrderVisible] = useState(false);
  const [refundVisible, setRefundVisible] = useState(false);

  //查看订单详情
  const [selectedRowsState, setSelectedRows] = useState<OrderListItem[]>([]);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<OrderListItem>();

  const { setCurrentOrder } = useModel('order', (ret) => ({
    setCurrentOrder: ret.setCurrentOrder
  }));


  const handleShip = async (data: OrderListItem) => {
    const hide = message.loading('正在发货');
    try {
      let res = await goShip({ id: data.id, orderNo: data.orderNo });
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
  }

  const columns: ProColumns<OrderListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      valueType: 'textarea',
      render: (_, record) => (
        <a onClick={() => { setCurrentOrder(record); history.push(`/order/${record.orderNo}`) }}>{_}</a>
      )

    },
    {
      title: '下单时间',
      dataIndex: 'placeorDate',
      valueType: 'date',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      // initialValue: [1],
      valueEnum: orderStatusEnum
    },
    {
      title: '会员手机号',
      dataIndex: 'userTel',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '收货人手机号',
      dataIndex: 'receiverPhone',
      valueType: 'textarea',
    },
    {
      title: '总金额（￥）',
      dataIndex: 'orderTotalPrice',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '应付金额（￥）',
      dataIndex: 'amountPayable',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'textarea',
    },
    {
      title: '付款状态',
      dataIndex: 'paymStatus',
      valueType: 'select',
      filters: true,
      onFilter: true,
      search: false,
      valueEnum: payStatusEnum
    },
    {
      title: '所属商家',
      dataIndex: 'shopName',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        let viewArr = [
          <a onClick={() => {
            setCurrentRow(record)
            setRemarkOrderVisible(true);
          }}>备注订单</a>,
        ]

        if (record.orderStatus === '待收货' || record.orderStatus === '待发货' || record.orderStatus === '已完成') {
          viewArr.push(<a onClick={() => {
            setCurrentRow(record)
            setRefundVisible(true);
          }}>立即退款</a>)
        }

        if (record.orderStatus === '待发货' && record.shippingAddress && record.shippingAddress !== '') {
          viewArr.push(<a onClick={() => {
            Modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '确认发货吗？',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                handleShip(record);
              },
            });
          }}>去发货</a>)
        }
        return viewArr
      }
    }
  ]

  const importDraggerProps = {
    name: 'file',
    multiple: false,
    action: '',
    onChange(info) {
      console.log('info', info)
    }
  }

  //导入快递单号状态控制
  const showImportModal = () => {
    setImportVisible(true)
  }

  const handleImportOk = () => {
    setImportVisible(false)
  }

  const handleImportCancel = () => {
    setImportVisible(false)
  }

  const local = '/order'

  const { location: { pathname } } = history;



  return (
    <>
      {
        pathname === local ? <PageContainer
          title='订单管理'
        >
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
                <ExportOutlined /> 导出
            </Button>,
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  showImportModal();
                }}
              >
                <ImportOutlined /> 快递单号批量导入
            </Button>
            ]}
            request={formatRequestListParams(orderList)}
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

          <Modal
            title="快递单号批量导入"
            visible={importVisible}
            onOk={handleImportOk}
            onCancel={handleImportCancel}
          >
            <Dragger {...importDraggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或者将文件拖拽到这里进行上传！</p>
              <p className="ant-upload-hint">
                您导入的数据必须符合模板（<span style={{ color: 'red' }}>模板为点击"待发货订单导出" 按钮导出的Excel</span>）格式，否则数据不能正常导入。
            <br />
            (请上传Excle(*.xls/*.xlsx)文件)
            </p>
            </Dragger>
            <div style={{ textAlign: 'left', marginTop: 8 }}>
              说明：<br />
              1、模板中的标题行（即第一行）不允许删除或者修改；<br />
              2、必填字段必须填写，不能为空；<br />
              3、需要修改收货地址信息时，请保持同一订单号下所有的收货地址相同，且只需要修改标题行中带"(可修改)"的字段；<br />
              4、填写"配送单号"前，请设置该列的单元格格式为文本<br />
            </div>
          </Modal>
        </PageContainer > : <Detail
          remarkOrder={(currrent: any, callback: Function) => {
            if (!callbackDetail) {
              callbackDetail = callback;
            }
            setCurrentRow(currrent);
            setRemarkOrderVisible(true)
          }}
          refund={(currrent: any, callback: Function) => {
            if (!callbackDetail) {
              callbackDetail = callback;
            }
            setRefundVisible(true)
          }}
        />
      }
      <RemarkOrderModel
        id={currentRow && currentRow.id}
        code={currentRow && currentRow.orderNo}
        visible={remarkOrderVisible}
        onFinish={() => {callbackDetail&& callbackDetail();setRemarkOrderVisible(false)}}
        onCancel={() => setRemarkOrderVisible(false)} />
      <RefundModel
        id={currentRow && currentRow.id}
        code={currentRow && currentRow.orderNo}
        visible={refundVisible}
        onFinish={() => {callbackDetail&& callbackDetail();setRefundVisible(false)}}
        onCancel={() => setRefundVisible(false)} />
    </>
  )
}

export default Order;
