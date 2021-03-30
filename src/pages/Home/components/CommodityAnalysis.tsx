import React from 'react';
import { Card , Space} from 'antd';
import {FileTextOutlined,RedoOutlined,DownloadOutlined} from '@ant-design/icons'
import classnames from 'classnames';
import numeral from 'numeral';
import RoseRings from './Charts/RoseRing';

import styles from '../style.less'

const iconStyle= {
  fontSize: 16
}

const CommodityAnalysis: React.FC = (props) => {
  return (
    <Card
      bodyStyle={{ padding: '10px 24px' }}
      loading={false}
      bordered={false}
      title='商品分析'
      style={{
        height: '100%',
      }}
      extra={
        <Space>
          <FileTextOutlined style={iconStyle}/>
            <RedoOutlined style={iconStyle}/>
            <DownloadOutlined style={iconStyle}/>
        </Space>
      }
    >
      <div className={classnames(styles.commodityAnalysis)}>
        <h4 className={styles.tip}>本月销售（单位：万元）</h4>
        <RoseRings height={200} />
      </div>
    </Card>
  )
}

export default CommodityAnalysis;
