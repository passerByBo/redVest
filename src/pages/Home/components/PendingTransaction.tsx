import React from 'react';
import { Card } from 'antd';
import {
  PaymentOutlined,
  ShipOutlined,
  CompletedOutlined,
  ReceiptOutlined,
  RefundOutlined,
  RegisterOutlined
} from '@/components/icon';
import IconBg from './IconBg';
import numeral from 'numeral';
import classnames from 'classnames';

import styles from '../style.less';
const PendingTransaction: React.FC<{loading:boolean, data:{[key:string]: any}}> = (props) => {
  const {loading, data} = props;
  return (
    <Card
      loading={false}
      bordered={false}
      title='待处理事务'
      style={{
        height: '100%',
      }}
    >

      <div className={styles.pendingTransaction}>
        <div className={styles.pendingTransactionItem}>
          <div className={classnames(styles.flexRow, styles.content)}>
            <IconBg color='#325BEB, #6194F7' size={64}>
              <PaymentOutlined style={{ fontSize: 32 }} />
            </IconBg>
            <div className={classnames(styles.flexColumn, styles.wrap)}>
              <span className={styles.name}>待付款订单</span>
              <b className={styles.text}>{data && numeral(data.pendingPayOrder).format('0,0')}</b>
            </div>
          </div>

          <div className={classnames(styles.flexRow, styles.content)}>
            <IconBg color='#325BEB, #6194F7' size={64}>
              <ShipOutlined style={{ fontSize: 32 }} />
            </IconBg>
            <div className={classnames(styles.flexColumn, styles.wrap)}>
              <span className={styles.name}>待发货订单</span>
              <b className={styles.text}>{data && numeral(data.pendingShipOrder).format('0,0')}</b>
            </div>
          </div>

          <div className={classnames(styles.flexRow, styles.content)}>
            <IconBg color='#325BEB, #6194F7' size={64}>
              <CompletedOutlined style={{ fontSize: 32 }} />
            </IconBg>
            <div className={classnames(styles.flexColumn, styles.wrap)}>
              <span className={styles.name}>已完成订单</span>
              <b className={styles.text}>{data && numeral(data.completedOrder).format('0,0')}</b>
            </div>
          </div>
        </div>

        <div className={styles.pendingTransactionItem}>
          <div className={classnames(styles.flexRow, styles.content)}>
            <IconBg color='#325BEB, #6194F7' size={64}>
              <RegisterOutlined style={{ fontSize: 32 }} />
            </IconBg>
            <div className={classnames(styles.flexColumn, styles.wrap)}>
              <span className={styles.name}>新缺货登记</span>
              <b className={styles.text}>{data && numeral(data.outStockRegistration).format('0,0')}</b>
            </div>
          </div>

          <div className={classnames(styles.flexRow, styles.content)}>
            <IconBg color='#325BEB, #6194F7' size={64}>
              <RefundOutlined style={{ fontSize: 32 }} />
            </IconBg>
            <div className={classnames(styles.flexColumn, styles.wrap)}>
              <span className={styles.name}>待处理退款申请</span>
              <b className={styles.text}>{data && numeral(data.pendingRefund).format('0,0')}</b>
            </div>
          </div>

          <div className={classnames(styles.flexRow, styles.content)}>
            <IconBg color='#325BEB, #6194F7' size={64}>
              <ReceiptOutlined style={{ fontSize: 32 }} />
            </IconBg>
            <div className={classnames(styles.flexColumn, styles.wrap)}>
              <span className={styles.name}>待确认收货订单</span>
              <b className={styles.text}>{data && numeral(data.tobeConfirmedOrder).format('0,0')}</b>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PendingTransaction;
