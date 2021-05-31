import React, { useState, useRef } from 'react';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import AddCouponModal from './components/AddCouponModal';
import UpdateModal from './components/UpdateModal';

import type { TableListItem } from './data.d';
import { getArticleSortList, updateItem, removeItem, exportExcel } from '@/services/marketing/couponProduction';
import formatRequestListParams from '@/utils/formatRequestListParams';
import Export from '@/components/Export';

/**
 * 卡券管理主表添加节点
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    let res = await updateItem({ ...fields });
    if (res.status === 200 && res.code !== 200) {
      hide();
      message.error('添加失败!' + res.msg, 10);
      return false;
    }
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败！');
    return false;
  }
};

/**
* 卡券管理主表更新节点
*/
const handleUpdate = async (fields: TableListItem) => {
  const hide = message.loading('正在更新');
  try {
    let res = await updateItem({ ...fields });
    if (res.status === 200 && res.code !== 200) {
      hide();
      message.error('更新失败!' + res.msg, 10);
      return false;
    }
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败！');
    return false;
  }
};

/**
* 卡券管理表删除节点
*/
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  try {
    let res = await removeItem({
      ids: selectedRows.map((row) => row.id).join(','),
    });
    if (res.status === 200 && res.code !== 200) {
      hide();
      message.error('删除失败!' + res.msg, 10);
      return false;
    }
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败！');
    return false;
  }
};

const CouponProduction: React.FC = () => {
  const [formValues, setFormValues] = useState({});
  const [statusKey, setStatusKey] = useState<string>('未生效');
  const [addCouponModalVisible, setAddCouponModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const actionRef = useRef<ActionType>();

  // 主表新建
  const addNewItem = async (newData: TableListItem) => {
    const res = await handleAdd(newData);
    if (res) {
      actionRef.current?.reloadAndRest?.();
    }

  };

  // 主表删除
  const removeItems = async (selectedRows: TableListItem[]) => {
    const res = await handleRemove(selectedRows)
    if (res) {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
    }
  }

  // 主表更新
  const updateItems = async (value: any) => {
    const res = await handleUpdate(value);
    if (res) {
      setUpdateModalVisible(false);
      setFormValues({});
      actionRef.current?.reloadAndRest?.();
    }
  }

  //切换
  const onTabChange = (key: string) => {
    setStatusKey(key)
    actionRef.current?.reloadAndRest?.();
  };

  const toolBarRenderList = statusKey === '未生效' ? [
    <Button
      type="primary"
      key="primary"
      onClick={() => {
        setAddCouponModalVisible(true);
      }}
    >
      <PlusOutlined />
      新建
    </Button>,
    <Popconfirm
      placement="topRight"
      title={'确定要删除吗？'}
      onConfirm={() => { removeItems(selectedRowsState); }}
      okText="确认"
      cancelText="取消"
    >
      <Button type="primary" danger><DeleteOutlined />删除</Button>
    </Popconfirm>,
    <Export request={exportExcel} />,
  ] : [
    <Button key="export" onClick={() => { }}>
      <ExportOutlined />
      导出
    </Button>
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '单据编号',
      dataIndex: 'billno',
      valueType: 'textarea',
    },
    {
      title: '卡券名称',
      dataIndex: 'cardName',
      valueType: 'textarea',
    },
    {
      title: '使用类型',
      dataIndex: 'useType',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '卡券数量',
      dataIndex: 'cardCount',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '单一卡券金额',
      dataIndex: 'cardMoney',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '采购总金额',
      dataIndex: 'totalMoneyLower',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '时效状态',
      dataIndex: 'cardStatus',
      valueType: 'textarea',
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '有效期开始日期',
      dataIndex: 'startDate',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '有效期结束日期',
      dataIndex: 'endDate',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'applyman',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'applyDate',
      valueType: 'textarea',
    },
    {
      title: '关联id',
      dataIndex: 'bindid',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, item) => [<a onClick={() => {
        setUpdateModalVisible(true);
        console.log('编辑', item.bindid);
        setFormValues({ id: item.id, type: statusKey, bindid: item.bindid });
      }}>编辑</a>],
    },
  ];
  return (
    <PageContainer
      header={{
        title: '卡券制作',
      }}
      tabList={[
        {
          tab: '未生效卡券',
          key: '未生效',
        },
        {
          tab: '已生效卡券',
          key: '已生效',
        }
      ]}
      onTabChange={onTabChange}
    >
      <ProTable<TableListItem>
        headerTitle="卡券制作"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 100,
          defaultCollapsed: false,
        }}
        toolbar={{ actions: toolBarRenderList }}
        request={formatRequestListParams(getArticleSortList, { cardStatus: statusKey })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <AddCouponModal
        visible={addCouponModalVisible}
        closeAddModal={() => setAddCouponModalVisible(false)}
        addNewItem={addNewItem}
      />
      <UpdateModal
        values={formValues}
        updateModalVisible={updateModalVisible}
        onSubmit={updateItems}
        closeUpdateModal={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  );
};

export default CouponProduction;
