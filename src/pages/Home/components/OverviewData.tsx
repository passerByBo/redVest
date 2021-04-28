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


const OverviewData: React.FC<OverviewDataProps> = (props) => {

  const { data , loading } = props;


  let commodity, user;

  if(data){
    commodity = data.commodity;
    user = data.user;
  }

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
            <b className={styles.text}>{commodity && numeral(commodity.shelves).format('0,0')}</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>下架商品</div>
            <b className={styles.text}>{commodity &&numeral(commodity.soldOut).format('0,0')}</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>库存紧张</div>
            <b className={styles.text}>{commodity &&numeral(commodity.shortStock).format('0,0')}</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>全部商品</div>
            <b className={styles.text}>{commodity && numeral(commodity.all).format('0,0')}</b>
          </div>
        </div>

        <div className={styles.overviewItem}>
          <div className={styles.overviewItemTitle}>
            <IconBg color='#4DCB73, #84E7AB' size={32}>
              <UserOutlined style={{ fontSize: 25, color: 'white' }} />
            </IconBg>
            <span style={{ marginLeft: 15 }}>用户总览</span>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>今日新增</div>
            <b className={styles.text}>{user && numeral(user.tody).format('0,0')}</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>昨日新增</div>
            <b className={styles.text}>{user && numeral(user.yesterday).format('0,0')}</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>本月新增</div>
            <b className={styles.text}>{user && numeral(user.currentMonth).format('0,0')}</b>
          </div>
          <div className={styles.overviewItemColumn}>
            <div className={styles.name}>会员总数</div>
            <b className={styles.text}>{user && numeral(user.all).format('0,0')}</b>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default OverviewData;
