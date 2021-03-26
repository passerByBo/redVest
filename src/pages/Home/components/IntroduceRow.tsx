import { InfoCircleOutlined,UserDeleteOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip, Space } from 'antd';
import numeral from 'numeral';
import React from 'react';
import { ChartCard, Field, MiniArea } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan'
import styles from '../style.less';
import { RightOutlined, EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';
import SaleCard from './SaleCard';
import IconTag from './IconTag';
import { ListOutlined, DollarOutlined,OrderIcon,UserOutlined } from '@/components/icon'
const { Statistic } = StatisticCard;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 }
}



const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: { [key: string]: string }[] }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <SaleCard
        name='今日订单总数'
        total={20000}
        flag='up'
        //'
        icon={<IconTag icon={<ListOutlined style={{ fontSize: 36 }} />} />}
        style={{ background: `linear-gradient(180deg,#6194F7,#325BEB)`}}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <SaleCard
        name='今日销售总额'
        total={20000}
        flag='up'
        icon={<IconTag icon={<DollarOutlined style={{ fontSize: 44 }} />} />}
        style={{ background: `linear-gradient(180deg,#FA9CB2,#F2637B)` }}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <SaleCard
        name='昨日销售总额'
        total={20000}
        flag='up'
        icon={<IconTag icon={<DollarOutlined style={{ fontSize: 44}} />} />}
        style={{ background: `linear-gradient(180deg,#C898F3,#975FE4)` }}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <SaleCard
        name='今日新增用户'
        total={20000}
        flag='up'
        icon={<IconTag icon={<UserOutlined style={{ fontSize: 44}} />} />}
        style={{ background: `linear-gradient(180deg,#84E7AB,#4DCB73)` }}
      />
    </Col>
  </Row>
)

export default IntroduceRow;
