import React, { useState } from 'react';
import { history } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Modal, Row, Select, Space, Table, TreeSelect, Upload } from 'antd';
import styles from '../style.less';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
const { SHOW_PARENT } = TreeSelect;
const { TextArea } = Input;
const { Option } = Select;
interface IProductFormProps {

}

interface IImageListItem {
  uid: string;
  name: string;
  status: string;
  url: string;
  percent?: string
}

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

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

const largItemLayout = {
  xl: 12,
  lg: 12,
  md: 24,
  sm: 24,
  xs: 24
}

const smallItemLayout = {
  xl: 6,
  lg: 6,
  md: 12,
  sm: 12,
  xs: 12,
}

// const components = {
//   body: {
//     row: EditableRow,
//     cell: EditableCell,
//   },
// };

const ProductForm: React.FC<IProductFormProps> = (props) => {


  const [coverPictures, setCoverPictures] = useState<any[]>([...fileList])
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewTitle, setPreviewTitle] = useState<string>();

  const [form] = Form.useForm();

  const { location: { query } } = history;

  const tProps = {
    treeData,
    value: '',
    onChange: () => { },
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

  //选择图片
  const selectCoverPictures = (e) => {
    alert(1)
  }

  const handlePreview = async file => {
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  };

  const handleChange = ({ fileList }) => setCoverPictures(fileList);


  const uploadButton = (
    <div className={styles.selectBtn} onClick={selectCoverPictures}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>选择图片</div>
    </div>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{}}
      onFinish={() => { }}
      onFinishFailed={() => { }}
    >
      <PageContainer>
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Row>
            <Col span={24}>
              <Form.Item
                label={'商品分类'}
                name="name"
                rules={[{ required: true, message: '请选择商品分类' }]}
              >
                <TreeSelect {...tProps} placeholder="一级类目 < 二级类目" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col {...largItemLayout}>
              <Form.Item
                label={'商品名称'}
                name="name"
                rules={[{ required: true, message: '请输入商品名称' }]}
              >
                <Input placeholder="请输入商品名称" />
              </Form.Item>
            </Col>
            <Col {...largItemLayout}>
              <Form.Item
                label={'商品副标题'}
                name="subName"
                rules={[{ required: true, message: '请输入商品副标题名称' }]}
              >
                <Input placeholder="请输入商品副标题名称" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col {...smallItemLayout}>
              <Form.Item
                label={'商品品牌'}
                name="ping31235pai"
                rules={[{ required: true, message: '请输入商品品牌' }]}
              >
                <Input placeholder="请输入商品品牌" />
              </Form.Item>
            </Col>
            <Col {...smallItemLayout}>
              <Form.Item
                label={'商品编码'}
                name="pin1321gpai"
              >
                <Input placeholder="请输入商品编码" />
              </Form.Item>
            </Col>
            <Col {...smallItemLayout}>
              <Form.Item
                label={'单位'}
                name="ping11pai"
              >
                <Input placeholder="请输入单位" />
              </Form.Item>
            </Col>
            <Col {...smallItemLayout}>
              <Form.Item
                label={'商品排序'}
                name="pingpai22"
              >
                <Input placeholder="请输入商品排序" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} >
              <Form.Item
                style={{ marginBottom: 0 }}
                label={'商品简介'}
                name="pingpai33"
              >
                <TextArea placeholder="请输入商品简介" allowClear />
              </Form.Item>

            </Col>
          </Row>
        </Card>

        <Card title="商品图文信息" className={styles.card} bordered={false}>

          <Row>
            <Col span={24}>
              <Form.Item
                label={'商品封面主图'}
                name="pingpai322223"
              >
                <Upload
                  openFileDialogOnClick={false}
                  listType="picture-card"
                  fileList={coverPictures}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <span className={styles.attaction}>建议尺寸：800*800，单张图片不超过256kb，只可上传一张。</span>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label={'商品轮播图'}
                name="123123123"
              >
                <Upload
                  openFileDialogOnClick={false}
                  listType="picture-card"
                  fileList={coverPictures}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <span className={styles.attaction}>建议尺寸：800*800，单张图片不超过256kb，最多可上传5张。</span>
              </Form.Item>
            </Col>
          </Row>

          <Card type="inner" title="商品规格" className={styles.card}>
            <Row>
              <Col span={24} className={styles.specifyRow}>
                <span className={classnames(styles.label, styles.right10)}>选择规格模板:</span>
                <Input.Group className={styles.right10} compact style={{ width: 265 }}>
                  <Select
                    showSearch
                    placeholder="选择规格模板"
                    optionFilterProp="children"
                    onChange={() => { }}
                    style={{ width: 200 }}
                  // filterOption={(input, option) => {}}
                  >
                    <Option value="1">规格模板1</Option>
                    <Option value="2">规格模板2</Option>
                    <Option value="3">规格模板3</Option>
                  </Select>
                  <Button >确认</Button>
                </Input.Group>
                <Button type="primary" ghost className={styles.right10}>添加新规格</Button>
                <Button type="primary">立即生成</Button>
              </Col>
            </Row>

            {/* <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
            /> */}
          </Card>

          <Row>
            <Col span={24}>
              <Form.Item name="productDetail" label="商品详情" rules={[{ required: true, message: '请输入商品详情' }]} >
                <BraftEditor
                  className='my-editor'
                  placeholder=""
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

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
      <FooterToolbar>
        {/* {getErrorInfo(error)} */}
        <Button type="primary" onClick={() => form?.submit()} loading={false}>
          提交
        </Button>
      </FooterToolbar>
    </Form >
  )
}

export default ProductForm;
