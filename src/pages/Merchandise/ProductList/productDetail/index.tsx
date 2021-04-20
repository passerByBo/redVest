import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Col, Descriptions, Modal, Row, Space, Table, Upload } from 'antd';
import React, { useState } from 'react';
import styles from '../style.less';
import { ColumnsType } from 'antd/lib/table';

const html = '<p><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-f3b56329-44af-4b42-9bc9-c6c6927ddf6d/除臭芳香片_01.jpg" style="max-width:100%;"><br></p><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-7cdcd670-3a22-48c9-bab9-688e5b5c8699/除臭芳香片_02.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-89f137f4-2a2a-459b-ba92-2b2b99e1e40b/除臭芳香片_03.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-7f260307-cf88-4fbd-aa40-333d52920375/除臭芳香片_04.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-48908fb6-0058-46b6-8f42-8f0fabe598f9/除臭芳香片_05.jpg" style="max-width:100%;"><br><br>'
const html2 = '<p><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-5358fb58-ed1f-4c71-bff2-89aa410f1e71/光触媒_01.jpg" style="max-width:100%;"><br></p><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-cd8f7053-ce1b-448b-8f15-e7125536819c/光触媒_02.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-08552c29-9393-45e4-8281-4eb53368b02c/光触媒_03.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-5ed0ab71-398f-4e78-88c1-63ae4309f880/光触媒_04.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-d98d8e69-def3-4405-88c9-7187a13cb4af/光触媒_05.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200031-f37e1de7-30d6-4878-a2c9-1cc24ef923ca/光触媒_06.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200031-1fac22aa-f4bb-47b5-805e-e9db6a067432/光触媒_07.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-bab45ae9-df64-4613-8c39-4813b2bf5626/光触媒_08.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-f48d37bf-3b31-4b6f-94c6-e91004fa229b/光触媒_09.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-73e7e830-ff62-4d95-98e9-3d0d00e3e246/光触媒_10.jpg" style="max-width:100%;"><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-a2a578ee-0318-4c13-bb28-d57878a361ad/光触媒_11.jpg" style="max-width:100%;"><br><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-5e450e83-67fa-483a-aae6-03acdc7ff712/光触媒_12.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-fd864ba4-a438-440f-9a19-11e8f4bf9d7f/光触媒_13.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-8cf1f76d-5107-4c9b-bd6c-f572cdd19abe/光触媒_14.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-dd8a68ad-40df-4fed-846e-5803d6a39571/光触媒_15.jpg" style="max-width:100%;"><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-12b99072-7ee2-48b2-a60a-00d3434e52ea/光触媒_16.jpg" style="max-width:100%;"><br><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-b6d6e156-32c6-46f5-9dbb-268798b3b196/光触媒_17.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-7c1e408c-58ac-4395-8d67-7d39bfc3299b/光触媒_18.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-96365f38-0f2e-47dc-9331-44a198ad4111/光触媒_19.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-6d0983ed-2ee4-4a84-996e-0a2a0142590c/光触媒_20.jpg" style="max-width:100%;"><br><br><br>'


interface IProductDetailProps {

}

const fileList = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-4',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
]


const productYColumn = [
  {
    title: 'SKU属性',
    dataIndex: '1',
  },
  {
    title: '商品图片',
    dataIndex: '2',
  },
  {
    title: '货号',
    dataIndex: '3',
  },
  {
    title: '销售价',
    dataIndex: '4',
  },
  {
    title: '成本价',
    dataIndex: '5',
  },
  {
    title: '划线价',
    dataIndex: '6',
  },
  {
    title: '库存价',
    dataIndex: '7',
  },
  {
    title: '重量',
    dataIndex: '8',
  },
  {
    title: '体积',
    dataIndex: '9',
  },
  {
    title: '体积',
    dataIndex: '9',
  },
  {
    title: '一级返佣',
    dataIndex: '10',
  },
  {
    title: '二级返佣',
    dataIndex: '11',
  },
]

const productAttrColumn = [
  {
    title: 'SKU属性',
    dataIndex: '1',
  },
  {
    title: '商品图片',
    dataIndex: '2',
  },
  {
    title: '货号',
    dataIndex: '3',
    editable: true,
  },
  {
    title: '销售价',
    dataIndex: '4',
    editable: true,
  },
  {
    title: '成本价',
    dataIndex: '5',
    editable: true,
  },
  {
    title: '划线价',
    dataIndex: '6',
    editable: true,
  },
  {
    title: '库存价',
    dataIndex: '7',
    editable: true,
  },
  {
    title: '重量',
    dataIndex: '8',
    editable: true,
  },
  {
    title: '体积',
    dataIndex: '9',
    editable: true,
  },
]


const operationTabList = [
  {
    key: '1',
    tab: '商品详情',
  },
  {
    key: '2',
    tab: '质检报告',
  }
];

const ProductDetail: React.FC<IProductDetailProps> = (props) => {

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewTitle, setPreviewTitle] = useState<string>();

  const [innerHtml, setInnerHtml] = useState(html);

  const handlePreview = async file => {
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  };

  const description = (
    <RouteContext.Consumer>
      {
        ({ isMobile }) => (
          <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
            {/* <Descriptions.Item label="商品名称">松下浴霸排气扇</Descriptions.Item> */}
            <Descriptions.Item label="商品副标题">松下浴霸排气扇照明一体集成吊顶家用卫生间超薄多功能风暖暖风机</Descriptions.Item>
            <Descriptions.Item label="商品分类">一级分类 - 二级分类</Descriptions.Item>
            <Descriptions.Item label="商品品牌">某某品牌</Descriptions.Item>
            <Descriptions.Item label="商品编号">12312312312523</Descriptions.Item>
            <Descriptions.Item label="单位">件</Descriptions.Item>
            <Descriptions.Item label="商品排序">100</Descriptions.Item>
            <Descriptions.Item label="商品简介">工程 采购更优惠工程 采购更优惠工程 采购更优惠工程 采购更优惠工程 采购更优惠工程 采购更优惠工程 采购更优惠工程 采购更优惠工程 采购更优惠工程 采购更优惠</Descriptions.Item>
          </Descriptions>
        )
      }
    </RouteContext.Consumer>
  )


  const handleTabChange = (key: string) => {
    if (key == '1') {
      setInnerHtml(html);
    }

    if (key == '2') {
      setInnerHtml(html2);
    }
  }

  return (
    <PageContainer
      title={'	中国蓝星BLUESTAR除菌除臭剂50g*12块 双色蓝泡泡马桶除臭去异味神器厕所家用卫生间清香型味清洁剂宝99'}
      className={styles.pageHeader}
      content={description}
    >
      <div className={styles.main}>
        <GridContent>
          <Card title="商品图文信息">
            <Row>
              <Col>
                <Space>
                  <span className={styles.spanLabel}>商品封面主图:</span>
                  <Upload
                    openFileDialogOnClick={false}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onRemove={() => false}
                    showUploadList={{ showRemoveIcon: false }}
                  >
                  </Upload>
                </Space>
              </Col>
            </Row>

            <Row>
              <Col>
                <Space>
                  <span className={styles.spanLabel}>商品轮播图:</span>
                  <Upload
                    openFileDialogOnClick={false}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onRemove={() => false}
                    showUploadList={{ showRemoveIcon: false }}
                  >
                  </Upload>
                </Space>
              </Col>
            </Row>
            <Card title="商品属性" style={{ marginTop: 16, marginBottom: 16 }}>
              <Table
                style={{ marginTop: 24 }}
                pagination={false}
                rowClassName={styles['editable-row']}
                bordered
                dataSource={[{ 1: '1', 2: '2', 3: '3', 5: '4', 4: '5', 6: '6', 7: '7', 8: '8', 9: '9' }, { 1: '2', 2: '2', 3: '3', 5: '4', 4: '5', 6: '6', 7: '7', 8: '8', 9: '9' }]}
                columns={productAttrColumn as ColumnsType}
              />
            </Card>
            <RouteContext.Consumer>
              {
                ({ isMobile }) => (
                  <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 3}>
                    <Descriptions.Item label="商品状态">下架</Descriptions.Item>
                    <Descriptions.Item label="首页推荐">关闭</Descriptions.Item>
                    <Descriptions.Item label="精品推荐">关闭</Descriptions.Item>
                    <Descriptions.Item label="运费设置">邮费到付</Descriptions.Item>
                    <Descriptions.Item label="佣金设置">自定义设置</Descriptions.Item>
                  </Descriptions>
                )
              }
            </RouteContext.Consumer>

            <Card title="商品佣金信息" style={{ marginTop: 16, marginBottom: 16 }}>
              <Table
                style={{ marginTop: 24 }}
                pagination={false}
                rowClassName={styles['editable-row']}
                bordered
                dataSource={[{ 1: '1', 2: '2', 3: '3', 5: '4', 4: '5', 6: '6', 7: '7', 8: '8', 9: '9' }, { 1: '2', 2: '2', 3: '3', 5: '4', 4: '5', 6: '6', 7: '7', 8: '8', 9: '9' }]}
                columns={productYColumn as ColumnsType}
              />
            </Card>
            {/* 显示富文本信息 */}

          </Card>

          <Card
            style={{ marginTop: 24 }}
            bordered={false}
            tabList={operationTabList}
            onTabChange={handleTabChange}
          >
            <div dangerouslySetInnerHTML={{ __html: innerHtml }}></div>
          </Card>
        </GridContent>
      </div>

      {/* 预览图片 */}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => { setPreviewVisible(false) }}
      >
        <img alt="商品主图" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </PageContainer>
  )
}

export default ProductDetail;
