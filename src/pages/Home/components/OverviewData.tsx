import React from 'react';
import { Card, Col, Row, Tooltip } from 'antd';
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import numeral from 'numeral';
import IconBg from './IconBg'
import classnames from 'classnames';

import styles from '../style.less';



export interface OverviewDataProps {
  [key: string]: any;
  loading: boolean;
}


const OverviewData: React.FC<OverviewDataProps> = () => {

  return (
    <Card loading={false}
      bordered={false}
      title='数据总览'
      style={{
        height: '100%',
      }}
    >

      <div className={styles.overviewContent}>
        <div className={classnames(styles.overviewItem, styles.bottomLine)}>
          <div className={styles.overviewItemTitle}>
            <IconBg color='#325BEB, #6194F7' size={32}>
              <ShoppingOutlined style={{ size: 25, color: 'white' }} />
            </IconBg>
            <span style={{ marginLeft: 15 }}>商品总览</span>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
        </div>

        <div className={styles.overviewItem}>
          <div className={styles.overviewItemTitle}>
            <IconBg color='#4DCB73, #84E7AB' size={32}>
              <UserOutlined style={{ size: 25, color: 'white' }} />
            </IconBg>
            <span style={{ marginLeft: 15 }}>用户总览</span>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>上架商品</div>
            <b className={styles.text}>1000</b>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default OverviewData;
