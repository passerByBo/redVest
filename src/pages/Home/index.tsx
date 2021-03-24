import React, { Suspense,useState,useEffect } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
//等宽和流式布局
import { GridContent } from '@ant-design/pro-layout';
import PageLoading from './components/PageLoading';
import {fakeChartData} from './service'
import styles from './style.less';
import { AnalysisData } from './data.d';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'))

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
          <IntroduceRow loading={loading} visitData={chartsData?.visitData}/>
        </Suspense>
      </>
    </GridContent>
  )
}

export default Home;
