import { PlusOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined, DeleteOutlined, EyeOutlined, ConsoleSqlOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Image, Divider, Modal, notification, FormInstance } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { FormValueType } from '../components/UpdateForm';
import { exportProduct, getProductList, onAndOffShelves } from '@/services/merchandise/product';
import { SKUTip, SPUTip } from '../tips';

import LogTableModal from '../components/LogTableModal';
import SKUTableModal from '../components/SKUTableModal';
import { history, useModel } from 'umi';
import 'braft-editor/dist/index.css';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { getIds } from '@/utils/utils';
import Export from '@/components/Export';
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

  const formRef = useRef<FormInstance>();

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
  const [productTab, setProductTab] = useState('上架')

  //商品表单
  const [productFormVisible, setProductFormVisible] = useState(false);

  //编辑商品
  const [editProduct, setEditProduct] = useState<ProductListItem>()


  const { setCurrentProduct } = useModel('product', (ret) => ({
    setCurrentProduct: ret.setCurrentProduct
  }));


  const updateShelves = async (data: ProductListItem | ProductListItem[], shelves: string) => {
    if (!data || data.length === 0) return;

    let hide = message.loading('正在' + shelves + '中!');
    let ids = getIds<ProductListItem>(data);
    try {
      let res = await onAndOffShelves({ action: shelves, ids });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error(shelves + '失败，' + res.msg);
        return;
      }

      hide();
      message.success(shelves + '成功！');
      actionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error(shelves + '失败，请重试！')
    }
  }

  const productRecycle = async (data: ProductListItem | ProductListItem[]) => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      message.warning('请选择要删除的商品')
      return;
    };

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认删除商品，删除后的商品可在回收站查看！',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        let hide = message.loading('正在回收中!');
        let ids = getIds<ProductListItem>(data);
        try {
          let res = await onAndOffShelves({ action: '回收', ids });
          if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('回收失败，' + res.msg);
            return;
          }

          hide();
          message.success('回收成功！');
          actionRef.current?.reloadAndRest?.();
        } catch (error) {
          hide();
          message.error('回收失败，请重试！')
        }
      }
    })
  }

  const shelvesUp = async (data: ProductListItem | ProductListItem[], shelves: string) => {
    if (!data || data.length === 0) {
      message.warning(`请选择要${shelves}的商品！`)
      return;
    };

    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认进行上架操作？上架后的上可在“商品列表：已上架”页面可查看',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        let hide = message.loading('正在' + shelves + '中!');
        let ids = getIds<ProductListItem>(data);
        try {
          let res = await onAndOffShelves({ action: shelves, ids });
          if (res.status === 200 && res.code !== 200) {
            if (res.code === 412) {
              notification.error({
                message: '请注意，您的信息未填写完整，暂不可上架',
                description: res.msg,
              })
              return;
            }
            hide();
            message.error(shelves + '失败，' + res.msg);
            return;
          }

          hide();
          message.success(shelves + '成功！');
          actionRef.current?.reloadAndRest?.();
        } catch (error) {
          hide();
          message.error(shelves + '失败，请重试！')
        }
      }
    });
  }

  // const gen = () => {
  //   console.log('|', selectedRowsState)
  // }


  // const addBtn = useMemo(() => {
  //   let selectData = selectedRowsState;
  //   return (<Button type="primary" key="primary" onClick={() => { history.push(`/merchandise/product/add`) }}>
  //     <PlusOutlined />新建
  //   </Button>)
  // }, [selectedRowsState])

  // const deleteBtn = useMemo(() => {
  //   let selectData = selectedRowsState;
  //   return (
  //     <Button ghost type="primary" key="primary" onClick={() => { updateShelves(selectData, '删除') }}>
  //       <DeleteOutlined />删除
  //     </Button>
  //   )
  // }, [selectedRowsState])

  // const addedBtn = useMemo(() => {
  //   let selectData = selectedRowsState;
  //   return (
  //     <Button ghost type="primary" key="primary" onClick={() => { updateShelves(selectData, '上架') }}>
  //       <VerticalAlignTopOutlined />上架
  //     </Button>
  //   )
  // }, [selectedRowsState])

  // const downBtn = (
  //   <Button ghost type="primary" key="primary" onClick={gen}>
  //     <VerticalAlignBottomOutlined />下架
  //   </Button>
  // )

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
          <a onClick={() => { setCurrentProduct(item); history.push(`/merchandise/product/list/${item.id}`) }}>{_}</a>
        )
      })
    },
    {
      title: '商品主图',
      dataIndex: 'proLogoImg1',
      render: (_: any, record: any) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={40}
            src={_ && Array.isArray(_) && _[0] && _[0].imgUrl}
          />
        )
      },
      search: false
    },
    {
      title: '商品副标题',
      dataIndex: 'productTitle',
      search: false
    },
    {
      title: '商铺名称',
      dataIndex: 'shopname',
      valueType: 'textarea',
    },
    {
      title: '商品品牌',
      dataIndex: 'productBrand',
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
        <a onClick={() => { setCurrentRow(record); setSKUTableModalVisible(true) }}>{_}</a>
      )
    },
    {
      title: 'SKU告急库存',
      dataIndex: 'skuHurryCount',
      search: false,
      // render: (_, record) => (
      //   <a onClick={() => { setSKUTableModalVisible(true) }}>{_}</a>
      // )
    },

    // {
    //   title: 'SPU销量',
    //   tip: SKUTip,
    //   dataIndex: 'xxxxxxxxxx',
    //   search: false,
    // },
    // {
    //   title: '销售价',
    //   dataIndex: '12323',
    //   search: false
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => {
        let { productStatus } = record;
        return <>
          <a onClick={() => { setCurrentRow(record); setLogTableModalVisible(true) }}>日志</a>
          <Divider type="vertical" />
          <a onClick={() => { history.push(`/merchandise/product/edit?id=${record.id}`) }}>编辑</a>
          <Divider type="vertical" />
          {productStatus === '上架' ? <a onClick={() => updateShelves(record, '下架')}>下架</a> : <a onClick={() => shelvesUp(record, '上架')}>上架</a>}
          {
            productStatus === '下架' && <>
              <Divider type="vertical" />
              <a onClick={() => productRecycle(record)}>删除</a>
            </>
          }

        </>
      }
    }
  ]



  const onTabChange = (key: string) => {
    setProductTab(key);
    setSelectedRows([]);
    actionRef.current?.reloadAndRest?.();
  }



  return (
    <PageContainer
      onTabChange={onTabChange}
      title="商品列表"
      tabList={
        [
          {
            tab: '已上架商品',
            key: '上架'
          },
          {
            tab: '已下架商品',
            key: '下架'
          },
          {
            tab: '待上架商品',
            key: '待上架'
          }
        ]
      }
    >
      <ProTable<ProductListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="id"
        formRef={formRef}
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Export request={exportProduct.bind(null, { ...(formRef.current?.getFieldsValue() || {}), productStatus: productTab })} />,
          productTab === '下架' && (<Button ghost type="primary" key="primary" onClick={() => {

            if (!Array.isArray(selectedRowsState) || selectedRowsState.length === 0) {
              message.warning('请选择要删除的商品')
              return;
            }
            Modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '确认要将所有选中的商品放入回收站吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                updateShelves(selectedRowsState, '回收')
              }
            })
          }}>
            <DeleteOutlined />删除
          </Button>),
          (productTab === '下架' || productTab === '待上架') && <Button ghost type="primary" key="primary" onClick={() => { shelvesUp(selectedRowsState, '上架') }}>
            <VerticalAlignTopOutlined />上架
          </Button>,
          productTab === '上架' && <Button ghost type="primary" key="primary" onClick={() => {
            if (!Array.isArray(selectedRowsState) || selectedRowsState.length === 0) {
              message.warning('请选择要下架的商品')
              return;
            }
            Modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '确认要将所有选中的商品下架吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: async () => {
                updateShelves(selectedRowsState, '下架')
              }
            })

          }}>
            <VerticalAlignBottomOutlined />下架
           </Button>,
          <Button type="primary" key="primary" onClick={() => { history.push(`/merchandise/product/add`) }}>
            <PlusOutlined />新建
           </Button>
        ]}
        request={formatRequestListParams(getProductList, { productStatus: productTab })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows([...selectedRows]);
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
                  {/* 这里可以统计已选项的一些参数 */}
                </span>
              </div>
            }
          >
            {/* <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                // setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
                            </Button>
            <Button type="primary">批量审批</Button> */}
          </FooterToolbar>
        )
      }

      <LogTableModal id={currentRow && currentRow.id} visible={logTableModalVisible} onOk={() => { setLogTableModalVisible(false) }} onCancel={() => { setLogTableModalVisible(false) }} />
      <SKUTableModal id={currentRow && currentRow.id} visible={skuTableModalVisible} onOk={() => { setSKUTableModalVisible(false) }} onCancel={() => { setSKUTableModalVisible(false) }} />
    </PageContainer >
  )
}

export default List;
