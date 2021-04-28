import React from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/es/card';
import { UpOutlined, DownOutlined } from '@/components/icon';
import numeral from 'numeral';
import ReactFitText from 'react-fittext';
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
  isFloat?:boolean,
}

const formatIsFloat = (num:number | React.ReactNode, isFloat:boolean) => {
  if(typeof num !== 'number' && typeof num !== 'string') return num;
  if(isFloat) {
    return numeral(num).format('0,0.00')
  }

  return numeral(num).format('0,0')
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
    isFloat = false,
    ...rest
  } = props;

  const renderContent = () => {
    if (loading) {
      return null;
    }

    return (
      <div className={styles.saleCard}>
        <div className={styles.left}>
          <ReactFitText minFontSize={16} maxFontSize={18}><div className={styles.name}>{name}</div></ReactFitText>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <ReactFitText minFontSize={35} maxFontSize={40}><b className={styles.total}>{formatIsFloat(total, isFloat)}</b> </ReactFitText>
            {/* <ReactFitText minFontSize={16} maxFontSize={20}><DownOutlined style={{ fontSize: 20 }} /></ReactFitText> */}
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
