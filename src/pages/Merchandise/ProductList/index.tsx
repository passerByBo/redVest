import { PlusOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import UpdateForm from './components/UpdateForm';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
/**
 * 添加节点
 *
 * @param fields
 */

type productListItem = {
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

const handleAdd = async (fields: productListItem) => {
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

const handleRemove = async (selectedRows: productListItem[]) => {
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
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  //tab切换state
  const [productTab, setProductTab] = useState('added')

  //操作按钮state
  const [toolBarRenderList, setToolBarRenderList] = useState([[
    (<Button danger ghost type="primary" key="primary" onClick={() => { }}>
      <VerticalAlignBottomOutlined />下架
    </Button>)
  ]]);

  const columns: ProColumns<productListItem>[] = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
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
      <ProTable<API.RuleListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={{ labelWidth: 120 }}
        toolbar={{ actions: toolBarRenderList }}
        request={rule}
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
                  这里可以统计已选项的一些参数{selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
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
      <ModalForm
        title='新建专题组'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value: any) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer >
  )
}

export default ProductList;
