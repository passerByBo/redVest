import React from 'react';
import ReactFitText from 'react-fittext';
import { Card  } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export interface OrderStatisticsProps {

}

const OrderStatistics: React.FC<OrderStatisticsProps> = (props) => {
  return (
    <Card
    loading={false}
    bordered={false}
    title='订单统计'
    style={{
      height: '100%',
    }}
    >

    </Card >
  )
}

export default OrderStatistics;
