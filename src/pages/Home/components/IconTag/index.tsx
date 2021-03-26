import React from 'react';
import styles from './index.less';

export interface IconoTagProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const IconTag: React.FC<IconoTagProps> = (props) => {
  const { icon } = props;
  return (
    <div className={styles.bg}>
      {icon}
    </div>
  )
}

export default IconTag;
