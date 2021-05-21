import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Col, Descriptions, message, Modal, Row, Space, Table, Image } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../style.less';
import { ColumnsType } from 'antd/lib/table';
import { useRequest, history, useModel } from 'umi';
import { getProductDetail } from '@/services/merchandise/product';
import ProSkeleton from '@ant-design/pro-skeleton';
import Pictures from '@/components/Pictures';
import { EyeOutlined } from '@ant-design/icons';

// const html = '<p><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-f3b56329-44af-4b42-9bc9-c6c6927ddf6d/除臭芳香片_01.jpg" style="max-width:100%;"><br></p><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-7cdcd670-3a22-48c9-bab9-688e5b5c8699/除臭芳香片_02.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-89f137f4-2a2a-459b-ba92-2b2b99e1e40b/除臭芳香片_03.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-7f260307-cf88-4fbd-aa40-333d52920375/除臭芳香片_04.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-163900051-48908fb6-0058-46b6-8f42-8f0fabe598f9/除臭芳香片_05.jpg" style="max-width:100%;"><br><br>'
// const html2 = '<p><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-5358fb58-ed1f-4c71-bff2-89aa410f1e71/光触媒_01.jpg" style="max-width:100%;"><br></p><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-cd8f7053-ce1b-448b-8f15-e7125536819c/光触媒_02.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-08552c29-9393-45e4-8281-4eb53368b02c/光触媒_03.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-5ed0ab71-398f-4e78-88c1-63ae4309f880/光触媒_04.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200014-d98d8e69-def3-4405-88c9-7187a13cb4af/光触媒_05.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200031-f37e1de7-30d6-4878-a2c9-1cc24ef923ca/光触媒_06.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200031-1fac22aa-f4bb-47b5-805e-e9db6a067432/光触媒_07.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-bab45ae9-df64-4613-8c39-4813b2bf5626/光触媒_08.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-f48d37bf-3b31-4b6f-94c6-e91004fa229b/光触媒_09.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200032-73e7e830-ff62-4d95-98e9-3d0d00e3e246/光触媒_10.jpg" style="max-width:100%;"><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-a2a578ee-0318-4c13-bb28-d57878a361ad/光触媒_11.jpg" style="max-width:100%;"><br><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-5e450e83-67fa-483a-aae6-03acdc7ff712/光触媒_12.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-fd864ba4-a438-440f-9a19-11e8f4bf9d7f/光触媒_13.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-8cf1f76d-5107-4c9b-bd6c-f572cdd19abe/光触媒_14.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152200049-dd8a68ad-40df-4fed-846e-5803d6a39571/光触媒_15.jpg" style="max-width:100%;"><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-12b99072-7ee2-48b2-a60a-00d3434e52ea/光触媒_16.jpg" style="max-width:100%;"><br><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-b6d6e156-32c6-46f5-9dbb-268798b3b196/光触媒_17.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-7c1e408c-58ac-4395-8d67-7d39bfc3299b/光触媒_18.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-96365f38-0f2e-47dc-9331-44a198ad4111/光触媒_19.jpg" style="max-width:100%;"><br><img src="https://www.xyxayf.com:9001/2021-01-14-152300006-6d0983ed-2ee4-4a84-996e-0a2a0142590c/光触媒_20.jpg" style="max-width:100%;"><br><br><br>'


interface IProductDetailProps {
  [key: string]: any
}


interface productDetail {
  [key: string]: string;
}

const productYColumn = [
  {
    title: 'SKU属性',
    dataIndex: 'skuName',
  },
  {
    title: '商品图片',
    dataIndex: 'skuImg',
    render: (_: string, record: any) => {
      return (
        <Image
          preview={{ mask: <EyeOutlined /> }}
          width={40}
          src={_ && Array.isArray(_) && _[0] && _[0].imgUrl}
        />
      )
    }
  },
  {
    title: '货号',
    dataIndex: 'articleNo',
  },
  {
    title: '销售价',
    dataIndex: 'salePrice',
  },
  {
    title: '成本价',
    dataIndex: 'supplyPrice',
  },
  {
    title: '划线价',
    dataIndex: 'marketPrice',
  },
  {
    title: '库存',
    dataIndex: 'marketPrice',
  },
  {
    title: '重量',
    dataIndex: 'marketPrice',
  },
  {
    title: '体积',
    dataIndex: 'marketPrice',
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
    dataIndex: 'skuName',
  },
  {
    title: '商品图片',
    dataIndex: 'skuImg',
    render: (_: string, record: any) => {
      return (
        <Image
          preview={{ mask: <EyeOutlined /> }}
          width={40}
          src={_ && Array.isArray(_) && _[0] && _[0].imgUrl}
        />
      )
    }
  },
  {
    title: '货号',
    dataIndex: 'articleNo',
  },
  {
    title: '销售价',
    dataIndex: 'salePrice',
  },
  {
    title: '成本价',
    dataIndex: 'supplyPrice',
  },
  {
    title: '划线价',
    dataIndex: 'marketPrice',
  },
  {
    title: '库存',
    dataIndex: 'marketPrice',
  },
  {
    title: '重量',
    dataIndex: 'marketPrice',
  },
  {
    title: '体积',
    dataIndex: 'marketPrice',
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

  // const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<productDetail>()

  const [innerHtml, setInnerHtml] = useState('');


  const productId = useMemo(() => {
    let pathname = history.location.pathname;
    let id = pathname.substring(pathname.lastIndexOf('/') + 1);
    return id;
  }, [])

  const { simpleDetail } = useModel('product', (ret: IProductDetailProps) => ({
    product: simpleDetail
  }))


  const { loading, run: getDetail } = useRequest(getProductDetail.bind(null, { productId }), {
    manual: true,
    onSuccess: (result, params) => {
      if (result) {
        setDetail({ ...result });
        setInnerHtml((result && result.productDetail) || '');
        return;
      }
      message.error('初始化商品详情失败，请重试！')
    }
  })

  useEffect(() => {
    getDetail()
  }, [])

  const description = (
    <RouteContext.Consumer>
      {
        ({ isMobile }) => {
          let curDetail = detail || simpleDetail || {};
          return (
            <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
              <Descriptions.Item label="商品名称">{curDetail.productName}</Descriptions.Item>
              <Descriptions.Item label="商品副标题">{curDetail.productTitle}</Descriptions.Item>
              <Descriptions.Item label="商品分类">{curDetail.typeName}</Descriptions.Item>
              <Descriptions.Item label="商品品牌">{curDetail.productBrand}</Descriptions.Item>
              <Descriptions.Item label="商品编号">{curDetail.productNo}</Descriptions.Item>
              <Descriptions.Item label="单位">{curDetail.productUnit}</Descriptions.Item>
              <Descriptions.Item label="商品排序">{curDetail.sort}</Descriptions.Item>
              <Descriptions.Item label="商品简介">{curDetail.productDescribe}</Descriptions.Item>
            </Descriptions>
          )
        }
      }
    </RouteContext.Consumer>
  )


  const handleTabChange = (key: string) => {
    if (key == '1') {
      setInnerHtml((detail && detail.productDetail) || '');
    }

    if (key == '2') {
      setInnerHtml((detail && detail.qualityReport1) || '');
    }
  }


  return (
    <PageContainer
      title={`${(detail && detail.productName) || (simpleDetail && simpleDetail.productName)}详细信息`}
      className={styles.pageHeader}
      content={description}
    >
      {loading ? <ProSkeleton type="descriptions" /> : <div className={styles.main}>
        <GridContent>
          <Card title="商品图文信息">
            <Row>
              <Col>
                <Space>
                  <span className={styles.spanLabel}>商品封面主图:</span>
                  <Pictures list={detail && detail.proLogoImg1} />
                </Space>
              </Col>
            </Row>

            <Row>
              <Col>
                <Space>
                  <span className={styles.spanLabel}>商品轮播图:</span>
                  <Pictures list={detail && detail.proRotationImg1} />
                </Space>
              </Col>
            </Row>
            <Card title="商品属性" style={{ marginTop: 16, marginBottom: 16 }}>
              <Table
                style={{ marginTop: 24 }}
                pagination={false}
                rowClassName={styles['editable-row']}
                bordered
                dataSource={(detail && detail.productSkuInfo) || []}
                columns={productAttrColumn as ColumnsType}
              />
            </Card>
            <RouteContext.Consumer>
              {
                ({ isMobile }) => (
                  <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 3}>
                    <Descriptions.Item label="商品状态">{detail && detail.productStatus}</Descriptions.Item>
                    <Descriptions.Item label="首页推荐">{detail && detail.isRecommend}</Descriptions.Item>
                    <Descriptions.Item label="精品推荐">{detail && detail.isBoutique}</Descriptions.Item>
                    <Descriptions.Item label="运费设置">{detail && detail.freightSetting}</Descriptions.Item>
                    <Descriptions.Item label="佣金设置">{detail && detail.commissionSetting}</Descriptions.Item>
                  </Descriptions>
                )
              }
            </RouteContext.Consumer>

            {detail && detail.commissionSetting == '1' && <Card title="商品佣金信息" style={{ marginTop: 16, marginBottom: 16 }}>
              <Table
                style={{ marginTop: 24 }}
                pagination={false}
                rowClassName={styles['editable-row']}
                bordered
                dataSource={(detail && detail.productSkuInfo) || []}
                columns={productYColumn as ColumnsType}
              />
            </Card>
            }
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
      }
    </PageContainer>
  )
}

export default ProductDetail;
