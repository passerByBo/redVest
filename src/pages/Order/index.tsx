import React,{useRef} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
const Order: React.FC = () => {
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable
        headerTitle="订单列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

    </PageContainer>
  )
}

export default Order;
