import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Modal, Popover, Radio, Row, Select, Space, Table, TreeSelect, Upload } from 'antd';
import styles from '../style.less';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import { CheckOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { ColumnsType } from 'antd/lib/table';

import { AttrEditableRow, AttrEditableCell } from "./components/AttrEditable"
import { ISpecify } from '../../SpecificationModel/components/AddFormModal';
import { SpecifyItem, Specify } from '../../components/Specify';
import Preview from '../components/Preview';


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

//后续根据接口文档补充
export interface IProductAttr {
  [key: string]: string;
}
const TableTitle: React.FC<{ title: string, callback: Function }> = ({ title, callback }) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<Input>(null);
  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible)
  }

  const handleOk = () => {
    const value = inputRef?.current?.input?.value || ''
    inputRef?.current?.handleReset()
    callback(value);
    setVisible(false)
  }

  return (
    <>
      <span>{title}</span>
      <Popover

        content={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input ref={inputRef} />
            <Space style={{ marginTop: 10 }} >
              <Button size="small" onClick={() => { setVisible(false) }}>取消</Button>
              <Button size="small" type="primary" onClick={() => { handleOk() }}>确定</Button>
            </Space>

          </div>
        }
        title={title}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <EditOutlined onClick={callback()} className={styles.titleIcon} />
      </Popover>

    </>
  )
}

/**
 * 修改列
 * @param value
 * @param key
 */
const hangleColumnChange = (value: string, key: string) => {
  console.log(value, key)
}

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
    title: <TableTitle title='一级返佣' callback={(value) => { hangleColumnChange(value, '10') }} />,
    dataIndex: '10',
    editable: true,
  },
  {
    title: <TableTitle title='二级返佣' callback={(value) => { hangleColumnChange(value, '10') }} />,
    dataIndex: '11',
    editable: true,
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
    title: <TableTitle title='货号' callback={(value) => { hangleColumnChange(value, '3') }} />,
    dataIndex: '3',
    editable: true,
  },
  {
    title: <TableTitle title='销售价' callback={(value) => { hangleColumnChange(value, '4') }} />,
    dataIndex: '4',
    editable: true,
  },
  {
    title: <TableTitle title='成本价' callback={(value) => { hangleColumnChange(value, '5') }} />,
    dataIndex: '5',
    editable: true,
  },
  {
    title: <TableTitle title='划线价' callback={(value) => { hangleColumnChange(value, '6') }} />,
    dataIndex: '6',
    editable: true,
  },
  {
    title: <TableTitle title='库存价' callback={(value) => { hangleColumnChange(value, '7') }} />,
    dataIndex: '7',
    editable: true,
  },
  {
    title: <TableTitle title='重量' callback={(value) => { hangleColumnChange(value, '8') }} />,
    dataIndex: '8',
    editable: true,
  },
  {
    title: <TableTitle title='体积' callback={(value) => { hangleColumnChange(value, '9') }} />,
    dataIndex: '9',
    editable: true,
  },
]

const components = {
  body: {
    row: AttrEditableRow,
    cell: AttrEditableCell,
  }
}

const ProductForm: React.FC<IProductFormProps> = (props) => {

  //规格模板
  const [specify, setSpecify] = useState<ISpecify>({ name: '', value: '' });
  const [specifies, setSpecifies] = useState<string[]>([]);
  const [specifiesMap, setSpecifiesMap] = useState<Map<string, string[]>>(new Map());
  const [specifyInputs, setSpecifyInputs] = useState<string[]>([]);
  const [addSpecifyVisible, setAddSpecifyVisible] = useState(false);

  const [coverPictures, setCoverPictures] = useState<any[]>([...fileList])
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewTitle, setPreviewTitle] = useState<string>();

  const [commission, setCommission] = useState(1);


  const [previewProductVisible, setPreviewProductVisible] = useState(false);

  //商品属性列表元数据
  const [productsAttr, setProductsAttr] = useState<IProductAttr[]>([{ 1: '1', 2: '2', 3: '3', 5: '4', 4: '5', 6: '6', 7: '7', 8: '8', 9: '9' }, { 1: '2', 2: '2', 3: '3', 5: '4', 4: '5', 6: '6', 7: '7', 8: '8', 9: '9' }]);

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

  const handleSave = (row) => {
    const newData = [productsAttr];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setProductsAttr([...newData]);
  };

  const getColumns = (columns) => {
    return columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
        }),
      };
    })
  }


  const attrColumn = getColumns(productAttrColumn);

  const yColumn = getColumns(productYColumn);


  const specifyChange = (e, key: string) => {
    setSpecify({ ...specify, [key]: e.target.value })
  }

  const addSpecify = (data: ISpecify) => {
    const { name, value } = data;
    setSpecifies([...specifies, name]);
    setSpecifiesMap(specifiesMap.set(name, [value]));
    setAddSpecifyVisible(false);
  }

  /**
 * 删除规格值
 * @param name 规格名称
 * @param index 当前规格值所在位置
 */
  const deleteSpecifyValue = (name: string, index: number): void => {
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.splice(index, 1);
    specifiesMap.set(name, valueArr)
    let newMap = new Map(specifiesMap);
    setSpecifiesMap(newMap);
  }

  /**
   * 删除规格
   * @param name 规格名称
   */
  const deleteSpecify = (name: string, index: number): void => {
    specifiesMap.delete(name)
    setSpecifiesMap(specifiesMap);

    //删除保存的新增规格值的数组
    let arr = [...specifyInputs];
    arr.splice(index, 1);
    setSpecifyInputs(arr);
  }

  const addSpecifyValue = (name: string, index: number) => {
    let value = specifyInputs[index];

    //将新的数据加入到Map中
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.push(value);
    setSpecifiesMap(specifiesMap.set(name, valueArr));

    //每次添加完数据后清空原来的输入框
    let arr = [...specifyInputs];
    arr[index] = '';
    setSpecifyInputs(arr);
  }

  const specifyValueChange = (e, index: number) => {
    let arr = [...specifyInputs];
    arr[index] = e.target.value;
    setSpecifyInputs(arr);
  }


  const handleCommissionChange = (e) => {
    setCommission(e.target.value);
  }

  return (
    <>
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
                  <Button type="primary" ghost className={styles.right10} onClick={() => { setAddSpecifyVisible(true) }}>添加新规格</Button>
                  <Button type="primary">立即生成</Button>
                </Col>
              </Row>

              {
                addSpecifyVisible && (
                  <Row className={styles.addModalWrap} gutter={24}>
                    <Col className={styles.addModalCol} span={9}>
                      <span className={styles.label60} >规格:</span>
                      <Input onChange={(e) => specifyChange(e, 'name')} value={specify.name} placeholder='请输入规格'></Input>
                    </Col>
                    <Col className={styles.addModalCol} span={9}>
                      <span className={styles.label80}>规格值:</span>
                      <Input onChange={(e) => specifyChange(e, 'value')} value={specify.value} placeholder='请输入规格值'></Input>
                    </Col>
                    <Col className={styles.addModalCol} span={6}>
                      <Space>
                        <Button size="small">取消</Button>
                        <Button size="small" type='primary' onClick={() => { addSpecify(specify) }}>确认</Button>
                      </Space>
                    </Col>
                  </Row>
                )
              }


              {
                [...specifiesMap.keys()].map((name, i) => (
                  <Specify name={name} deleteBack={(name: string) => { deleteSpecify(name, i) }}>
                    {
                      (specifiesMap.get(name) || []).map((value: string, index: number) => (
                        <SpecifyItem value={value} deleteBack={() => { deleteSpecifyValue(name, index) }} />
                      ))
                    }

                    <Input.Group compact style={{ width: 162, marginTop: 10 }}>
                      <Input style={{ width: 120 }} value={specifyInputs[i]} placeholder="请输入规格值" onChange={(e) => { specifyValueChange(e, i) }} />
                      <Button onClick={() => { addSpecifyValue(name, i) }} icon={<CheckOutlined />} type='primary'></Button>
                    </Input.Group>
                  </Specify>
                ))
              }

              <Table
                style={{ marginTop: 24 }}
                pagination={false}
                components={components}
                rowClassName={styles['editable-row']}
                bordered
                dataSource={productsAttr}
                columns={attrColumn as ColumnsType}
              />
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

            <Row gutter={16}>
              <Col  {...smallItemLayout}>
                <Form.Item name="123123" label="商品状态">
                  <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={1}>上架</Radio>
                    <Radio value={2}>下架</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col  {...smallItemLayout}>
                <Form.Item name="sdfwse" label="商品状态">
                  <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={1}>开启</Radio>
                    <Radio value={2}>关闭</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col  {...smallItemLayout}>
                <Form.Item name="hjghj" label="商品状态">
                  <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={1}>开启</Radio>
                    <Radio value={2}>关闭</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col  {...smallItemLayout}>
                <Form.Item name="fdsf" label="商品状态">
                  <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={1}>免费包邮</Radio>
                    <Radio value={2}>邮费到付</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Space>
              <span>佣金设置</span>
              <Radio.Group onChange={handleCommissionChange} value={commission}>
                <Radio value={1}>默认设置</Radio>
                <Radio value={2}>自定义设置</Radio>
              </Radio.Group>
            </Space>

            {
              commission === 2 &&
              (
                <Table
                  style={{ marginTop: 24 }}
                  pagination={false}
                  components={components}
                  rowClassName={styles['editable-row']}
                  bordered
                  dataSource={productsAttr}
                  columns={yColumn as ColumnsType}
                />
              )
            }

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
          <Button onClick={() => { setPreviewProductVisible(true) }} loading={false}>
            预览
        </Button>
          <Button type="primary" onClick={() => form?.submit()} loading={false}>
            提交
        </Button>
        </FooterToolbar>
      </Form >

      <Preview product={{}} visible={previewProductVisible} onCancel={() => { setPreviewProductVisible(false) }} />
    </>

  )
}

export default ProductForm;
