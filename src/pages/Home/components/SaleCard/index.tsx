import React from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/es/card';
import {UpOutlined, DownOutlined} from '@/components/icon';
import numeral from 'numeral';
import styles from './index.less'
export interface SaleCartProps extends CardProps {
  name: string;
  total: React.ReactNode | number | (() => React.ReactNode | number);
  contentHeight?: number;
  icon: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  flag?: 'up' | 'down';
  contentStyle?: React.CSSProperties;
}

const SaleCard: React.FC<SaleCartProps> = (props) => {

  const {
    loading = false,
    children,
    total,
    icon,
    color,
    name,
    contentHeight,
    contentStyle,
    style,
    ...rest
  } = props;

  const renderContent = () => {
    if (loading) {
      return null;
    }

    return (
      <div className={styles.saleCard}>
        <div className={styles.left}>
          <div className={styles.name}>{name}</div>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <b className={styles.total}>{numeral(total).format('0,0')}</b>
            <DownOutlined style={{fontSize: 20}}/>
          </div>
        </div>
        {
          icon && <div className={styles.right}>
            {icon}
          </div>
        }
      </div>
    )
  }

  const bodyStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    height: 170,
    ...style
  }

  return (
    <Card loading={loading} bodyStyle={bodyStyle} {...rest}>
      {renderContent()}
    </Card>
  )
}

export default SaleCard;
