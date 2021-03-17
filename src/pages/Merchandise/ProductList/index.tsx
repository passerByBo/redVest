import { PlusOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Form } from 'antd';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import { getProductList } from '@/services/merchandise/product';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormUploadButton,
  ProFormTextArea,
  DrawerForm,
  ProFormRadio,
  ProFormUploadDragger,
  ProFormSwitch,
} from '@ant-design/pro-form';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
/**
 * 添加节点
 *
 * @param fields
 */

type ProductListItem = {
  id: string,
  productName: string,
  shopId: string,
  shopName: string,
  topicName: string,
  productNo: string,
  categories: string,
  productSpecify: string,
  productBrand: string,
  productBrandId: string,
  shelfOnDate: string,
  salePrice: string,
  shareRatio: string,
  [key: string]: string,
}
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const handleAdd = async (fields: ProductListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: ProductListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const ProductList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ProductListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ProductListItem[]>([]);

  //tab切换state
  const [productTab, setProductTab] = useState('added')

  //商品表单
  const [productFormVisible, setProductFormVisible] = useState(false);

  //编辑商品
  const [editProduct, setEditProduct] = useState<ProductListItem>()

  //操作按钮state
  const [toolBarRenderList, setToolBarRenderList] = useState([[
    (<Button danger ghost type="primary" key="primary" onClick={() => { }}>
      <VerticalAlignBottomOutlined />下架
    </Button>)
  ]]);

  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
      render: ((_, item) => {
        return (
          <a onClick={() => { setEditProduct(item); setProductFormVisible(true) }}>{_}</a>
        )
      })
    },
    {
      title: '商铺名称',
      dataIndex: 'shopName',
      valueType: 'textarea',
    },
    {
      title: '专题名称',
      dataIndex: 'topicName',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '商品货号',
      dataIndex: 'productNo',
      valueType: 'textarea',
    },
    {
      title: '商品分类',
      dataIndex: 'categories',
      valueType: 'textarea',
    },
    {
      title: '商品规格',
      dataIndex: 'productSpecify',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '商品品牌',
      dataIndex: 'productBrand',
      valueType: 'textarea',
    },
    {
      title: '上架日期',
      dataIndex: 'shelfOnDate',
      search: false,
      valueType: 'textarea',
    },
    {
      title: '销售价格',
      dataIndex: 'salePrice',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '返现率',
      dataIndex: 'shareRatio',
      valueType: 'textarea',
      search: false,
    }
  ]

  const onTabChange = (key: string) => {
    let toolBarList = [];
    //切换到已上架
    if (key === 'added') {
      toolBarList = [
        <Button danger ghost type="primary" key="primary" onClick={() => { }}>
          <VerticalAlignBottomOutlined />下架
       </Button>
      ]
    } else if (key === 'notListed') {
      //切换到已下架和未上架
      toolBarList = [<Button ghost type="primary" key="primary" onClick={() => { handleModalVisible(true) }}>
        <PlusOutlined />新建
    </Button>,
      <Button type="primary" key="primary" onClick={() => { }}>
        <VerticalAlignTopOutlined />上架
   </Button>,]
    }
    setToolBarRenderList(toolBarList)
    setProductTab(key)
  }


  return (
    <PageContainer
      onTabChange={onTabChange}
      title="商品列表"
      tabList={
        [
          {
            tab: '商品信息(已上架)',
            key: 'added'
          },
          {
            tab: '商品信息(未上架|已下架)',
            key: 'notListed'
          }
        ]
      }
    >
      <ProTable<ProductListItem, API.PageParams>
        headerTitle="商品列表"
        actionRef={actionRef}
        rowKey="key"
        search={{ labelWidth: 120 }}
        toolbar={{ actions: toolBarRenderList }}
        request={getProductList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      >

      </ProTable>
      {
        selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{''}
                <a style={{
                  fontWeight: 600,
                }}>
                  {selectedRowsState.length}
                </a>
                                    项 &nbsp;&nbsp;
                                    <span>
                  这里可以统计已选项的一些参数
                                    </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
                            </Button>
            <Button type="primary">批量审批</Button>
          </FooterToolbar>
        )
      }
      <DrawerForm
        // width={1000}
        visible={productFormVisible}
        title={editProduct ? editProduct.productName : '商品基础信息'}
        onVisibleChange={setProductFormVisible}
        onFinish={async () => {
          await waitTime(2000)
          message.success('提交成功');
          return true;
        }}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              <Button
                key="save"
                type="primary"
                onClick={() => {
                  props.submit();
                }}
              >
                保存
              </Button>
            ];
          },
        }}
      >
        <ProForm.Group title='商品基本信息'>
          <ProFormText width="md" name="sortWeights" label="排序" placeholder="请填排序权重！" />
          <ProFormText width="md" name="categories" label="商品分类" placeholder="请填写商品分类！" rules={[{ required: true, message: '请填写商品分类！' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="sortWeights" label="专题名称" placeholder="请填专题名称！" rules={[{ required: true, message: '请填专题名称！' }]} />
          <ProFormText width="md" name="categories" label="商品名称" placeholder="请填写商品名称！" rules={[{ required: true, message: '请填写商品名称！' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="sortWeights" label="商品简称" placeholder="请填写商品简称！" />
          <ProFormText width="md" name="categories" label="商品修饰语" placeholder="请填写商品修饰语！" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="sortWeights" label="商品品牌" placeholder="请填写商品品牌！" />
          <ProFormText width="md" name="categories" label="商品规格" placeholder="请填写商品规格！" rules={[{ required: true, message: '请填写商品规格！' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormRadio.Group
            name="radio"
            label="状态"
            options={[
              {
                label: '上架',
                value: '上架',
              },
              {
                label: '下架',
                value: '下架',
              }
            ]}
          />

        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="categories" label="商品介绍" placeholder="请填写商品介绍！" />
          <ProFormText width="md" name="sortWeights" label="商品货号" placeholder="请填商品货号！" rules={[{ required: true, message: '请填商品货号！' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="categories" label="库存数量" placeholder="请填写库存数量！" />
          <ProFormText width="md" name="sortWeights" label="本店售价" placeholder="请填本店售价！" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="categories" label="市场售价" placeholder="请填写市场售价！" />
          <ProFormText width="md" name="sortWeights" label="返现比例" placeholder="请填返现比例！" />
        </ProForm.Group>

        <ProFormUploadDragger max={4} label="商品图片" name="productsPics" />
        <ProFormUploadDragger max={4} label="轮播图" name="carousel" />

        <ProForm.Group title='营销信息'>
          <ProFormRadio.Group
            width="md"
            name="radio"
            label="销售模式"
            options={[
              {
                label: '北京代理',
                value: 'a',
              },
              {
                label: '代理A',
                value: 'b',
              },
              {
                label: '代理B',
                value: 'c',
              },
            ]}
          />
          <ProFormSwitch name="isShow" label="是否显示" />
        </ProForm.Group>


        <ProForm.Group title="详细信息">

        </ProForm.Group>
        <ProFormText name="categories" label="商品关键字" placeholder="请输入商品关键字！" />

        <Form.Item name="productDetail" label="商品详情" >
          <BraftEditor
            className='my-editor'
            placeholder="请输入商品详情！"
          />
        </Form.Item>
        <ProFormText name="remark" label="备注" placeholder="请输入商品备注！" />


        <ProForm.Group title="质检报告">

        </ProForm.Group>

        <Form.Item name="inspectionReport" label="质检报告" >
          <BraftEditor
            className='my-editor'
            placeholder="请输入质检报告！"
          />
        </Form.Item>

      </DrawerForm>
    </PageContainer >
  )
}

export default ProductList;
