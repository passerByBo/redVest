import React from 'react';
import { Card, Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import classnames from 'classnames';

import styles from '../style.less';



export interface OverviewDataProps {
  [key: string]: any;
  loading: boolean;
}


const OverviewData: React.FC<OverviewDataProps> = () => {

  return (
    <Card loading={false}
      bordered={false}
      title='数据总览'
      style={{
        height: '100%',
      }}
    >

      <div className={styles.overviewContent}>
        <div className={classnames(styles.overviewItem, styles.bottomLine)}>
            <div className={styles.overviewItemTitle}>

            </div>
            <div className={styles.overviewItemColumn}>
              <div className={styles.name}></div>
              <div className={styles.count}></div>
            </div>
        </div>

        <div className={styles.overviewItem}>

        </div>
      </div>
    </Card>
  )
}

export default OverviewData;
