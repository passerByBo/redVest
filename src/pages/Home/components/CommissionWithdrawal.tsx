import React from 'react';
import { Card, Col, Row, Tooltip } from 'antd';
import { CommissionOutlined } from '@/components/icon'
import numeral from 'numeral';
import classnames from 'classnames';

import styles from '../style.less';



export interface CommissionWithdrawalProps {
  [key: string]: any;
  loading: boolean;
}


const CommissionWithdrawal: React.FC<CommissionWithdrawalProps> = () => {

  return (
    <Card loading={false}
      bordered={false}
      title='佣金提取'
      style={{
        height: '100%',
      }}
    >

      <div className={styles.commissionWithdrawal}>
        <div className={styles.titleWrap}>
          <CommissionOutlined style={{ fontSize: 40 }} />
          <b className={styles.text}>￥{numeral(12345.00).format('0,0')}</b>
          <b className={styles.text}>总佣金</b>
        </div>

        <div className={styles.commissionContainer}>
          <div className={styles.commissionContainerItem}>
            <span className={styles.name}>待提取佣金</span>
            <b className={styles.text}>￥{numeral(2345.00).format('0,0')}</b>
          </div>

          <div className={styles.line}/>

          <div className={styles.commissionContainerItem}>
            <span className={styles.name}>待提取佣金</span>
            <b className={styles.text}>￥{numeral(2345.00).format('0,0')}</b>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CommissionWithdrawal;
