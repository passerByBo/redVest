import React, { Suspense, useState, useEffect } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
//等宽和流式布局
import { GridContent } from '@ant-design/pro-layout';
import PageLoading from './components/PageLoading';
import { fakeChartData } from './service'
import styles from './style.less';
import { AnalysisData } from './data.d';
import { ListOutlined, UpOutlined } from '@/components/icon';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const OverviewData = React.lazy(() => import('./components/OverviewData'));
const CommissionWithdrawal = React.lazy(() => import('./components/CommissionWithdrawal'))

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [chartsData, setChartsData] = useState<AnalysisData>();


  useEffect(() => {
    fakeChartData().then(res => {
      setChartsData(res.data)
    })

  }, [])




  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={chartsData?.visitData} />
        </Suspense>
      </>


      <Row
        gutter={24}
        style={{marginBottom: 24}}
      >
        <Col xl={16} lg={16} md={24} xs={24}>
          <Suspense fallback={null}>
            <OverviewData loading={false} />
          </Suspense>
        </Col>

        <Col xl={8} lg={8} md={24} xs={24}>
          <Suspense fallback>
            <CommissionWithdrawal loading={false} />
          </Suspense>
        </Col>
      </Row>

      <Row
        gutter={24}
        style={{marginBottom: 24}}
      >
        <Col xl={16} lg={16} md={24} xs={24}>
          <Suspense fallback={null}>
            <OverviewData loading={false} />
          </Suspense>
        </Col>

        <Col xl={8} lg={8} md={24} xs={24}>
          <Suspense fallback>
            <CommissionWithdrawal loading={false} />
          </Suspense>
        </Col>
      </Row>

      <Row gutter={24}>
      <Col xl={24} lg={24} md={24} xs={24}>
          <Suspense fallback={null}>
            <OverviewData loading={false} />
          </Suspense>
        </Col>
      </Row>
    </GridContent>
  )
}

export default Home;
