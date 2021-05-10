import { PlusOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Image, Divider } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { FormValueType } from '../components/UpdateForm';
import { getProductList } from '@/services/merchandise/product';
import { SKUTip, SPUTip } from '../tips';

import LogTableModal from '../components/LogTableModal';
import SKUTableModal from '../components/SKUTableModal';
import { history } from 'umi';
import 'braft-editor/dist/index.css';
import formatRequestListParams from '@/utils/formatRequestListParams';
/**
 * 添加节点
 *
 * @param fields
 */

type ProductListItem = {
  id: string,
  shopname: string,
  productNo: string,
  skuHurryCount: string,
  skuCount: string,
  proLogoImg1: string,
  label: string,
  typeName: string,
  productName: string,
  productStatus: string,
  spuSalesVolume: string,
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

const List: React.FC = (props) => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ProductListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ProductListItem[]>([]);

  //操作日志弹窗显示状态
  const [logTableModalVisible, setLogTableModalVisible] = useState(false);
  //SKU规格属性信息弹窗显示状态
  const [skuTableModalVisible, setSKUTableModalVisible] = useState(false);



  //tab切换state
  const [productTab, setProductTab] = useState('added')

  //商品表单
  const [productFormVisible, setProductFormVisible] = useState(false);

  //编辑商品
  const [editProduct, setEditProduct] = useState<ProductListItem>()


  const addBtn = (<Button type="primary" key="primary"  onClick={() => { history.push(`/merchandise/product/add`) }}>
    <PlusOutlined />新建
  </Button>)

  const deleteBtn = (
    <Button ghost type="primary" key="primary" onClick={() => { }}>
      <DeleteOutlined />删除
    </Button>
  )

  const addedBtn = (
    <Button ghost type="primary" key="primary" onClick={() => { }}>
      <VerticalAlignTopOutlined />上架
    </Button>
  )

  const downBtn = (
    <Button ghost type="primary" key="primary" onClick={() => { }}>
      <VerticalAlignBottomOutlined />下架
    </Button>
  )


  //操作按钮state
  const [toolBarRenderList, setToolBarRenderList] = useState([downBtn, addBtn]);

  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '商品编码',
      dataIndex: 'productNo',
    },
    {
      title: '商品分类名称',
      dataIndex: 'typeName',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
      width: 300,
      render: ((_, item) => {
        return (
          <a onClick={() => { history.push(`/merchandise/product/list/${item.id}`) }}>{_}</a>
        )
      })
    },
    {
      title: '商品主图',
      dataIndex: 'proLogoImg1',
      render: (_, record) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={40}
            src={_ as string}
          />
        )
      },
      search: false
    },
    {
      title: '商品副标题',
      dataIndex: 'xxxxxxxxxxx',
      search: false
    },
    {
      title: '商铺名称',
      dataIndex: 'shopname',
      valueType: 'textarea',
    },
    {
      title: '商品品牌',
      dataIndex: 'xxxxxxxxxxxxxx',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: 'label',
      search: false,
    },
    {
      title: '包含SKU数',
      tooltip: SKUTip,
      dataIndex: 'skuCount',
      search: false,
      render: (_, record) => (
        <a onClick={() => { setSKUTableModalVisible(true) }}>{_}</a>
      )
    },
    {
      title: 'SKU告急库存',
      dataIndex: 'skuHurryCount',
      search: false,
      render: (_, record) => (
        <a onClick={() => { setSKUTableModalVisible(true) }}>{_}</a>
      )
    },

    {
      title: 'SPU销量',
      tip: SKUTip,
      dataIndex: 'xxxxxxxxxx',
      search: false,
    },
    {
      title: '销售价',
      dataIndex: '12323',
      search: false
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => setLogTableModalVisible(true)}>日志</a>
          <Divider type="vertical" />
          <a onClick={() => { history.push(`/merchandise/product/edit?id=${record.id}`) }}>编辑</a>
          <Divider type="vertical" />
          <a>下架</a>
          <Divider type="vertical" />
          <a >删除</a>
        </>
      )
    }
  ]

  const onTabChange = (key: string) => {
    let toolBarList: any[] = [];

    //切换到已上架
    if (key === 'added') {
      toolBarList = [
        downBtn
      ]
    } else if (key === 'notListed') {
      //切换到已下架
      toolBarList = [
        deleteBtn,
        addedBtn
      ]
    } else {
      //待上架商品操作按钮
      toolBarList = [
        deleteBtn,
        addedBtn
      ]
    }

    toolBarList.push(addBtn)
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
            tab: '已上架商品',
            key: 'added'
          },
          {
            tab: '已下架商品',
            key: 'notListed'
          },
          {
            tab: '待上架商品',
            key: 'toBe'
          }
        ]
      }
    >
      <ProTable<ProductListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={{ labelWidth: 120 }}
        toolbar={{ actions: toolBarRenderList }}
        request={formatRequestListParams(getProductList)}
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

      <LogTableModal visible={logTableModalVisible} onOk={() => { setLogTableModalVisible(false) }} onCancel={() => { setLogTableModalVisible(false) }} />
      <SKUTableModal visible={skuTableModalVisible} onOk={() => { setSKUTableModalVisible(false) }} onCancel={() => { setSKUTableModalVisible(false) }} />
    </PageContainer >
  )
}

export default List;
