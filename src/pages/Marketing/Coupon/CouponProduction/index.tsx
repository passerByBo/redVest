import React, { useState, useRef } from 'react';
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import AddCouponModal from './components/AddCouponModal';

import type { TableListItem } from './data.d';
import { getArticleSortList, addArticleSortList, removeRule } from '@/services/marketing/couponProduction';
import formatRequestListParams from '@/utils/formatRequestListParams';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addArticleSortList({ ...fields });
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
 * 删除节点
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  try {
    await removeRule({
      ids: selectedRows.map((row) => row.id).join(','),
    });
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
  const [statusKey, setStatusKey] = useState<string>('审核通过');
  const [addCouponModalVisible, setAddCouponModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const actionRef = useRef<ActionType>();

  const confirmAdd = (newData: TableListItem) => {
    setAddCouponModalVisible(false);
    handleAdd(newData);
    actionRef.current?.reloadAndRest?.();
  };

  const removeSingleRow = async (selectedRows: TableListItem[]) => {
    setSelectedRows([]);
    await handleRemove(selectedRows) && actionRef.current?.reloadAndRest?.();
  }

  const onTabChange = (key: string) => {
    setStatusKey(key)
    actionRef.current?.reloadAndRest?.();
  };

  const toolBarRenderList = [
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
    <Button
      type="primary"
      key="delete"
      danger
      onClick={() => {
        removeSingleRow(selectedRowsState);
      }}>
      <DeleteOutlined />
      删除
    </Button>,
    <Button key="export" onClick={() => { }}>
      <ExportOutlined />
      导出
    </Button>,
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [<a onClick={() => { }}>下架</a>],
    },
  ];
  return (
    <PageContainer
      header={{
        title: '卡券制作',
      }}
      tabList={[
        {
          tab: '审核通过卡券',
          key: '审核通过',
        },
        {
          tab: '审核未通过卡券',
          key: '审核未通过',
        },
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
        request={formatRequestListParams(getArticleSortList, { status: statusKey })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
                        </div>
          }
        >
          <Button
            onClick={() => {
              removeSingleRow(selectedRowsState);
            }}
          >批量删除</Button>
        </FooterToolbar>
      )}
      <AddCouponModal
        visible={addCouponModalVisible}
        onCancel={() => setAddCouponModalVisible(false)}
        onFinish={confirmAdd}
      />
    </PageContainer>
  );
};

export default CouponProduction;
