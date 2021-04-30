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
import { getHomeData } from '@/services/home/home';
import { useRequest } from 'umi';


const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const OverviewData = React.lazy(() => import('./components/OverviewData'));
const CommissionWithdrawal = React.lazy(() => import('./components/CommissionWithdrawal'));
const PendingTransaction = React.lazy(() => import('./components/PendingTransaction'));
const CommodityAnalysis = React.lazy(() => import('./components/CommodityAnalysis'));
const OrderStatistics = React.lazy(() => import('./components/OrderStatistics'));


const Home: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [chartsData, setChartsData] = useState<AnalysisData>();


  const { data: homeData, loading } = useRequest(() => {
    return getHomeData();
  })

  console.log('homeData',homeData, loading)

  const isActive = (type: 'today' | 'week' | 'month' | 'year') => {

  };

  const selectDate = (type: 'today' | 'week' | 'month' | 'year') => {

  }


  const introduceRowData = {
    newUsersToday: homeData && homeData.newUsersToday,
    orderNumToday: homeData && homeData.orderNumToday,
    salesTotalToday: homeData && homeData.salesTotalToday,
    salesTotalYesterday: homeData && homeData.salesTotalYesterday,
  }

  return (
    <GridContent>
      <Suspense fallback={<PageLoading />}>
        <IntroduceRow loading={loading} data={introduceRowData} />
      </Suspense>


      <Row
        gutter={24}
        style={{ marginBottom: 24 }}
      >
        <Col xl={16} lg={16} md={24} xs={24}>
          <Suspense fallback={() => <div>loading...</div>}>
            <OverviewData loading={loading} data={homeData && homeData.overviewData}/>
          </Suspense>
        </Col>

        <Col xl={8} lg={8} md={24} xs={24}>
          <Suspense  fallback={() => <div>loading...</div>}>
            <CommissionWithdrawal loading={loading} />
          </Suspense>
        </Col>
      </Row>

      <Row
        gutter={24}
        style={{ marginBottom: 24 }}
      >
        <Col xl={16} lg={16} md={24} xs={24}>
          <Suspense  fallback={() => <div>loading...</div>}>
            <PendingTransaction loading={loading} data={homeData && homeData.pendingTransaction}/>
          </Suspense>
        </Col>

        <Col xl={8} lg={8} md={24} xs={24}>
          <Suspense  fallback={() => <div>loading...</div>}>
            <CommodityAnalysis loading={loading} />
          </Suspense>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xl={24} lg={24} md={24} xs={24}>
          <Suspense  fallback={() => <div>loading...</div>}>
            <OrderStatistics
              rangePickerValue={null}
              isActive={isActive}
              loading={loading}
              selectDate={selectDate} />
          </Suspense>
        </Col>
      </Row>
    </GridContent>
  )
}

export default Home;
