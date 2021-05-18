import { DownOutlined } from '@ant-design/icons';
import { Carousel, Dropdown, Menu, Modal, Radio, Space, Tabs } from 'antd';
import classnames from 'classnames';
import React, { useState } from 'react';
// import devices from './devices.min.css';
import styles from './style.less';

const { TabPane } = Tabs;
const html = '<p><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-f3b56329-44af-4b42-9bc9-c6c6927ddf6d/除臭芳香片_01.jpg" style="max-width:100%;"><br></p><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-7cdcd670-3a22-48c9-bab9-688e5b5c8699/除臭芳香片_02.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-89f137f4-2a2a-459b-ba92-2b2b99e1e40b/除臭芳香片_03.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-7f260307-cf88-4fbd-aa40-333d52920375/除臭芳香片_04.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-48908fb6-0058-46b6-8f42-8f0fabe598f9/除臭芳香片_05.jpg" style="max-width:100%;"><br><br>'
const html2 = '<p><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-5358fb58-ed1f-4c71-bff2-89aa410f1e71/光触媒_01.jpg" style="max-width:100%;"><br></p><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-cd8f7053-ce1b-448b-8f15-e7125536819c/光触媒_02.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-08552c29-9393-45e4-8281-4eb53368b02c/光触媒_03.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-5ed0ab71-398f-4e78-88c1-63ae4309f880/光触媒_04.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-d98d8e69-def3-4405-88c9-7187a13cb4af/光触媒_05.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200031-f37e1de7-30d6-4878-a2c9-1cc24ef923ca/光触媒_06.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200031-1fac22aa-f4bb-47b5-805e-e9db6a067432/光触媒_07.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-bab45ae9-df64-4613-8c39-4813b2bf5626/光触媒_08.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-f48d37bf-3b31-4b6f-94c6-e91004fa229b/光触媒_09.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-73e7e830-ff62-4d95-98e9-3d0d00e3e246/光触媒_10.jpg" style="max-width:100%;"><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-a2a578ee-0318-4c13-bb28-d57878a361ad/光触媒_11.jpg" style="max-width:100%;"><br><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-5e450e83-67fa-483a-aae6-03acdc7ff712/光触媒_12.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-fd864ba4-a438-440f-9a19-11e8f4bf9d7f/光触媒_13.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-8cf1f76d-5107-4c9b-bd6c-f572cdd19abe/光触媒_14.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-dd8a68ad-40df-4fed-846e-5803d6a39571/光触媒_15.jpg" style="max-width:100%;"><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-12b99072-7ee2-48b2-a60a-00d3434e52ea/光触媒_16.jpg" style="max-width:100%;"><br><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-b6d6e156-32c6-46f5-9dbb-268798b3b196/光触媒_17.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-7c1e408c-58ac-4395-8d67-7d39bfc3299b/光触媒_18.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-96365f38-0f2e-47dc-9331-44a198ad4111/光触媒_19.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-6d0983ed-2ee4-4a84-996e-0a2a0142590c/光触媒_20.jpg" style="max-width:100%;"><br><br><br>'

const DEVICES = [
  {
    name: 'iPhone X',
    id: 'device-iphone-x',
  },
  {
    name: 'iPhone 8',
    id: 'device-iphone-8'
  },
  {
    name: 'Google Pixel',
    id: 'device-google-pixel',
  },
  {
    name: 'Samsung Galaxy S8',
    id: 'device-galaxy-s8',
  },
  {
    name: 'iPad Pro',
    id: 'device-ipad-pro',
  },
]

export interface IColor {
  class: string;
  color: string;
}

const COLOR_MAP = {
  'device-iphone-x': [],
  'device-iphone-8': [{ class: 'device-silver', color: '#e2e3e4' }, { class: 'device-gold', color: '#f7e8dd' }, { class: 'device-spacegray', color: '#9b9ba0' }],
  'device-google-pixel': [{ class: 'device-silver', color: '#e2e3e4' }, { class: 'device-black', color: '#6a6967' }, { class: 'device-blue', color: '#7695ff' }],
  'device-galaxy-s8': [{ class: 'device-black', color: '#cfcfcf' }, { class: 'device-blue', color: '#a3c5e8' }],
  'device-ipad-pro': [{ class: 'device-silver', color: '#e2e3e4' }, { class: 'device-gold', color: '#f7e8dd' }, { class: 'device-rosegold', color: '#facfc9' }, { class: 'device-spacegray', color: '#9b9ba0' }]
}

export interface IPreviewProps {
  product: object;
  title?: string;
  visible: boolean,
  onCancel: () => void;
}



const Preview: React.FC<IPreviewProps> = (props) => {
  const { product, ...others } = props;
  const [device, setDevices] = useState(DEVICES[0]);
  const [deviceColors, setDeviceColors] = useState<IColor[]>([]);
  const [deviceColorClass, setDeviceColorClass] = useState('');
  const { productName, productDescribe, productTitle, proRotationImg1, proLogoImg1, qualityReport1, productDetail } = product;


  const handleDeviceSelect = (key: string) => {
    for (let i = 0, length = DEVICES.length; i < length; i++) {
      let item = DEVICES[i];
      if (item.id === key) {
        setDevices({ ...item }); break;
      }
    }

    //设置选中设备的颜色
    let colors: IColor[] = COLOR_MAP[key];
    setDeviceColors([...colors]);
    colors.length > 0 && setDeviceColorClass(colors[0].class)
  }

  const menu = (
    <Menu onClick={(e) => { handleDeviceSelect(e.key) }}>
      {
        DEVICES.map((item, index) => (
          <Menu.Item key={item.id}>
            {item.name}
          </Menu.Item>
        ))
      }
    </Menu>
  )




  return (
    <Modal title={'商品预览'} footer={null} {...others} width={800}>

      <div className={styles.previeWrap}>

        <div className={styles.dvicesBtns}>
          <Dropdown overlay={menu} trigger={['click']}>
            <b className={styles.deviceName}>型号：{device.name}<DownOutlined style={{ marginLeft: 10 }} /></b>
          </Dropdown>
          <Space className={styles.space}>
            {
              deviceColors.map((item: IColor) => (
                <div onClick={() => setDeviceColorClass(item.class)} className={styles.dot} style={{ backgroundColor: item.color }}></div>
              ))
            }
          </Space>
        </div>

        <div style={{ alignSelf: 'center' }} className={classnames('device', device.id, styles[device.id], deviceColorClass)}>
          <div className="device-frame">
            <div className={styles["container-wrapper"]}>
              <div className={styles["header-fill"]}></div>
              <header>
                商品详情
              </header>
              <div className={styles.container}>

                <Carousel autoplay>
                  {
                    proRotationImg1 && proRotationImg1.split(',').map((url: string) => (
                      <img className={styles.carouselImg} src={url}
                        alt="" />
                    ))
                  }
                </Carousel>
                <div className={styles['title-box']}>
                  <div className={styles["price-label"]}>本店售价</div>
                  <div className={styles["price-info"]}>
                    <span className={styles["integer-part"]}>68<span className={styles["decimal-part"]}>.99</span></span>
                    <span className={styles["retail-price"]}>99.99</span>
                  </div>
                  <div className={styles["product-title"]}>
                    {productName}
                  </div>
                </div>


                <Tabs defaultActiveKey="1" onChange={() => { }} tabBarStyle={{ backgroundColor: 'white' }} centered >
                  <TabPane tab="商品参数" key="1" >
                    <div dangerouslySetInnerHTML={{ __html: productDetail }}>

                    </div>
                  </TabPane>
                  <TabPane tab="质检报告" key="2">
                    <div dangerouslySetInnerHTML={{ __html: qualityReport1 }}>

                    </div>
                  </TabPane>
                </Tabs>

              </div>
            </div>
          </div>
          <div className="device-stripe"></div>
          <div className="device-header"></div>
          <div className="device-sensors"></div>
          <div className="device-btns"></div>
          <div className="device-power"></div>
        </div>
      </div>
    </Modal >
  )
}

export default Preview;
