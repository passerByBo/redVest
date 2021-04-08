import { Modal, Table } from 'antd';
import React from 'react';

export interface LogTableModelProps {
  visible: boolean;
  onOk(): void;
  onCancel(): void
}


const columns = [
  {
    title: '商品编码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '销售价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '划线价',
    dataIndex: 'price2',
    key: 'price2',
  },
  {
    title: '上下架',
    dataIndex: 'aaa',
    key: 'aaa',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作人',
    dataIndex: 'person',
    key: 'person',
  },
  {
    title: '操作时间',
    dataIndex: 'date',
    key: 'date',
  },
]

const LogTableModal: React.FC<LogTableModelProps> = (props) => {
  const { visible, onOk, onCancel } = props;
  return (
    <Modal
      title='操作日志'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width='80%'
    >
      <Table bordered dataSource={[]} columns={columns}></Table>
    </Modal>
  )
}

export default LogTableModal;
