import React, { Suspense } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
//等宽和流式布局
import { GridContent } from '@ant-design/pro-layout';
import PageLoading from './components/PageLoading'
import styles from './style.less';


const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'))

const Home: React.FC = () => {
  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData}/>
        </Suspense>
      </>
    </GridContent>
  )
}

export default Home;
