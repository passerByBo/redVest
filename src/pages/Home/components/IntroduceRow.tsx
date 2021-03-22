import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import React from 'react';
import { ChartCard,Field } from './Charts';
import Yuan from '../utils/Yuan'

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
        total={() => <Yuan>125462</Yuan>}
        footer={
          <Field
            label={'日销售额'}
            value={`￥${numeral(12323).format('0,0')}`}
          />
        }
        contentHeight={46}
      />
    </Col>
  </Row>
)
