import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './style.less';
interface SpecifyItemProps {
  value: string;
  deleteBack(index: number): void;
}

const SpecifyItem: React.FC<SpecifyItemProps> = (props) => {
  const {value, deleteBack } = props;
  return (
    <div className={styles.specifyItem}>

      <span>{value}</span>
      <CloseOutlined onClick={() => { deleteBack() }} />
    </div>
  )
}

export default SpecifyItem;
