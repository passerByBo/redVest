import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
// import SpecifyItem from './specify-item';
import styles from './style.less';

export interface SpecifyProps {
  name: string;
  deleteBack(name: string): void;
}


const Specify: React.FC<SpecifyProps> = (props) => {
  const { children, name,deleteBack } = props;
  return (
    <div className={styles.specifyWrap}>
      <span className={styles.titleBtn}>{name || '规格'}
      <span className={styles.closeTop}>
          <CloseOutlined onClick={() => { deleteBack(name) }} style={{ color: 'white', fontSize: 10 }} />
        </span>
      </span>

      <div className={styles.specifyItemList}>
        {children}
      </div>
    </div>
  )
}



export default Specify;
