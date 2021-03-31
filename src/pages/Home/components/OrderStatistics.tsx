import React from 'react';
import { Card, Space, DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { TimelineChart } from './Charts'
import styles from '../style.less';


type RangePickerValue = RangePickerProps<moment.Moment>['value'];

export interface OrderStatisticsProps {
  rangePickerValue: RangePickerValue;
  isActive: (key: 'today' | 'week' | 'month' | 'year') => string;
  orderData: any[];
  loading: boolean;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: 'today' | 'week' | 'month' | 'year') => void;
}

const { RangePicker } = DatePicker;
const OrderStatistics: React.FC<OrderStatisticsProps> = (props) => {


  const {
    loading,
    isActive,
    selectDate
  } = props;


  const offlineChartData = [];
  for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  const extra = (
    <div className={styles.orderExtraWrap}>
      <div className={styles.orderExtra}>
        <a className={isActive('week')} onClick={() => selectDate('week')}>本周</a>
        <a className={isActive('month')} onClick={() => selectDate('month')}>本月</a>
        <a className={isActive('year')} onClick={() => selectDate('year')}>今年</a>
      </div>
      <RangePicker style={{ width: 256 }}></RangePicker>
    </div>
  )

  return (
    <Card
      loading={false}
      bordered={false}
      title='订单统计'
      style={{
        height: '100%',
      }}
      extra={extra}
    >
      <div className={styles.orderStatistics}>
        <div className={classnames(styles.orderList, styles.flexColumn)}>

          <div className={classnames(styles.orderListItem, styles.flexRow)}>
            <div className={classnames(styles.orderListItemLeft, styles.flexColumn)}>
              <span className={styles.name}>本月订单总数</span>
              <b className={styles.text}>100000<span className={styles.name}>个</span></b>
            </div>
            <div className={classnames(styles.orderListItemRight, styles.flexColumn)}>
              <span className={styles.name}>同比上月</span>
              <Space><span className={classnames(styles.red6, styles.lineHeight32)}>+10%</span ><CaretUpOutlined /></Space>
            </div>
          </div>

          <div className={classnames(styles.orderListItem, styles.flexRow)}>
            <div className={classnames(styles.orderListItemLeft, styles.flexColumn)}>
              <span className={styles.name}>本周订单总数</span>
              <b className={styles.text}>100000<span className={styles.name}>个</span></b>
            </div>
            <div className={classnames(styles.orderListItemRight, styles.flexColumn)}>
              <span className={styles.name}>同比上周</span>
              <Space><span className={classnames(styles.green6, styles.lineHeight32)}>+10%</span ><CaretDownOutlined /></Space>
            </div>
          </div>

          <div className={classnames(styles.orderListItem, styles.flexRow)}>
            <div className={classnames(styles.orderListItemLeft, styles.flexColumn)}>
              <span className={styles.name} >本月销售总额</span>
              <b className={styles.text}>100000<span className={styles.name}>个</span></b>
            </div>
            <div className={classnames(styles.orderListItemRight, styles.flexColumn)}>
              <span className={styles.name}>同比上月</span>
              <Space><span className={classnames(styles.red6, styles.lineHeight32)}>+10%</span ><CaretUpOutlined /></Space>
            </div>
          </div>

          <div className={classnames(styles.orderListItem, styles.flexRow)}>
            <div className={classnames(styles.orderListItemLeft, styles.flexColumn)}>
              <span className={styles.name} >本周销售总额</span>
              <b className={styles.text}>100000<span className={styles.name}>个</span></b>
            </div>
            <div className={classnames(styles.orderListItemRight, styles.flexColumn)}>
              <span className={styles.name}>同比上周</span>
              <Space><span className={classnames(styles.green6, styles.lineHeight32)}>+10%</span ><CaretDownOutlined /></Space>
            </div>
          </div>
        </div>
        <div className={styles.line} />
        {/* <div style={{ padding: '0 24px', flex: 1}}> */}
        <TimelineChart
          height={300}
          titleMap={{
            y1: '客流量',
            y2: '支付笔数'
          }}
          data={offlineChartData}
        />
        {/* </div> */}
      </div>
    </Card >
  )
}

export default OrderStatistics;
