import React from 'react';
import styles from './style.less';
import { Image, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';


export interface IProductProps {
  list?: string[];
}


const Pictures: React.FC<IProductProps> = ({ list }) => {


  return (
    <div className={styles.imaListWrap}>
      {
        Array.isArray(list) && list.map((pic: any) => (
          <div className={styles.pictureCardContainer}>
            <div className={styles.pictureCardContainerItem}>

              <Image className={styles.itemInfo} src={pic.imgUrl}
                preview={{
                  mask: <Space>
                    <EyeOutlined style={{ fontSize: 16 }} />
                  </Space>
                }} />
            </div>
          </div>
        ))
      }
    </div>
  )

}

export default Pictures;




