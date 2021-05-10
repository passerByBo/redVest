import React, { useRef, useState, useCallback } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm from './components/UpdateForm'

import { getWithdrawList, updateWithdrawList } from '@/services/operation/index';
import formatRequestListParams from '@/utils/formatRequestListParams';

type TableListType = {
  id: string;
  extractUserid: string;
  extractUsername: string;
  extractDate: string;
  extractMoney: string;
  extract_type: string;
  extract_money_total: string;
  status: string;
  extractSuccessDate: number;
  remark: string;
}

const Withdrawal: React.FC<TableListType> = () => {

  const actionRef = useRef<ActionType>();
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListType | null>(null);

  const handleUpdateSubmit = useCallback(async (fields) => {
    const hide = message.loading('正在编辑');
    try {
      let res = await updateWithdrawList({ ...fields });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('编辑失败请重试！');
      }
      hide();
      message.success('编辑成功');
    } catch (error) {
      hide();
      message.error('编辑失败请重试！');
    }
    handleUpdateModalVisible(false);
    if (actionRef.current) {
      actionRef.current.reload();
    }

  }, [])

  const columns: ProColumns<TableListType>[] = [
    {
      title: '提现人ID',
      dataIndex: 'extractUserid',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '提现人姓名',
      dataIndex: 'extractUsername',
      valueType: 'textarea',
    },
    {
      title: '申请日期',
      dataIndex: 'extractDate',
      valueType: 'textarea',
    },
    {
      title: '本次提现金额',
      dataIndex: 'extractMoney',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '累计提现金额',
      dataIndex: 'extract_money_total',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '提现方式',
      dataIndex: 'extract_type',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '审核结果',
      dataIndex: 'status',
      valueType: 'textarea',
    },
    {
      title: '到账日期',
      dataIndex: 'extractSuccessDate',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a onClick={() => {
          setCurrentRow(record);
          handleUpdateModalVisible(true)
        }}>审核</a>
      ]
    }
  ];

  return (
    <PageContainer
      header={{
        title: '提现管理',
      }}
    >
      <ProTable<TableListType>
        search={{
          labelWidth: 120,
        }}
        headerTitle="提现管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={formatRequestListParams(getWithdrawList)}
        columns={columns}
      />

      <UpdateForm
        onCancel={() => { handleUpdateModalVisible(false) }}
        onSubmit={handleUpdateSubmit}
        values={currentRow}
        updateModalVisible={updateModalVisible} />

    </PageContainer>
  )
}

export default Withdrawal;
