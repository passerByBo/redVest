import { getSKUList } from '@/services/sku-ledger';
import formatRequestListParams from '@/utils/formatRequestListParams';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Modal, Tag } from 'antd';
import React, { useEffect, useRef } from 'react';

export interface SKUTableModalProps {
  visible: boolean;
  onOk(): void;
  onCancel(): void;
  id?: string;
}


const columns = [
  {
    title: 'SKU编码',
    dataIndex: 'articleNo',
    key: 'articleNo',
  },
  {
    title: 'SKU规格属性',
    dataIndex: 'skuName',
    key: 'skuName',
  },
  // {
  //   title: '数量',
  //   dataIndex: 'inventory',
  //   key: 'inventory',
  // },
  {
    title: '单位',
    dataIndex: 'productUnit',
    key: 'productUnit',
  },
  {
    title: '成本价',
    dataIndex: 'supplyPrice',
    key: 'supplyPrice',
  },
  {
    title: '销售价',
    dataIndex: 'salePrice',
    key: 'salePrice',
  },
  {
    title: 'SKU销量',
    dataIndex: 'salesVolume',
    key: 'salesVolume',
  },
  {
    title: 'SKU库存',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '库存预警值',
    dataIndex: 'inventoryWarn',
    key: 'inventoryWarn',
  },
  {
    title: '库存预警状态',
    dataIndex: 'option',
    key: 'option',
    render: (_: string, record: any) => {
      if (record.inventory > record.inventoryWarn) {
        return <Tag color="#87d068">正常</Tag>
      } else {
        return <Tag color="#f50">告急</Tag>
      }


    }
  },
]

const SKUTableModal: React.FC<SKUTableModalProps> = (props) => {
  const { visible, onOk, onCancel, id } = props;
  const actionRef = useRef<ActionType>();
  useEffect(() => {
    actionRef.current?.reload();
  }, [id])

  return (
    <Modal
      title='SKU规格属性信息'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width='80%'
    >
      <ProTable
        bordered
        actionRef={actionRef}
        columns={columns}
        request={formatRequestListParams(getSKUList, { spuId: id })}
        rowKey="productNo"
        search={false}
        toolBarRender={false}
      />
    </Modal>
  )
}

export default SKUTableModal;
