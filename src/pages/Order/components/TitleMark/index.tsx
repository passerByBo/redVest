import React from 'react';
import styles from './index.less'

type TitleMarkProps = {
  label: string
}

const TitleMark: React.FC<TitleMarkProps> = ({ label }) => {
  return (
    <span className={styles.main}>{label}</span>
  )
}

export default TitleMark;
