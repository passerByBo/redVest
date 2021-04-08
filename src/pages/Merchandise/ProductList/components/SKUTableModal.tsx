import { Modal, Table } from 'antd';
import React from 'react';

export interface SKUTableModalProps {
  visible: boolean;
  onOk(): void;
  onCancel(): void
}


const columns = [
  {
    title: 'SKU编码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'SKU规格属性',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '数量',
    dataIndex: 'price2',
    key: 'price2',
  },
  {
    title: '单位',
    dataIndex: 'aaa',
    key: 'aaa',
  },
  {
    title: '成本价',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '销售价',
    dataIndex: 'person',
    key: 'person',
  },
  {
    title: 'SKU销量',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'SKU库存',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '库存预警值',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '库存预警状态',
    dataIndex: 'date',
    key: 'date',
    render: (_) => (
      <span>{_}</span>
    )
  },
]

const SKUTableModal: React.FC<SKUTableModalProps> = (props) => {
  const { visible, onOk, onCancel } = props;
  return (
    <Modal
      title='SKU规格属性信息'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width='80%'
    >
      <Table bordered dataSource={[]} columns={columns}></Table>
    </Modal>
  )
}

export default SKUTableModal;
