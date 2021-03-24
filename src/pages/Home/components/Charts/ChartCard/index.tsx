import { Card } from 'antd';
import { CardProps } from 'antd/es/card';
import  React from 'react';
import classNames from 'classNames';
import styles from './index.less';

type totalType = () => React.ReactNode;


const renderTotal = (total?: number | totalType | React.ReactNode) => {
  if (!total && total !== 0) {
    return null;
  }

  let totalDom;

  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;

    case 'function':
      totalDom = <div className={styles.total}>{total()}</div>
      break;

    default:
      totalDom = <div className={styles.total}>{total}</div>
      break;
  }
  return totalDom;
}

export interface ChartCardProps extends CardProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
}

const ChartCard: React.FC<ChartCardProps> = (props) => {

  const {
    loading = false,
    contentHeight,
    title,
    avatar,
    action,
    total,
    footer,
    children,
    ...rest
  } = props;

  console.log('props',props)

  const renderContent = () => {
    if (loading) {
      return false;
    }
    return (
      <div className={styles.chartCard}>
        <div
          className={classNames(styles.chartTop, {
            [styles.chartTopMargin]: !children && !footer
          })}
        >
          <div className={styles.avatar}>{avatar}</div>
          <div className={styles.metaWrap}>
            <div className={styles.meta}>
              <span className={styles.title}>{title}</span>
              <span className={styles.action}>{action}</span>
            </div>
            {renderTotal(total)}
          </div>
        </div>

        {
          children && (
            <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
              <div className={contentHeight && styles.contentFixed}>{children}</div>
            </div>
          )
        }
        {
          footer && (
            <div
              className={classNames(styles.footer, {
                [styles.footerMargin]: !children
              })}
            >
              {footer}
            </div>
          )
        }
      </div>
    )

  }
  return (
    <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
      {renderContent()}
    </Card>
  )
}

export default ChartCard;
