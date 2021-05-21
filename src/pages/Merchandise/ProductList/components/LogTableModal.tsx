import { getLoggerList } from '@/services/merchandise/product';
import formatRequestListParams from '@/utils/formatRequestListParams';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Modal, Table } from 'antd';
import React, { useEffect, useRef } from 'react';

export interface LogTableModelProps {
  visible: boolean;
  onOk(): void;
  onCancel(): void;
  id?: string;
}


const columns = [
  {
    title: '商品编码',
    dataIndex: 'productNo',
    key: 'productNo',
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '商品规格',
    dataIndex: 'skuName',
    key: 'skuName',
  },
  {
    title: '修改内容',
    dataIndex: 'fieldValue',
    key: 'fieldValue',
  },
  {
    title: '原值',
    dataIndex: 'updateBefore',
    key: 'updateBefore',
  },
  {
    title: '现值',
    dataIndex: 'updateAfter',
    key: 'updateAfter',
  },
  {
    title: '操作人',
    dataIndex: 'createUser',
    key: 'createUser',
  },
]

const LogTableModal: React.FC<LogTableModelProps> = (props) => {
  const { visible, onOk, onCancel, id } = props;
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    actionRef.current?.reload();
  }, [id])

  return (
    <Modal
      title='操作日志'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width='80%'
    >
      <ProTable
        bordered
        actionRef={actionRef}
        columns={columns}
        request={formatRequestListParams(getLoggerList, { id: id })}
        rowKey="productNo"
        search={false}
        toolBarRender={false}
      />
    </Modal>
  )
}

export default LogTableModal;
