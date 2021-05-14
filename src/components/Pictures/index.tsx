import React from 'react';
import styles from './style.less';
import { Image, Space } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

let testArr: string[] = [
  "http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg",
  "http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg",
  "http://h.hiphotos.baidu.com/image/pic/item/7c1ed21b0ef41bd5f2c2a9e953da81cb39db3d1d.jpg",
  "http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938d5277fd5d0628535e5dd6f4a.jpg",
  "http://e.hiphotos.baidu.com/image/pic/item/4e4a20a4462309f7e41f5cfe760e0cf3d6cad6ee.jpg",
]

export interface IProductProps {
  list?: string[];
}


const Pictures: React.FC<IProductProps> = ({ list =  testArr}) => {
  return (
    <div className={styles.imaListWrap}>
      {
        list.map((url) => (
          <div className={styles.pictureCardContainer}>
            <div className={styles.pictureCardContainerItem}>
              <Image className={styles.itemInfo} src={url}
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




