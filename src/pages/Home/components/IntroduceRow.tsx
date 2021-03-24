import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip, Space } from 'antd';
import numeral from 'numeral';
import React from 'react';
import { ChartCard, Field,MiniArea } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan'
import styles from '../style.less';
import { RightOutlined, EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';

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
      <ChartCard
        bordered={false}
        title='总销售额'
        action={
          <Tooltip
            title='指标说明'
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>126560</Yuan>}
        footer={
          <Field
            label={'日销售额'}
            value={`￥${numeral(12323).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          周同比
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          日同比
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='访问量'
        action={
          <Tooltip
            title='指标说明'
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={numeral(8848).format('0.0')}
        footer={
          <Field
            label={'日销售额'}
            value={`￥${numeral(1234).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
  </Row>
)

export default IntroduceRow;
