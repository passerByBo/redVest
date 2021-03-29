import React from 'react';
import { Card } from 'antd';
import classnames from 'classnames';
import numeral from 'numeral';
import styles  from '../style.less'

const CommodityAnalysis: React.FC = (props) => {
  return (
    <Card
      loading={false}
      bordered={false}
      title='商品分析'
      style={{
        height: '100%',
      }}
    >
      <div className={styles.commodityAnalysis}>
        <span className={styles.tip}>本月销售（单位：万元）</span>
      </div>
    </Card>
  )
}

export default CommodityAnalysis;
