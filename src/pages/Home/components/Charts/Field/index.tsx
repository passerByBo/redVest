import React from 'react';
import styles from './index.less';

export interface FielfProps {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}

const Field: React.FC<FieldProps> = ({ label, value, ...rest }) => (
  <div className={styles.field}>
    <span className={styles.label}>{label}</span>
    <span className={styles.number}>{value}</span>
  </div>
)

export default Field;
