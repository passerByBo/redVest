import React, { useState, useRef } from 'react';
import {
  RoseChart
} from 'bizcharts';
import ReactFitText from 'react-fittext';
import autoHeight from '../autoHeight';
import classnames from 'classnames';
import styles from './index.less';

export interface RoseRingProps {
  height?: number;
  padding?: [number, number, number, number],
  animate?: boolean;
}

export interface RoseRingState {

}

const RoseRing: React.FC<RoseRingProps> = (props) => {

  const [hasLegend, setHasLegend] = useState(false);
  const [legendBlock, setLegendBlock] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  // 数据源
  const data = [
    {
      type: '厨房',
      value: 27,
    },
    {
      type: '儿童房',
      value: 25,
    },
    {
      type: '餐厅',
      value: 18,
    },
    {
      type: '书房',
      value: 15,
    },
    {
      type: '卧室',
      value: 10,
    },
    {
      type: '阳台',
      value: 5,
    },
  ];


  const scale = {
    x: {
      type: 'cat',
      range: [0, 1],
    },
    y: {
      min: 0
    }
  }

  const roseRingClassName = classnames(styles.roseRing, {
    [styles.hasLegend]: !!hasLegend,
    [styles.legendBlock]: legendBlock,
  })

  const padding = [12, 0, 12, 0] as [number, number, number, number]

  const {
    height = 400,
    animate = true,
  } = props;

  return (
    <div ref={rootRef} className={roseRingClassName}>
      <ReactFitText maxFontSize={25}>
        <div className={styles.chart}>
          <RoseChart
            height={height}
            data={data}
            autoFit
            radius={1}
            radiusField='value'
            categoryField='type'
            colorField='type'
            label={{
              // content: (text) => text.value,
              type: 'inner'
            }}
          />
        </div>
      </ReactFitText>

    </div>
  )
}

export default autoHeight()(RoseRing);
